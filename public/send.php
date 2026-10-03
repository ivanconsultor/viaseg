<?php
/**
 * Processa o formulario de contato do site ViaSeg.
 * Recebe JSON {nome, email, whatsapp, assunto} e devolve JSON {success, message}.
 *
 * Seguranca:
 *  - remove quebras de linha de todos os campos (evita injecao de cabecalho de e-mail)
 *  - valida o e-mail de verdade antes de usar no Reply-To
 *  - responde apenas para o proprio dominio (sem CORS aberto)
 *  - limita envios por IP
 *  - campo-armadilha invisivel contra robos
 */

// --- Configuracao da API de Conversoes da Meta -------------------------------
// Arquivo fora do git, com o token. Ausente, o formulario funciona igual e so
// nao envia o evento para a Meta. Ver public/capi-config.example.php.
$configuracaoCapi = __DIR__ . "/capi-config.php";
if (is_readable($configuracaoCapi)) {
    require_once $configuracaoCapi;
}

// --- Dominios autorizados a chamar este script -------------------------------
$origensPermitidas = [
    "https://www.viasegcorretora.com.br",
    "https://viasegcorretora.com.br",
];

$origem = $_SERVER["HTTP_ORIGIN"] ?? "";
if ($origem !== "" && !in_array($origem, $origensPermitidas, true)) {
    http_response_code(403);
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode(["success" => false, "message" => "Origem nao autorizada."]);
    exit;
}
if ($origem !== "") {
    header("Access-Control-Allow-Origin: " . $origem);
    header("Vary: Origin");
}
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("X-Content-Type-Options: nosniff");

// --- Apenas POST -------------------------------------------------------------
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Metodo nao permitido."]);
    exit;
}

// --- Limite de envios por IP (5 por hora) ------------------------------------
// Protecao adicional: se o servidor nao permitir escrita, o envio segue normal.
$ip = $_SERVER["REMOTE_ADDR"] ?? "desconhecido";
$arquivoLimite = sys_get_temp_dir() . "/viaseg_rl_" . md5($ip) . ".txt";
$agora = time();
$registros = [];
if (is_readable($arquivoLimite)) {
    $registros = array_filter(
        explode(",", (string) file_get_contents($arquivoLimite)),
        function ($t) use ($agora) { return is_numeric($t) && ($agora - (int) $t) < 3600; }
    );
}
if (count($registros) >= 5) {
    http_response_code(429);
    echo json_encode(["success" => false, "message" => "Muitas tentativas. Tente novamente em alguns minutos."]);
    exit;
}

// --- Le o corpo da requisicao ------------------------------------------------
$corpo = file_get_contents("php://input");
if (strlen($corpo) > 20000) {
    http_response_code(413);
    echo json_encode(["success" => false, "message" => "Mensagem muito longa."]);
    exit;
}

$dados = json_decode($corpo, true);
if (!is_array($dados)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Dados invalidos."]);
    exit;
}

// --- Campo-armadilha: robos preenchem, humanos nao veem ----------------------
if (!empty($dados["website"])) {
    // Responde sucesso para nao avisar o robo, mas nao envia nada.
    echo json_encode(["success" => true, "message" => "Mensagem enviada com sucesso!"]);
    exit;
}

/**
 * Limpa um campo: tira tags, espacos das pontas, quebras de linha e corta no limite.
 * A remocao de \r e \n e o que impede injecao de cabecalho no e-mail.
 */
function limpar($valor, $tamanhoMaximo, $permitirQuebras = false) {
    $valor = strip_tags((string) $valor);
    $valor = $permitirQuebras
        ? str_replace(["\r\n", "\r"], "\n", $valor)
        : str_replace(["\r", "\n", "\t", "\0"], " ", $valor);
    $valor = trim($valor);
    return function_exists("mb_substr")
        ? mb_substr($valor, 0, $tamanhoMaximo)
        : substr($valor, 0, $tamanhoMaximo);
}

$nome     = limpar($dados["nome"]     ?? "", 100);
$whatsapp = limpar($dados["whatsapp"] ?? "", 30);
$assunto  = limpar($dados["assunto"]  ?? "", 5000, true);
$email    = limpar($dados["email"]    ?? "", 150);

// Campos usados so pelo rastreamento (nao vao no e-mail).
$eventId      = limpar($dados["event_id"] ?? "", 64);
$fbp          = limpar($dados["fbp"]      ?? "", 100);
$fbc          = limpar($dados["fbc"]      ?? "", 200);
$paginaOrigem = limpar($dados["pagina"]   ?? "", 300);
$consentiu    = ($dados["consentimento"] ?? false) === true;

// --- Validacao ---------------------------------------------------------------
if ($nome === "" || $email === "" || $whatsapp === "" || $assunto === "") {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Todos os campos sao obrigatorios."]);
    exit;
}

$email = filter_var($email, FILTER_VALIDATE_EMAIL);
if ($email === false) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "E-mail invalido."]);
    exit;
}

/**
 * Telefone em E.164 so com digitos, como a Meta espera (sem "+").
 * Mesma regra do site: 12 digitos ou mais comecando com 55 ja tem o pais;
 * abaixo disso e numero local e recebe o 55 na frente. Assim o DDD 55 de
 * Santa Maria nao e confundido com codigo de pais.
 */
function telefoneParaMeta($bruto) {
    $digitos = preg_replace("/\D/", "", (string) $bruto);
    if ($digitos === "") {
        return "";
    }
    return (strlen($digitos) >= 12 && strpos($digitos, "55") === 0)
        ? $digitos
        : "55" . $digitos;
}

/** IP do visitante, nao o do proxy da hospedagem. */
function ipDoVisitante() {
    $encaminhado = $_SERVER["HTTP_X_FORWARDED_FOR"] ?? "";
    foreach (explode(",", $encaminhado) as $candidato) {
        $candidato = trim($candidato);
        if (filter_var($candidato, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
            return $candidato;
        }
    }
    return $_SERVER["REMOTE_ADDR"] ?? "";
}

/**
 * Envia o Lead direto para a API de Conversoes da Meta.
 *
 * POR QUE AQUI E NAO PELO GTM: em 01/10/2026 ficou provado que nenhuma tag do
 * tipo "evento do GA4" dispara depois do carregamento da pagina, o que derruba
 * em silencio o caminho servidor (Stape) do Lead. Aqui o dado sai do proprio
 * servidor da Hospedagem, sem depender de gtag, GA4, Stape nem bloqueador.
 *
 * O e-mail e o telefone vao em SHA-256, como a Meta exige. O event_id e o mesmo
 * que o pixel do navegador usa, para a Meta deduplicar os dois caminhos --
 * sem isso, cada lead conta duas vezes.
 *
 * Nunca derruba o formulario: falha de rede ou de token so vira linha de log.
 */
function enviarLeadParaMeta($email, $whatsapp, $eventId, $fbp, $fbc, $paginaOrigem) {
    if (!defined("VIASEG_CAPI_TOKEN") || VIASEG_CAPI_TOKEN === "" || VIASEG_CAPI_TOKEN === "COLE_AQUI_O_TOKEN_DA_API_DE_CONVERSOES") {
        return; // sem configuracao, segue sem rastrear
    }

    $hash = function ($valor) {
        return $valor === "" ? null : hash("sha256", $valor);
    };

    $telefone = telefoneParaMeta($whatsapp);

    $dadosDoUsuario = array_filter([
        "em"                => $hash(strtolower(trim($email))),
        "ph"                => $hash($telefone),
        "country"           => $hash("br"),
        "client_ip_address" => ipDoVisitante(),
        "client_user_agent" => $_SERVER["HTTP_USER_AGENT"] ?? "",
        "fbp"               => $fbp !== "" ? $fbp : null,
        "fbc"               => $fbc !== "" ? $fbc : null,
    ]);

    $evento = [
        "event_name"       => "Lead",
        "event_time"       => time(),
        "action_source"    => "website",
        "user_data"        => $dadosDoUsuario,
        "custom_data"      => ["lead_source" => "formulario"],
    ];
    if ($eventId !== "") {
        $evento["event_id"] = $eventId;
    }
    if ($paginaOrigem !== "") {
        $evento["event_source_url"] = $paginaOrigem;
    }

    $corpo = ["data" => [$evento]];
    if (defined("VIASEG_CAPI_TEST_CODE") && VIASEG_CAPI_TEST_CODE !== "") {
        $corpo["test_event_code"] = VIASEG_CAPI_TEST_CODE;
    }

    $url = "https://graph.facebook.com/v21.0/" . VIASEG_CAPI_PIXEL_ID
         . "/events?access_token=" . urlencode(VIASEG_CAPI_TOKEN);

    if (!function_exists("curl_init")) {
        return;
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($corpo),
        CURLOPT_HTTPHEADER     => ["Content-Type: application/json"],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 4, // o visitante nao espera mais que isso
        CURLOPT_CONNECTTIMEOUT => 2,
    ]);
    $resposta = curl_exec($ch);
    $codigo   = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $erroRede = curl_error($ch);
    curl_close($ch);

    if ($codigo !== 200) {
        @file_put_contents(
            sys_get_temp_dir() . "/viaseg_capi.log",
            date("c") . " | HTTP " . $codigo . " | " . ($erroRede !== "" ? $erroRede : substr((string) $resposta, 0, 400)) . "\n",
            FILE_APPEND | LOCK_EX
        );
    }
}

// --- Monta e envia o e-mail --------------------------------------------------
$destino = "contato@viasegcorretora.com.br";
$titulo  = "Novo Contato do Site: " . $nome;

$mensagem  = "Voce recebeu uma nova mensagem pelo formulario do site:\n\n";
$mensagem .= "Nome: "     . $nome     . "\n";
$mensagem .= "E-mail: "   . $email    . "\n";
$mensagem .= "WhatsApp: " . $whatsapp . "\n\n";
$mensagem .= "Mensagem:\n" . $assunto . "\n";

$cabecalhos  = "From: no-reply@viasegcorretora.com.br\r\n";
$cabecalhos .= "Reply-To: " . $email . "\r\n";
$cabecalhos .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($destino, $titulo, $mensagem, $cabecalhos)) {
    $registros[] = $agora;
    @file_put_contents($arquivoLimite, implode(",", $registros), LOCK_EX);

    // So com consentimento: a LGPD vale aqui igual vale no navegador. Sem o
    // aceite dos cookies, o lead chega por e-mail e nao vai para a Meta.
    if ($consentiu) {
        enviarLeadParaMeta($email, $whatsapp, $eventId, $fbp, $fbc, $paginaOrigem);
    }

    echo json_encode(["success" => true, "message" => "Mensagem enviada com sucesso!"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro interno ao enviar o e-mail."]);
}

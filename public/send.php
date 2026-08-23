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
    echo json_encode(["success" => true, "message" => "Mensagem enviada com sucesso!"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro interno ao enviar o e-mail."]);
}

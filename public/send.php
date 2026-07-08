<?php
// Configura os cabecalhos de resposta
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Permite apenas requisicoes do tipo POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Metodo nao permitido."]);
    exit;
}

// Obtem os dados JSON enviados pelo frontend
$inputData = json_decode(file_get_contents("php://input"), true);

if (!$inputData) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Dados invalidos."]);
    exit;
}

// Captura e limpa os campos
$nome = strip_tags(trim($inputData["nome"]));
$email = filter_var(trim($inputData["email"]), FILTER_SANITIZE_EMAIL);
$whatsapp = strip_tags(trim($inputData["whatsapp"]));
$assunto = strip_tags(trim($inputData["assunto"]));

// Valida campos obrigatorios
if (empty($nome) || empty($email) || empty($whatsapp) || empty($assunto)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Todos os campos sao obrigatorios."]);
    exit;
}

// Configura o email de destino (seu email na Hostinger)
$to = "contato@viasegcorretora.com.br";
$email_subject = "Novo Contato do Site: " . $nome;

// Monta o corpo da mensagem
$message_body = "Voce recebeu uma nova mensagem pelo formulario do site:\n\n";
$message_body .= "Nome: " . $nome . "\n";
$message_body .= "E-mail: " . $email . "\n";
$message_body .= "WhatsApp: " . $whatsapp . "\n\n";
$message_body .= "Mensagem:\n" . $assunto . "\n";

// Cabecalhos do email
$headers = "From: no-reply@viasegcorretora.com.br\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Dispara o email pelo servidor de email da Hostinger
if (mail($to, $email_subject, $message_body, $headers)) {
    echo json_encode(["success" => true, "message" => "Mensagem enviada com sucesso!"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro interno ao enviar o e-mail."]);
}

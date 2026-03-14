<?php
// Define variáveis ​​que vão receber os dados do formulário
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Coletando dados do formulário
    // Limpando campos de caracteres ou tags indevidas
    $nome = strip_tags(trim($_POST["nome"]));
    $telefone = strip_tags(trim($_POST["telefone"]));
    $interesse = strip_tags(trim($_POST["interesse"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensagem = strip_tags(trim($_POST["mensagem"]));
    
    // Configurações de Envio (Titan Email via Hostgator)
    // O ideal é usar o mesmo domínio do remetente para evitar SPAM na Hostgator
    // Exemplo: contato@viasegcorretora.com.br
    $destinatario = "contato@viasegcorretora.com.br"; // Substitua pelo seu email da Titan!
    
    // Assunto que você vai ver na caixa de entrada do Titan
    $assunto = "Novo Contato pelo Site: $nome - $interesse";

    // Formatando a mensagem que chegará pra você
    $conteudo = "Você recebeu uma nova mensagem pelo site ViaSeg Corretora.\n\n";
    $conteudo .= "Detalhes do Contato:\n";
    $conteudo .= "Nome: $nome\n";
    $conteudo .= "Telefone/WhatsApp: $telefone\n";
    $conteudo .= "E-mail: $email\n";
    $conteudo .= "Serviço de Interesse: $interesse\n\n";
    $conteudo .= "Mensagem:\n$mensagem\n";
    
    // Cabeçalhos de e-mail 
    // Em hospedagens como HostGator, o cabeçalho 'From' (De) DEVE ser 
    // um endereço que exista no próprio servidor/domínio pra enviar com sucesso e passar nos filtros da Cloudflare/Hostgator.
    // O Return-Path também segue essa mesma regra.
    $headers = "From: " . $destinatario . "\r\n";
    $headers .= "Reply-To: $email\r\n"; // Se você apertar responder, ele responde pro email do cliente
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Verificação Básica e Envio do E-mail
    if (!empty($nome) && !empty($telefone) && !empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        
        // Função mail do PHP para enviar no ambiente Hostgator
        if (mail($destinatario, $assunto, $conteudo, $headers)) {
            // Sucesso - Mostra alerta em javascript e volta pra index
            echo "<script>
                    alert('Ótimo, sua mensagem foi enviada com sucesso! Em breve retornaremos o contato.');
                    window.location.href = 'index.html';
                  </script>";
        } else {
            // Falha
            echo "<script>
                    alert('Oops... Ocorreu um erro ao enviar seu formulário. Por favor, tente novamente mais tarde ou nos chame no WhatsApp.');
                    window.history.back();
                  </script>";
        }
        
    } else {
        // Dados Inválidos (exemplo: e-mail digitado errado)
        echo "<script>
                alert('Por favor, preencha todos os campos corretamente (Nome, Telefone, E-mail).');
                window.history.back();
              </script>";
    }
} else {
    // Alguém acessou a página diretamente (GET) sem preencher o form, joga de volta pra index.html
    header("Location: index.html");
    exit;
}
?>

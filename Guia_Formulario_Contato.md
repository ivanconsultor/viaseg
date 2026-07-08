# Guia Prático: Como Ativar o Envio de E-mails no Formulário de Contato

Como o site será hospedado de forma estática (HTML puro) na Hostinger, você não tem um servidor de banco de dados ativo para processar e-mails. 

A melhor maneira, mais segura e gratuita (até 50 e-mails por mês na conta grátis) de fazer as mensagens do site chegarem direto no seu e-mail (`contato@viasegcorretora.com.br`) é usando o serviço **Formspree**.

Aqui está o passo a passo de 5 minutos para ativar:

---

## Passo 1: Criar a sua conta no Formspree

1. Acesse o site [https://formspree.io](https://formspree.io) e clique em **Register** (Registrar).
2. Crie uma conta usando o e-mail onde você deseja receber as mensagens (ex: `contato@viasegcorretora.com.br`).
3. Confirme a sua conta no e-mail de ativação que o Formspree enviará.

---

## Passo 2: Criar o Formulário no Painel do Formspree

1. No painel do Formspree, clique em **New Form** (Novo Formulário).
2. Dê um nome para ele (ex: *Contato ViaSeg*).
3. No campo **Send emails to**, confirme se está selecionado o seu e-mail (`contato@viasegcorretora.com.br`).
4. Clique em **Create Form**.
5. O Formspree gerará uma URL especial de envio. Ela se parece com isso:
   `https://formspree.io/f/xknwzypq` (copie essa URL).

---

## Passo 3: Configurar a URL no código do seu site

Para que os dados digitados sejam enviados ao Formspree, altere a URL no arquivo `fale-conosco/page.tsx`:

1. Abra o arquivo `src/app/fale-conosco/page.tsx`.
2. Localize a função `handleFormSubmit` nas linhas 14-18:
   ```typescript
   const handleFormSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     // Aqui seria implementada a lógica de envio
     alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
   };
   ```
3. Substitua a função inteira pelo código de envio real abaixo, inserindo a **sua URL do Formspree** criada no Passo 2:

   ```typescript
   const handleFormSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

     // Coleta os valores digitados nos inputs
     const nome = (document.getElementById("nome") as HTMLInputElement).value;
     const email = (document.getElementById("email") as HTMLInputElement).value;
     const whatsapp = (document.getElementById("whatsapp") as HTMLInputElement).value;
     const assunto = (document.getElementById("assunto") as HTMLTextAreaElement).value;

     try {
       const response = await fetch("COLE_AQUI_A_SUA_URL_DO_FORMSPREE", {
         method: "POST",
         headers: {
           "Accept": "application/json",
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ nome, email, whatsapp, assunto }),
       });

       if (response.ok) {
         alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
         // Limpa o formulário após enviar
         (e.target as HTMLFormElement).reset();
       } else {
         alert("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
       }
     } catch (error) {
       alert("Erro de conexão. Verifique sua internet e tente novamente.");
     }
   };
   ```

---

## Passo 4: Fazer o Upload ou Push no GitHub

1. Salve o arquivo.
2. Faça o build (`npm run build`) para atualizar a pasta `out/`.
3. Suba para o GitHub e atualize os arquivos na Hostinger.

Pronto! Agora qualquer mensagem enviada no formulário chegará automaticamente estruturada no seu e-mail!

# Documentação e Guia de Implantação: Novo Site ViaSeg Corretora

Este documento contém todas as informações técnicas sobre o novo site da ViaSeg Corretora e o passo a passo seguro para substituir o site antigo (WordPress com Elementor) pela nova versão.

---

## 1. Visão Geral do Novo Site

O novo site foi desenvolvido do zero, sob medida, para garantir **altíssima velocidade, segurança e otimização para o Google (SEO)**.
Diferente do anterior, ele não utiliza sistemas pesados como WordPress ou banco de dados.

**Tecnologias Utilizadas:**
- **HTML5 Semântico:** Estrutura clara e otimizada para buscadores.
- **CSS3 Puro (Vanilla):** Estilização customizada inspirada em designs modernos (Mycon), focada em performance sem depender de bibliotecas externas pesadas.
- **JavaScript Nativo:** Interações leves (menu mobile, animações de scroll, pop-up de cookies).
- **PHP:** Processamento seguro exclusivo para o formulário de contato, disparando e-mails diretamente pela HostGator (Serviço Titan).

---

## 2. Estrutura do Site e Mapa de URLs (Sitemap)

O site é composto por páginas estáticas. A estrutura de URLs ficará da seguinte forma quando o site estiver no ar:

**Domínio Principal:** `https://viasegcorretora.com.br`

**Páginas e URLs:**
1. **Página Inicial:** `https://viasegcorretora.com.br/` (Arquivo: `index.html`)
2. **Página de Cotação Online:** `https://viasegcorretora.com.br/cotacao` (Arquivo: `cotacao.html`)
3. **Política de Privacidade:** `https://viasegcorretora.com.br/politica-privacidade` (Arquivo: `politica-privacidade.html`)
4. **Política de Cookies:** `https://viasegcorretora.com.br/politica-cookies` (Arquivo: `politica-cookies.html`)
5. **Termos de Uso:** `https://viasegcorretora.com.br/termos-uso` (Arquivo: `termos-uso.html`)

**Processadores Invisíveis:**
- **Formulário de Contato:** Arquivo `processa_form.php` (Não é acessado diretamente pelo usuário, apenas processa os dados do formulário).

---

## 3. Guia Passo a Passo para Implantação

Sua infraestrutura atual está dividida assim:
- **Domínio:** Registro.br
- **Gerenciador de DNS:** Cloudflare
- **Hospedagem e E-mail:** HostGator (cPanel / Titan)

### Passo 1: Backup de Segurança (Garantia)
Antes de excluir qualquer coisa, faça um backup do seu site WordPress atual.
1. Acesse o **cPanel** da sua hospedagem na HostGator.
2. Vá em **Gerenciador de Arquivos** > `public_html`.
3. Selecione todos os arquivos, clique com o botão direito e escolha **Compress (Compactar)** como um arquivo `.zip`.
4. Faça o download desse arquivo `.zip` para o seu computador. (Isso garante que se algo der errado, você pode voltar como estava).

### Passo 2: Limpando o Site Antigo (Excluindo o WordPress)
Para evitar conflitos, precisamos limpar a pasta onde o site fica hospedado.
1. Ainda no **Gerenciador de Arquivos** do cPanel, dentro da pasta `public_html`.
2. Opcional, mas recomendado: Mova toda a pasta velha para uma pasta chamada `old-site` ou simplesmente selecione todos os arquivos do WordPress (pastas `wp-admin`, `wp-content`, `wp-includes`, e demais arquivos `.php`) e clique em **Excluir**.
   *Importante: Não exclua pastas que não sejam do WordPress, como configurações ocultas do cPanel (ex: pasta `.well-known` ou `cgi-bin`).*

### Passo 3: Subindo (Upload) o Novo Site
1. No seu computador, compacte TODOS os arquivos novos do site (pastas `assets`, `index.html`, `cotacao.html`, `processa_form.php`, etc.) em um único arquivo `.zip`.
2. No cPanel da HostGator (dentro da pasta `public_html`), clique no botão **Carregar (Upload)** no menu superior.
3. Envie o arquivo `.zip` do novo site.
4. Após o envio, volte ao Gerenciador de Arquivos, selecione o arquivo `.zip`, clique com o botão direito e escolha **Extrair (Extract)**.
5. Verifique se os arquivos foram extraídos diretamente dentro da raiz do `public_html` (o arquivo `index.html` deve estar solto lá dentro).
6. Você pode excluir o arquivo `.zip` que você carregou para economizar espaço.

### Passo 4: Verificando Configurações de DNS (Cloudflare e Registro.br)
**Boa notícia:** Se o seu site atual já está abrindo no domínio e o e-mail corporativo funciona, **VOCÊ NÃO PRECISA MEXER NO REGISTRO.BR NEM NA CLOUDFLARE.**
- O Registro.br aponta para a Cloudflare.
- A Cloudflare aponta o tráfego da Web (IP do site) e o tráfego de E-mail (MX do Titan) para a HostGator.
- Como a sua hospedagem na HostGator continua sendo a mesma, e os IPs não mudaram, a implantação é feita apenas substituindo os arquivos visuais (Passos 2 e 3).

### Passo 5: Teste e Limpeza de Cache
Como você usa Cloudflare, é crucial limpar o cache deles para que as pessoas não vejam o site antigo quebrando.
1. Faça login na **Cloudflare**.
2. Selecione o domínio `viasegcorretora.com.br`.
3. No painel direito (ou na aba Caching), clique em **Purge Cache (Limpar Cache)** e depois em **Purge Everything (Limpar Tudo)**.
4. Abra o seu site `https://viasegcorretora.com.br` no navegador (preferencialmente em uma guia anônima) e verifique se o novo visual carregou perfeitamente.

### Passo 6: Testar o Formulário de Contato (Titan Mail)
1. Com o site no ar, vá até a seção de Contato.
2. Preencha seus próprios dados e envie uma mensagem de teste.
3. Abra a sua caixa de entrada no Titan (pelo painel ou app) e certifique-se de que a mensagem chegou corretamente.
   *Se o e-mail não chegar na caixa de entrada, verifique a pasta de Spam/Lixo Eletrônico.*

---

**Parabéns!** O novo site da ViaSeg Corretora estará oficialmente no ar, muito mais rápido, sem plugins que exigem atualização e totalmente otimizado.

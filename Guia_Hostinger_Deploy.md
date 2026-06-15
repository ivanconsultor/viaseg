# Guia Passo a Passo: Deploy da ViaSeg Corretora na Hostinger

Este guia ensina como realizar o deploy do site **ViaSeg Corretora** (feito em Next.js) na hospedagem da Hostinger.

## 1. Preparação no GitHub
O seu projeto já está salvo no GitHub. Certifique-se de que todas as alterações recentes (incluindo as de SEO) foram commitadas e feito o `git push` para a branch `main`.

## 2. Configurando a Hostinger
Se você contratou uma hospedagem com painel cPanel ou hPanel (Hospedagem de Sites comum) que suporta **Node.js**:

1. Acesse o **hPanel** da Hostinger.
2. Navegue até o seu domínio (ex: `viasegcorretora.com.br`).
3. Vá em **Avançado** > **Node.js**.
4. Se o painel não tiver a opção Node.js, você precisará exportar o site como estático. (O Next.js permite exportação estática).

### Alternativa A: Exportação Estática (Para hospedagens comuns HTML/PHP)
Como o nosso site é institucional e rápido, podemos exportá-lo como um site HTML puro.
1. No seu arquivo `next.config.ts`, adicione `output: 'export'`.
2. Rode no seu computador: `npm run build`.
3. O Next.js criará uma pasta chamada `out/`.
4. Compacte todo o conteúdo da pasta `out/` em um arquivo `.zip`.
5. Vá ao **Gerenciador de Arquivos** da Hostinger.
6. Acesse a pasta `public_html`.
7. Faça o upload do arquivo `.zip` e extraia. O site estará no ar instantaneamente!

### Alternativa B: Hostinger VPS (Para rodar o Servidor Next.js Node.js completo)
1. Acesse seu servidor via SSH.
2. Instale Node.js e Git.
3. Clone o repositório: `git clone https://github.com/SeuUsuario/viaseg-premium.git`.
4. Entre na pasta: `cd viaseg-premium`.
5. Instale as dependências: `npm install`.
6. Gere a build: `npm run build`.
7. Inicie com PM2 (gerenciador de processos): `npx pm2 start npm --name "viaseg" -- start`.
8. Configure o Nginx para redirecionar o tráfego da porta 80 para a porta 3000 (onde roda o Next.js).

## 3. Configurando Domínio e SSL
1. No painel da Hostinger, vá em **SSL**.
2. Clique em **Instalar SSL Gratuito**. O processo é automático e leva cerca de 5 minutos.
3. Certifique-se de que a opção **"Forçar HTTPS"** está ativada, o Google exige isso (parte das diretrizes E-E-A-T de SEO aplicadas no projeto).

## Conclusão
Pronto! Seu site agora está online, super rápido (com as otimizações de Core Web Vitals) e pronto para receber tráfego e clientes.

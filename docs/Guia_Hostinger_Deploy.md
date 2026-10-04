# Guia de Deploy Simples: Publicando o site da ViaSeg na Hostinger

Este é um guia passo a passo voltado para iniciantes. Vamos publicar o site da ViaSeg na Hostinger da maneira mais simples e barata possível: **exportando o site como HTML estático**. 

Esse método funciona em qualquer plano comum da Hostinger (Hospedagem Compartilhada) e não exige servidores VPS ou comandos Linux complexos.

---

## Passo 1: Preparar o Next.js para Exportação Estática

O Next.js precisa saber que vamos gerar arquivos HTML puros para a Hostinger. 

1. Abra o arquivo `next.config.ts` (na raiz do projeto).
2. Adicione as configurações de `output: 'export'` e `unoptimized: true` conforme o exemplo abaixo:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Indica que o Next.js deve gerar HTML/CSS estáticos
  images: {
    unoptimized: true, // Necessário para gerar imagens em HTML estático sem servidor Node.js
  },
  // ... outras configurações se existirem ...
};

export default nextConfig;
```

---

## Passo 2: Gerar os Arquivos do Site

Com o arquivo configurado, vamos compilar o site:

1. No terminal do seu computador, execute o comando:
   ```bash
   npm run build
   ```
2. Aguarde a finalização da compilação.
3. Quando o build terminar, você verá que o Next.js criou uma pasta nova chamada **`out`** na raiz do seu projeto.
4. **Compacte (adicione para o formato ZIP)** todo o conteúdo interno da pasta **`out`** (certifique-se de compactar os arquivos de dentro dela, e não a pasta `out` em si). Nomeie o arquivo como `site-viaseg.zip`.

---

## Passo 3: Subir o Site para a Hostinger (Painel hPanel)

1. Acesse a sua conta da **Hostinger** e entre no **hPanel** do seu domínio.
2. Vá em **Arquivos** e abra o **Gerenciador de Arquivos**.
3. Acesse a pasta do seu site chamada **`public_html`**.
4. Se houver algum arquivo padrão da Hostinger lá dentro (como um `default.php` ou `index.php` de boas-vindas), exclua-o para evitar conflitos.
5. Faça o upload do arquivo `site-viaseg.zip` para dentro de `public_html`. **Nunca suba arquivos soltos**: sempre o zip completo.
6. Clique com o botão direito no arquivo `site-viaseg.zip` dentro do gerenciador e selecione **Extrair** (ou Descompactar).
7. **Atenção ao destino:** a janela de extração preenche sozinha um nome de pasta. O destino tem que ser a própria `public_html`. Se os arquivos forem para uma subpasta (`site-viaseg`, `viaseg`), o site no ar não muda.
8. Se perguntar sobre arquivos repetidos, escolha **Replace all**.
9. Confira que `index.html`, `.htaccess` e `_next` estão soltos na `public_html` e que não ficou subpasta. Apague o zip.
10. Peça a conferência do site no ar contra a pasta `out/`. Só depois disso grave no git e envie ao GitHub.

---

## Passo 4: Ativar o SSL (HTTPS) Obrigatório

O Google exige segurança para indexar sites. Na Hostinger:

1. No painel hPanel, busque por **SSL**.
2. Clique em **Instalar SSL** e selecione o seu domínio. O processo é automático e gratuito.
3. Ative a opção **"Forçar HTTPS"** para garantir que qualquer pessoa que tente acessar caia no link seguro.

---

## Pronto! 🎉
O seu site da ViaSeg Corretora está no ar, ultra rápido, livre de travamentos e indexado perfeitamente no Google!

# Specifications (SPEC) — ViaSeg Corretora

> Documento técnico: **como** o site foi construído.
> O que ele entrega: [PRD.md](PRD.md) · Mapa geral: [ARQUITETURA.md](ARQUITETURA.md)
>
> Última revisão: 22/08/2026.

## 1. Stack

| Item | Versão |
|---|---|
| Next.js (App Router) | 16.2.9 |
| React | 19.2.4 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Framer Motion | 12 |
| Lucide React | ícones |
| React Hook Form + Zod | formulários e validação |

Sem CMS e sem banco de dados. O conteúdo é escrito direto nos componentes.

## 2. Estrutura de pastas

```
src/app/              rotas (page.tsx / layout.tsx por pasta)
src/components/
  ConsentMode.tsx     nega todo rastreamento antes de qualquer tag
  GoogleTagManager.tsx
  layout/             Header, Footer
  sections/           ParceirosSection
  ui/                 CookieConsent, BotaoGerenciarCookies
src/lib/
  empresa.ts          SUSEP, endereço, contato, ano de atuação
  rastreamento.ts     GTM, chave liga/desliga, contas configuradas
  utils.ts
public/               imagens, .htaccess, send.php
docs/                 guias de deploy, formulário, SEO e design
```

Dados oficiais da corretora ficam centralizados em `src/lib/empresa.ts`. Rodapé
e páginas legais leem de lá — não repetir esses valores soltos pelo código.

## 3. Build estático

`next.config.ts` usa `output: 'export'` com `images: { unoptimized: true }`.
O build gera a pasta `out/` com HTML puro, que roda em hospedagem compartilhada
sem servidor Node.

```bash
npm run build
```

### Duas limitações do modo estático

**1. `headers()` é ignorado.** Com `output: 'export'`, o Next.js descarta a
função `headers()` do `next.config.ts` — ela só funciona com um servidor Node
rodando. CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options` e
`Referrer-Policy` **precisam estar em `public/.htaccess`**, que é o arquivo que
o Apache/LiteSpeed da Hostinger realmente lê.

Essa função foi removida do config de propósito. Recolocá-la gera falsa sensação
de segurança: o build avisa, mas o aviso passa despercebido.

**2. `quality` do `<Image>` não tem efeito.** Com `unoptimized: true` o Next
entrega o arquivo original sem reprocessar. A propriedade `quality` é ignorada;
`images.qualities` no config existe apenas para silenciar o aviso.

## 4. Arquivos obrigatórios em `public/`

Tudo em `public/` é copiado para `out/` durante o build.

| Arquivo | Função |
|---|---|
| `.htaccess` | HTTPS, redirecionamento www, URLs sem `.html`, 404, cabeçalhos de segurança, bloqueio de arquivos sensíveis, cache |
| `send.php` | processa o formulário de contato pelo e-mail da Hostinger |
| `images/` | fotos, logo e as 9 logos de seguradoras |

## 5. Formulário de contato

`public/send.php` é o único endpoint. Recebe JSON
`{nome, email, whatsapp, assunto}` e devolve `{success, message}`.

Proteções:

- remove `\r`, `\n`, tabs e bytes nulos de todos os campos — sem isso, um nome
  com quebra de linha injeta cabeçalhos no e-mail e transforma o formulário em
  relé de spam;
- valida o e-mail com `FILTER_VALIDATE_EMAIL` antes de usar no `Reply-To`;
- aceita requisição apenas das origens do próprio domínio;
- limita 5 envios por hora por IP, com arquivo temporário indexado por hash;
- campo-armadilha `website`, invisível ao visitante;
- limite de tamanho por campo e no corpo da requisição.

Escrito para rodar em PHP antigo: sem arrow functions e com alternativa ao
`mb_substr`.

> Não é testável localmente: o servidor de desenvolvimento do Next.js não
> executa PHP, e `mail()` depende de um servidor de e-mail configurado. O teste
> só acontece na Hostinger. Verificado em produção em **23/08/2026**.

O `mail()` da Hostinger entrega pela fila local do servidor e **não usa senha** —
nenhuma credencial de caixa entra no projeto. Mas exige que as duas caixas
existam de verdade no hPanel: `contato@` (destino) e `no-reply@` (remetente).
Remetente que não é caixa real faz a Hostinger recusar o envio.

## 6. Consentimento e rastreamento

Ordem obrigatória no `<head>` de `src/app/layout.tsx`:

1. `<ConsentMode />` — define o Consent Mode do Google com **tudo negado**;
2. `<GoogleTagManagerHead />` — carrega o contêiner.

Invertendo a ordem, as tags disparam antes da decisão do visitante.

`CookieConsent` chama `gtag('consent','update',...)` quando o visitante decide,
e empurra um evento no `dataLayer`. O botão em `/cookies` dispara o evento
`viaseg:gerenciar-cookies`, que reabre o aviso — exigência de revogação da LGPD.

As tags (GA4, Ads, Pixel) **não estão no código**: vivem no contêiner do GTM.
Trocar tag ou adicionar conversão não exige build novo.

Ao adicionar qualquer domínio de medição, **liberar na CSP do `.htaccess`**.
Domínio não liberado é bloqueado em silêncio, sem erro visível.

## 7. SEO técnico

- `metadataBase` e `alternates.canonical` em todas as páginas, apontando para
  o endereço com `www`;
- redirecionamento 301 de não-www para www no `.htaccess`;
- `sitemap.ts` com **data fixa por página**. Não usar `new Date()`: carimba a
  data do build em tudo e o Google passa a ignorar o sinal;
- `robots.ts` gerando `robots.txt` e apontando o sitemap;
- JSON-LD `InsuranceAgency` no layout raiz;
- imagens em WebP.

## 8. Cuidados com as logos das seguradoras

- os 9 arquivos em `public/images/logo-seguradoras/` **têm fundo transparente**.
  Arquivo com fundo branco aparece como retângulo sobre a faixa;
- ao trocar uma logo mantendo o nome, **incrementar `VERSAO_LOGOS`** no
  componente (`?v=2` → `?v=3`), senão o cache do navegador mantém a antiga;
- **nunca usar `loading="lazy"`** na esteira: ela tem milhares de pixels de
  largura e o navegador adia o carregamento indefinidamente.

## 9. Deploy

Dois caminhos, descritos em [docs/Guia_Hostinger_Deploy.md](docs/Guia_Hostinger_Deploy.md):

1. **Manual** — compactar o conteúdo de dentro de `out/` e extrair em
   `public_html` pelo hPanel. Não exige credenciais de FTP.
2. **Automático** — `upload_ftp.py`, que lê `.env.production` e usa **FTPS**
   (conexão criptografada; `FTP_TLS=false` cai para FTP puro se o plano exigir).

O `.env.production` contém senha e **nunca** vai para o Git. A regra `.env*` do
`.gitignore` cobre isso, com exceção explícita para `.env.producao.exemplo`,
que é o modelo em branco.

Conferir sempre no pacote gerado: `.htaccess` presente (começa com ponto e é
frequentemente ignorado por compactadores), conteúdo na raiz do ZIP e não dentro
de uma pasta `out`, e `send.php` presente.

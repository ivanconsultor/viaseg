# Specifications (SPEC) — ViaSeg Corretora

> Documento técnico: **como** o site foi construído.
> O que ele deve entregar está no [PRD.md](PRD.md).

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

Não usa CMS. Todo o conteúdo é escrito direto nos componentes.

## 2. Estrutura de pastas

```
src/app/              rotas (page.tsx / layout.tsx por pasta)
src/components/
  layout/             Header, Footer
  sections/           ParceirosSection
  ui/                 CookieConsent
  SafeShadowBoundary.tsx, ScrollToTop.tsx
src/lib/utils.ts
public/               imagens, .htaccess, send.php, enviar.php
docs/                 guias de deploy, formulário, SEO e design
```

## 3. Build estático

O `next.config.ts` usa `output: 'export'` com `images: { unoptimized: true }`.
O build gera a pasta `out/` com HTML puro, que roda em hospedagem compartilhada
sem servidor Node.

```bash
npm run build
```

### Limitação importante do modo estático

Com `output: 'export'`, o Next.js **ignora a função `headers()`** do
`next.config.ts` — ela só funciona quando existe um servidor Node rodando.

Isso significa que CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options` e
`Referrer-Policy` **não são aplicados** pela configuração do Next.

Esses headers precisam ser definidos no `public/.htaccess`, que é o arquivo que o
Apache/LiteSpeed da Hostinger realmente lê.

## 4. Arquivos obrigatórios em `public/`

Tudo que está em `public/` é copiado para `out/` durante o build.

| Arquivo | Função |
|---|---|
| `.htaccess` | força HTTPS, URLs sem `.html`, página 404, headers de segurança |
| `send.php` | processa o formulário de contato via e-mail da Hostinger |
| `enviar.php` | atalho que chama o `send.php` |
| `images/` | fotos, logo e logos das seguradoras |

## 5. SEO técnico

- Metadados e Open Graph por página, via `layout.tsx` de cada rota.
- JSON-LD com Schema.org `InsuranceAgency` no layout raiz.
- `sitemap.ts` e `robots.ts` gerando `sitemap.xml` e `robots.txt` no build.
- Imagens em WebP.

## 6. Deploy

Dois caminhos, descritos em [docs/Guia_Hostinger_Deploy.md](docs/Guia_Hostinger_Deploy.md):

1. Manual — compactar o conteúdo de `out/` e extrair em `public_html` pelo hPanel.
2. Automático — `upload_ftp.py`, que lê as credenciais de `.env.production`.

O `.env.production` contém senha e **nunca** pode ir para o Git. Está coberto
pela regra `.env*` do `.gitignore`.

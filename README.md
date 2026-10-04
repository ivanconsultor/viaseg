# ViaSeg Corretora — site institucional

Site da ViaSeg Corretora de Seguros. Next.js exportado como site estático e
publicado em hospedagem compartilhada Hostinger.

- Endereço oficial: **https://www.viasegcorretora.com.br** (sem www redireciona)
- Corretor registrado na SUSEP sob o nº **201096702**, atuando desde 2005

**Comece pelo [ARQUITETURA.md](ARQUITETURA.md)** se você é novo no projeto: ele
tem o mapa geral, os identificadores de rastreamento e as armadilhas conhecidas.

## Documentação

| Arquivo | Para quê |
|---|---|
| [ARQUITETURA.md](ARQUITETURA.md) | **mapa completo** — do código ao rastreamento em produção |
| [PRD.md](PRD.md) | o que o site precisa entregar |
| [SPEC.md](SPEC.md) | como foi construído |
| [AGENTS.md](AGENTS.md) | regras de design, cores e processo de publicação |
| [docs/Guia_Hostinger_Deploy.md](docs/Guia_Hostinger_Deploy.md) | passo a passo para publicar |
| [docs/Guia_Formulario_Contato.md](docs/Guia_Formulario_Contato.md) | como o formulário envia e-mail |
| [docs/SEO.md](docs/SEO.md) | plano de SEO técnico |
| [docs/referencias_design.md](docs/referencias_design.md) | referências visuais |
| `CA07 meta/rastreamento-viaseg.md` (fora deste repo) | **documentação oficial do rastreamento** (GTM, Stape, Meta) |
| [docs/trackeamento-formulario-retomada.md](docs/trackeamento-formulario-retomada.md) | histórico do diagnóstico de 01/10/2026 — superado |

## Rodar no computador

```bash
npm install
npm run dev
```

Abre em http://localhost:3000.

## Gerar o site para publicar

```bash
npm run build
```

Gera a pasta `out/` com o site pronto. O conteúdo **de dentro** dessa pasta,
compactado como `site-viaseg.zip`, é o que vai para `public_html` na Hostinger.

Confira sempre que `out/.htaccess`, `out/send.php` e `out/capi-config.php`
foram gerados — sem os dois primeiros as URLs quebram e o formulário para.

**Publicar é só o zip completo**, extraído direto na `public_html` (sem
subpasta), conferido no ar e só então gravado no Git. Regras completas na
seção 4 do [AGENTS.md](AGENTS.md).

## Avisos

- `.env.production` guarda a senha do FTP. Nunca versionar. Já está no `.gitignore`.
- `public/capi-config.php` guarda o token da API de Conversões da Meta. Nunca
  versionar (está no `.gitignore`); o modelo é `public/capi-config.example.php`.
  Como ele vai para dentro do `site-viaseg.zip`, o zip também não pode ficar em
  pasta versionada.
- `out/`, `node_modules/` e arquivos `.zip` não vão para o Git — são gerados.

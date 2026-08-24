# Diretrizes de Desenvolvimento e Governança - ViaSeg Corretora Premium

Este documento estabelece as regras de design, arquitetura e processos de publicação exclusivos do projeto **ViaSeg Corretora (viaseg-premium)**.

---

## 🎨 1. Sistema de Design e Identidade Visual

### Paleta de Cores Obrigatória:
- **Fundo Principal (Background):** `#fdfdfd` (Branco limpo / Off-white).
- **Texto Principal (Foreground):** `#1A1A2E` (Azul-marinho escuro profundo de alta legibilidade).
- **Cor Primária (Destaque/Ações):** `#FF6B00` (Laranja vibrante institucional da ViaSeg).
- **Cor Primária Hover:** `#e05e00` (Laranja escuro para estados hover).
- **Cartões & Seções:** `#ffffff` (Branco puro) com bordas `border-slate-200` e sombras suaves `shadow-sm`.
- **Seção Noturna (Rodapé/CTA):** `#1A1A2E` com texto em `#ffffff` e contraste controlado.

### Regra Estrita de Tema (Strict Light Mode):
- É **proibido** utilizar classes utilitárias `dark:` do Tailwind que alterem fundos para preto (`#0b0c10`) mantendo o texto em tom escuro (`#1A1A2E`). 
- Toda a interface deve manter leitura nítida, amigável e contraste impecável (Web Content Accessibility Guidelines - WCAG AAA) em qualquer dispositivo ou configuração de sistema operacional.

---

## 🏢 2. Componentes e Parceiros

### Seção de Seguradoras Parceiras (`ParceirosSection.tsx`):
- Componente único, usado na **Home (`/`)** e na página **Parceiros (`/parceiros`)**. Alterar num lugar altera nos dois.
- Logos disponíveis hoje (9): Porto Seguro, Allianz, Azul, HDI, Tokio Marine, Suhai, Icatu, Itaú e MAG.
- Os arquivos em `public/images/logo-seguradoras/` **têm fundo transparente**. Se substituir alguma logo, garanta que a nova também tenha — arquivo com fundo branco aparece como um retângulo sobre a faixa.
- Ao trocar qualquer logo mantendo o mesmo nome de arquivo, **incremente `VERSAO_LOGOS`** no componente (`?v=2` → `?v=3`). Sem isso, quem já visitou o site continua vendo a versão antiga em cache.
- Nunca usar `loading="lazy"` nas logos: a esteira tem milhares de pixels de largura e o navegador adia o carregamento indefinidamente, deixando a faixa vazia.

### Peso das imagens
- Com `images: { unoptimized: true }`, o Next entrega o arquivo **exatamente como esta na pasta**. Nao redimensiona nada. Foto salva em resolucao de camera vai inteira para o visitante.
- **Converter para WebP nao basta.** WebP reduz bytes por pixel; nao reduz a quantidade de pixels. Em 23/08/2026 a home pesava **16 MB**, sendo 8,5 MB so na foto do topo (7984x5323 exibida a 375 de largura no celular) e 2,4 MB na logomarca (2048x2048 exibida a 40x40).
- Antes de adicionar qualquer foto, **redimensionar para perto do tamanho de exibicao**. Referencia do que ficou no projeto: foto de fundo 1920x1280, foto de secao 1200x800, logomarca 256x256, WebP com qualidade 82 (90 na logomarca).
- Lazy loading nao resolve peso, so adia. E a foto do topo **nao pode** ser lazy: e ela que o Google cronometra no LCP.

---

## 🔒 3. Segurança e Rastreamento

### Cabeçalhos de segurança
- Com `output: 'export'`, o Next.js **ignora a função `headers()`** do `next.config.ts`. CSP, HSTS e demais cabeçalhos só existem se estiverem em `public/.htaccess`. Não recolocar `headers()` no config: gera falsa sensação de segurança.

### Consentimento antes de qualquer tag
- Ordem obrigatória no `<head>`: `<ConsentMode />` primeiro, `<GoogleTagManagerHead />` depois. O Consent Mode nega tudo por padrão; o `CookieConsent` libera quando o visitante aceita.
- Contas configuradas estão em `src/lib/rastreamento.ts`. As tags (GA4, Ads, Pixel) vivem dentro do contêiner GTM, não no código.
- Ao adicionar qualquer domínio de rastreamento novo, **liberar na CSP do `.htaccess`** — senão é bloqueado em silêncio, sem erro visível. Preferir curinga (`*.doubleclick.net`) a domínio por domínio: liberar um a um já obrigou duas rodadas de correção.

### Contêiner do servidor (Stape)
- O contêiner web **não fala direto com o Google**: `transport_url` manda tudo para `server.viasegcorretora.com.br`. Se faltar a tag de reencaminho no servidor, o dado morre lá — foi o que deixou o Analytics **sete meses sem receber nada**, sem aviso nenhum.
- Depois de qualquer mudança no contêiner servidor ou no `transport_url`, **conferir o Tempo real do Analytics**. É o único jeito de ver o buraco.
- Os dois acionadores do servidor são o mesmo filtro invertido (`^(Pageview|Lead)`): Analytics recebe o que não é da Meta, Meta recebe o que é dela. Mexer num sem mexer no outro cria evento duplicado ou perdido.
- **O nome do evento nasce no contêiner web, não no servidor.** A tag `FB API` do servidor é uma *Conversions API Tag* e não tem campo de nome de evento: repassa o que chegou. Quem decide é `1 - FB API - PageView` no contêiner **web**, campo **Nome do evento**.
- **Maiúscula importa.** O campo estava `Pageview` e o pixel do navegador mandava `PageView`: para a Meta eram dois eventos distintos, a deduplicação por `{{Event ID}}` não acontecia e **cada visita contava duas vezes**. Corrigido em 24/08/2026. Os acionadores usam `ignorar caso`, então trocar a caixa não os quebra.
- **Pixel ativo: `526511238923127`.** O `4860127807422598` teve a instalação automática removida em 23/08/2026. Navegador e servidor precisam usar **o mesmo** pixel, senão a deduplicação por `{{Event ID}}` para de funcionar.

### Formulário
- `public/send.php` é o único endpoint. Remove quebras de linha dos campos (injeção de cabeçalho de e-mail), valida o e-mail, restringe origem, limita envios por IP e tem campo-armadilha.

---

### Favicon
- O `.ico` mora em **`public/favicon.ico`**, nunca em `src/app/`. Em `src/app/` o Next.js gera sozinho um `href` com código de build (`/favicon.ico?favicon.<hash>.ico`) que muda a cada publicação, e o Google exige endereço estável para exibir o ícone na busca.
- O endereço fixo vem de `icons: { icon: "/favicon.ico" }` no `layout.tsx`. Deixar o arquivo nos dois lugares faz o Next declarar **duas** tags de ícone.
- O `.ico` precisa conter um tamanho múltiplo de 48. O nosso tem 16, 32, 48 e 256.

---

## ⚙️ 4. Processo de Build e Deploy (Hostinger Apache)

1. **Configuração Next.js (`next.config.ts`):**
   - Configurado para exportação estática (`output: 'export'`, `images: { unoptimized: true }`).

2. **Arquivos Obrigatórios na pasta `public/`:**
   - **`.htaccess`**: SSL (HTTPS), **redirecionamento para www**, URLs amigáveis sem `.html`, página 404, cabeçalhos de segurança e bloqueio de arquivos sensíveis.
   - **`send.php`**: Script PHP que processa o formulário de contato pela infraestrutura de e-mail da Hostinger. (`enviar.php` foi removido — era duplicata sem uso.)

3. **Comando de Build (Windows PowerShell / CMD):**
   ```cmd
   cmd /c npm run build
   ```

4. **Geramento do Pacote ZIP (`site-viaseg.zip`):**
   - O arquivo ZIP de entrega deve incluir os conteúdos internos da pasta `out/` (garantindo `.htaccess` e `send.php` na raiz do pacote ZIP).
   - O arquivo final é atualizado diretamente na Área de Trabalho (`C:\Users\ivanc\Desktop\site-viaseg.zip`).

---

## 📋 5. Identificação obrigatória

- Ivan atua como **corretor pessoa física**: a identificação oficial é o **registro SUSEP**, não CNPJ.
- ⚠️ **`65956F` não é a SUSEP.** Esse número, presente nos links de cotação, é o código interno do corretor na Porto Seguro. Nunca publicá-lo como registro SUSEP.
- Enquanto `EMPRESA.susep` estiver vazio, rodapé e páginas legais omitem o registro automaticamente.
- Dados oficiais ficam centralizados em `src/lib/empresa.ts`. Rodapé e páginas legais leem de lá — não repetir esses dados soltos pelo código.
- `ATUALIZADO_EM` é a data da **última mudança real do texto legal**. Não usar o ano de fundação nesse campo: as políticas citam LGPD, GA4 e Meta Pixel, então uma data antiga se contradiz sozinha. O tempo de atuação aparece em `EMPRESA.atuaDesde` e no rodapé.

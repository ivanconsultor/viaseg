# ▶ ONDE PARAMOS — 01/10/2026, noite

**Próximo passo (Ivan):** gerar um token novo da API de Conversões e trocar em
**dois** lugares. Suspeita principal: o token atual expirou, e por isso nada
chega pelo servidor desde setembro.

1. Gerenciador de Eventos → Pixel ViaSeg → Configurações → API de Conversões →
   **Gerar token de acesso**
2. Colar o token novo:
   - na tag **`FB API`** do contêiner servidor `GTM-KW5B6Z6P` (abrir com
     `authuser=1`) → **publicar**;
   - no arquivo **`public_html/capi-config.php`** da Hostinger (editor do
     gerenciador de arquivos), trocando só o texto entre aspas da linha
     `VIASEG_CAPI_TOKEN`.
3. Avisar o Claude → ele envia um formulário de teste e confere ao vivo na aba
   **Eventos de teste** da Meta (o `Lead` tem que aparecer vindo do servidor).

**O que já está no ar:**
- `send.php` novo (manda o `Lead` direto para a API de Conversões),
  `capi-config.php`, `fale-conosco.html`/`.txt` e o chunk
  `_next/static/chunks/04c3mokrbyx80.js` — enviados arquivo por arquivo.
- GTM web publicado: variável `DL - lead_event_id` e campo Event ID da tag
  `3 - FB - Lead - Página de Contato` = `{{DL - lead_event_id}}`.
- Teste de 01/10: `send.php` respondeu sucesso e o pixel saiu com o mesmo
  `event_id` do servidor (`31541d8b-7723-4ef3-bc44-a3b7f7f9c330`).

**Pendências menores:**
- `.htaccess` novo **não** foi enviado (só acrescenta uma tranca no
  `capi-config.php`; sobe num deploy tranquilo).
- 19 pastas duplicadas na `public_html` (`_next.2499`, `fale-conosco.7461`...)
  para o Ivan apagar — só as que têm ponto + 4 números no fim.
- Código **não commitado** no git (`send.php`, `fale-conosco/page.tsx`,
  `.htaccess`, `.gitignore`, `capi-config.example.php`, este documento).
- Depois do servidor funcionando: trocar `Lead - WhatsApp` pelo evento padrão
  `Contact`; pedir análise da categoria restrita na Meta.

---

# Rastreamento do formulário — diagnóstico fechado

> Investigado ao vivo em 01/10/2026, no site publicado, com captura completa de
> rede (CDP + resource timing) e inspeção do estado do `fbq` e do GTM.

## O que está certo — não mexer

| Peça | Verificação |
|---|---|
| `src/app/fale-conosco/page.tsx` | empurra `formulario_enviado` com `lead_email` minúsculo e `lead_telefone` em E.164. Confirmado com **dois envios reais** |
| Variáveis `DL - lead_email` / `DL - lead_telefone` | resolvem em tempo de execução; nome `lead_email`, versão 2 da camada |
| Build publicado na Hostinger | o chunk `3ywscvtkb6hl_.js` servido em produção contém o `formulario_enviado` |
| Consentimento | `default` tudo negado → `update` concedido, na ordem certa |
| Contêiner servidor `GTM-KW5B6Z6P` | acionadores RegEx `^(Pageview\|Lead)` ignorando caso; tag `FB API` com o pixel `526511238923127`; versão 5 ativa |
| Transporte | no carregamento saem `en=page_view` e `en=PageView` para `server.viasegcorretora.com.br/g/collect` |

## Defeito 1 — nenhum evento do GA4 sai depois do carregamento

Nem por tag do GTM, nem chamando `gtag('event', ...)` direto no console:
**zero requisições**, nenhuma tentativa de rede.

Estado interno da página: `google_tag_data.tidr.destination` está **vazio**
(`destinationArray` declara `G-WWDS8CMG8P` e `AW-17845467917`, e `pending` tem 4
itens). Sem destino registrado, o `gtag` aceita o evento e descarta.

Derruba em silêncio:

| Tag | Nunca sai |
|---|---|
| `3 - FB API - Lead - Página de Contato` | e-mail e telefone pela API de Conversões |
| `8 - GA4 - Lead - Formulario` | `generate_lead` no Analytics |
| `8 - GA4 - Lead - WhatsApp` + `2 - FB API` | lead do WhatsApp |
| `8 - GA4 - Lead - Porto online` + `4 - FB API` | lead da cotação Porto |
| `9 - GA4 - Clique rede social` | cliques nas redes |

## Defeito 2 — o pixel do navegador manda `Lead` sem e-mail e sem telefone

```
fbq.getState() → pixel 526511238923127
  userData: { cn: "br", country: "br" }
```

A requisição `facebook.com/tr?ev=Lead` tem `ud[cn]` e `ud[country]`, e **nenhum**
`ud[em]` ou `ud[ph]` — mesmo com a Advanced Matching ligada e os campos mapeados.

Um `fbq('init', '526511238923127', {em, ph})` **tardio é ignorado**: o `userData`
não muda. Duas causas possíveis, ainda não separadas:

- **(a)** a restrição de *configuração básica* da Meta no conjunto de dados
  remove a correspondência avançada;
- **(b)** o pixel já foi inicializado pela tag `1 - FB - Pageview` sem dados do
  usuário, e ignora o init posterior da tag de Lead.

## Falso alarme descartado

A alteração pendente no espaço de trabalho web (`server_container_url =
{{Transport URL}}` na tag 3) **não é a correção**: a `1 - FB API - PageView`, a
única do tipo que funciona, não tem esse parâmetro. Descartar.

## Pendências da Meta (decisão do Ivan)

1. **Restrições de compartilhamento de dados** no conjunto `Pixel ViaSeg`:
   categoria que aplica *configuração básica*. Contestável em **Gerenciar
   categorias** → pedir análise. Enquanto isso valer, qualquer correção técnica
   pode ser anulada pela própria Meta.
2. **Confirmar eventos personalizados**, em `Pixel ViaSeg` e em `Pixel GTM - API`.

## Acessos

- Contêiner web: `tagmanager.google.com/?authuser=1#/container/accounts/6056679392/containers/239295280/workspaces/8/tags`
- Contêiner servidor: `tagmanager.google.com/?authuser=1#/container/accounts/6056361693/containers/239947155/workspaces/6/tags`
  — **só aparece com `authuser=1`** (`viasegcorretora@gmail.com`); o login
  `ivanconsultor3@gmail.com` enxerga apenas o contêiner web.
- Stape (`app.stape.io`): **não está logada** nesse perfil do Chrome.

---

## Varredura do Gerenciador de Eventos (01/10/2026, noite)

### Já está correto — não mexer

| Configuração | Estado |
|---|---|
| Correspondência avançada automática | ativada, todos os campos (e-mail, telefone, nome, cidade, país, nascimento, ID externa) |
| Cookies internos | ativados |
| Lista de permissão de tráfego | `viasegcorretora.com.br` e subdomínios (desde 27/09) |
| Rastreamento automático sem código | desativado — certo para quem tem configuração manual |
| Conta de anúncios vinculada | ViaSeg Corretora `3110020279309352` |

A correspondência automática não consegue ler o formulário porque ele fica
dentro de um Shadow DOM (`SafeShadowBoundary`). Por isso o e-mail e o telefone
precisam ir pela API de Conversões (`send.php`).

### Problemas, em ordem de prioridade

1. **O caminho do servidor não entrega nada desde setembro.** `PageView` aparece
   como "Várias" só entre 3 e 6/set; de 27/set em diante, tudo "Navegador".
   O `send.php` usa **o mesmo token** da tag `FB API` da Stape. Suspeito nº 1:
   **token expirado ou revogado**. Conferir no Depurador de Token
   (developers.facebook.com/tools/debug/accesstoken) ou gerar um novo em
   Configurações → API de Conversões → Gerar token de acesso, e trocar nos dois
   lugares (tag `FB API` do contêiner servidor e `capi-config.php`).
2. **Configuração básica ativada.** Categoria do conjunto de dados: "Nenhuma",
   mas uma fonte de dados (o site) está em categoria restrita. A Meta descarta
   parâmetros personalizados e o caminho da URL. Pedir análise em
   Configurações → Gerencie as categorias de fontes de dados → Gerenciar.
   Corretora de seguros pode cair legitimamente em serviços financeiros; a
   análise pode não liberar.
3. **Eventos personalizados por confirmar** (`Lead - WhatsApp`). Melhor ainda:
   trocar por evento **padrão**. Com a configuração básica, parâmetros
   personalizados (como `lead_source`) são descartados, então diferenciar tipos
   de lead por parâmetro não funciona — por nome de evento padrão funciona:
   `Lead` (formulário), `Contact` (clique no WhatsApp).
4. **Conexão da API de Conversões "pendente"** em Configurações. Não é
   necessária para chamada direta com token; é uma integração que nunca foi
   concluída. Baixa prioridade.
5. **Ação de alta prioridade sugerida pela Meta:** conectar eventos de conversa
   do WhatsApp. Só se aplica a anúncios de clique para WhatsApp com a plataforma
   oficial do WhatsApp Business; o agente atual roda em Evolution GO. Fora do
   escopo agora.

### Atraso do painel

A visão geral chegou a ficar mais de 50 minutos sem contar eventos que saíram
do navegador com status 200. Não usar a visão geral para teste imediato.

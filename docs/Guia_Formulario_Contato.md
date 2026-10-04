# Guia Prático: Formulário de Contato Direto via E-mail da Hostinger

Para que o site envie as mensagens diretamente para o seu e-mail (`contato@viasegcorretora.com.br`) utilizando os servidores da própria Hostinger (sem depender de serviços de terceiros), criei e configurei a integração nativa via PHP.

---

## Como a Integração Funciona?

1. **`public/send.php` (Servidor):** Criei um script PHP seguro que roda nos servidores Apache/LiteSpeed da Hostinger. Ele recebe os dados de contato do site, limpa contra invasões e faz o disparo do e-mail usando a infraestrutura interna da Hostinger.
2. **`fale-conosco/page.tsx` (Frontend):** O formulário agora faz uma requisição assíncrona (`fetch`) apontando para `/send.php`. Como o site e o script rodam no mesmo domínio, o processo é instantâneo e invisível para o usuário.

---

## O que Você Precisa Fazer?

Absolutamente nada no código. Já deixei tudo configurado e programado para você!

### Passo Único: Compilar e Enviar o Site
1. No seu terminal local, rode:
   ```bash
   npm run build
   ```
2. Compacte o conteúdo gerado dentro da pasta **`out`** (que inclui as páginas em HTML e o script `send.php` gerado automaticamente).
3. Suba o ZIP na pasta **`public_html`** do gerenciador de arquivos da Hostinger e descompacte **direto na `public_html`** (sem subpasta). Passo a passo em [Guia_Hostinger_Deploy.md](Guia_Hostinger_Deploy.md).

---

## Detalhes Importantes (Ajustes Finais de E-mail)

- **E-mail de Destino:** O script está configurado para entregar as mensagens em `contato@viasegcorretora.com.br`. 
- **Caixa de Entrada / Spam:** No primeiro envio de teste pelo site, caso o e-mail demore a aparecer, verifique a pasta de **Spam/Lixo Eletrônico** do seu e-mail. Para evitar que caia no Spam:
  - Adicione o remetente `no-reply@viasegcorretora.com.br` aos seus contatos confiáveis.
  - Se desejar alterar o e-mail de recebimento no futuro, basta abrir o arquivo `public/send.php` e alterar a variável `$destino`:
    `$destino = "contato@viasegcorretora.com.br";`

---

## Rastreamento do envio (03/10/2026)

O envio também registra o lead na Meta e no Google, só com o aceite dos cookies:

- a página empurra `formulario_enviado` no `dataLayer` com e-mail, telefone e um `lead_event_id`;
- o GTM manda o `Lead` pelo navegador (pixel) e pelo servidor (Data Tag da Stape), casados pelo mesmo id.

Detalhes técnicos em [SPEC.md](../SPEC.md) (seção 5). Documentação oficial do rastreamento: `CA07 meta/rastreamento-viaseg.md`.

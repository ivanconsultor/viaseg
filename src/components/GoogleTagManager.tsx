import { GTM_ID, GTM_DOMINIO, RASTREAMENTO_ATIVO } from "@/lib/rastreamento";

/**
 * Carregador do GTM. Precisa vir DEPOIS do <ConsentMode />, que ja deixou tudo
 * negado por padrao - assim nenhuma tag dispara antes do visitante aceitar os
 * cookies. Quando ele aceita, o CookieConsent avisa o Google e as tags liberam.
 */
const carregador = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='${GTM_DOMINIO}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`;

export function GoogleTagManagerHead() {
  if (!RASTREAMENTO_ATIVO) return null;
  return <script dangerouslySetInnerHTML={{ __html: carregador }} />;
}

/** Alternativa para visitantes com JavaScript desligado. Vai logo apos <body>. */
export function GoogleTagManagerBody() {
  if (!RASTREAMENTO_ATIVO) return null;
  return (
    <noscript>
      <iframe
        src={`${GTM_DOMINIO}/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

/**
 * Consent Mode do Google - precisa rodar ANTES de qualquer tag (GTM, GA, Pixel).
 *
 * Enquanto o visitante nao decide, tudo fica NEGADO. Se ele ja tiver aceitado
 * numa visita anterior, a escolha e restaurada aqui mesmo, antes das tags
 * subirem, para nao piscar rastreamento indevido.
 *
 * O CookieConsent chama gtag("consent","update",...) quando o usuario decide.
 */
export const CHAVE_CONSENTIMENTO = "viaseg_cookie_consent";

const script = `
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  try {
    if (localStorage.getItem('${CHAVE_CONSENTIMENTO}') === 'accepted') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });
    }
  } catch (e) {}
})();
`;

export default function ConsentMode() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

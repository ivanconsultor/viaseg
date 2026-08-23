/**
 * Configuracao central do rastreamento.
 *
 * As tags reais NAO ficam aqui: sao gerenciadas dentro do proprio contentor do
 * GTM. O site so precisa carregar o GTM - o resto voce controla no painel, sem
 * precisar de build novo nem de novo envio para a Hostinger.
 *
 * CONTAS LIGADAS A ESTE SITE (para referencia, configuradas dentro do GTM):
 *   GTM (contentor Web ViaSeg)  GTM-K8MXPGMJ
 *   Google Analytics 4          G-WWDS8CMG8P
 *   Google Ads                  AW-17845467917
 *   Pixel do Facebook           4860127807422598  ("Pixel GTM - API")
 *   Conta de anuncios Meta      3110020279309352  (ViaSeg Corretora)
 *   Server-side (Stape)         server.viasegcorretora.com.br
 *
 * O Pixel esta configurado para navegador (GTM) e para servidor (Conversions
 * API via Stape). Os dominios de todos eles ja estao liberados na CSP em
 * public/.htaccess - sem aquela liberacao, nada disso registra.
 */

export const GTM_ID = "GTM-K8MXPGMJ";

/**
 * De onde o GTM e carregado.
 *
 * Hoje: servidores do Google.
 * Para migrar ao seu Stape (server-side), troque por:
 *     export const GTM_DOMINIO = "https://server.viasegcorretora.com.br";
 * Os dois dominios ja estao liberados na CSP do public/.htaccess.
 */
export const GTM_DOMINIO = "https://www.googletagmanager.com";

/**
 * Chave geral de liga/desliga.
 * Em false, nenhuma linha de rastreamento vai para o HTML gerado.
 */
export const RASTREAMENTO_ATIVO = true;

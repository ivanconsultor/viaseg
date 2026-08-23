/**
 * Dados oficiais usados nas paginas legais e no rodape.
 *
 * Ivan atua como CORRETOR PESSOA FISICA: a identificacao oficial e o registro
 * SUSEP, nao CNPJ. O campo cnpj fica vazio de proposito - as paginas se adaptam
 * e simplesmente nao o exibem. Se um dia houver pessoa juridica, basta preencher.
 */
export const EMPRESA = {
  nome: "ViaSeg Corretora de Seguros",
  cnpj: "", // vazio: atuacao como corretor pessoa fisica

  /**
   * Registro SUSEP do corretor (pessoa fisica), informado pelo Ivan.
   *
   * NAO CONFUNDIR com 65956F: aquele numero, presente nos links de cotacao,
   * e o codigo interno do corretor na Porto Seguro, nao o registro SUSEP.
   */
  susep: "201096702",
  atuaDesde: "2005",
  endereco: "Rua Dr Othon Machado, 150 - Sala 406, Inhaúma, Rio de Janeiro/RJ",
  telefone: "(21) 97684-4444",
  email: "contato@viasegcorretora.com.br",
  site: "https://www.viasegcorretora.com.br",
} as const;

/**
 * Data da ultima revisao REAL dos textos legais.
 *
 * Nao usar aqui o ano de fundacao: este campo diz quando o TEXTO mudou. Como as
 * politicas citam LGPD, GA4 e Meta Pixel, uma data antiga se contradiria sozinha.
 * O tempo de atuacao aparece em EMPRESA.atuaDesde, no rodape e na identificacao
 * do corretor - que e onde ele tem valor.
 */
export const ATUALIZADO_EM = "22/08/2026";

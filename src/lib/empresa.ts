/**
 * Dados oficiais da empresa, usados nas paginas legais e no rodape.
 *
 * >>> PREENCHER ANTES DE PUBLICAR <<<
 * CNPJ e registro SUSEP ainda estao em branco. Corretora de seguros e obrigada
 * a exibir o registro SUSEP, e as paginas legais precisam identificar quem e o
 * controlador dos dados. Basta preencher as duas linhas abaixo.
 */
export const EMPRESA = {
  nome: "ViaSeg Corretora de Seguros",
  cnpj: "", // ex.: "00.000.000/0001-00"
  susep: "", // ex.: "65956F"
  endereco: "Rua Dr Othon Machado, 150 - Sala 406, Inhaúma, Rio de Janeiro/RJ",
  telefone: "(21) 97684-4444",
  email: "contato@viasegcorretora.com.br",
  site: "https://www.viasegcorretora.com.br",
} as const;

/** Data da ultima revisao real dos textos legais. Mudar so quando o texto mudar. */
export const ATUALIZADO_EM = "22/08/2026";

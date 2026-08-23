import { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://www.viasegcorretora.com.br";

/**
 * Data da ULTIMA MUDANCA REAL de cada pagina - nao a data do build.
 *
 * Antes isto usava new Date(), o que carimbava a data da compilacao em todas as
 * paginas. A cada publicacao o sitemap avisava o Google que as 9 tinham mudado,
 * mesmo sem mudanca nenhuma. O Google usa esse campo para decidir o que revisitar
 * e passa a ignorar o sinal quando percebe que ele nao corresponde a realidade.
 *
 * COMO MANTER: ao alterar o conteudo de uma pagina, atualize a data dela aqui.
 */
type Pagina = {
  rota: string;
  atualizadoEm: string;
  frequencia: MetadataRoute.Sitemap[number]["changeFrequency"];
  prioridade: number;
};

const paginas: Pagina[] = [
  { rota: "",                       atualizadoEm: "2026-08-22", frequencia: "weekly",  prioridade: 1.0 },
  { rota: "/cotacao",               atualizadoEm: "2026-08-22", frequencia: "monthly", prioridade: 0.9 },
  { rota: "/seguros/auto",          atualizadoEm: "2026-08-22", frequencia: "monthly", prioridade: 0.8 },
  { rota: "/seguros/vida",          atualizadoEm: "2026-08-22", frequencia: "monthly", prioridade: 0.8 },
  { rota: "/seguros/residencial",   atualizadoEm: "2026-08-22", frequencia: "monthly", prioridade: 0.8 },
  { rota: "/seguros/empresarial",   atualizadoEm: "2026-08-22", frequencia: "monthly", prioridade: 0.8 },
  { rota: "/parceiros",             atualizadoEm: "2026-08-22", frequencia: "monthly", prioridade: 0.7 },
  { rota: "/sobre",                 atualizadoEm: "2026-08-22", frequencia: "monthly", prioridade: 0.7 },
  { rota: "/fale-conosco",          atualizadoEm: "2026-08-22", frequencia: "monthly", prioridade: 0.7 },
  // Paginas legais: entram com prioridade baixa. Elas estao linkadas no rodape de
  // todas as paginas, entao o Google acha de qualquer jeito - melhor declarar a
  // importancia real do que deixar ele adivinhar.
  { rota: "/privacidade",           atualizadoEm: "2026-08-22", frequencia: "yearly",  prioridade: 0.3 },
  { rota: "/termos",                atualizadoEm: "2026-08-22", frequencia: "yearly",  prioridade: 0.3 },
  { rota: "/cookies",               atualizadoEm: "2026-08-22", frequencia: "yearly",  prioridade: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paginas.map(({ rota, atualizadoEm, frequencia, prioridade }) => ({
    url: `${baseUrl}${rota}`,
    lastModified: new Date(atualizadoEm),
    changeFrequency: frequencia,
    priority: prioridade,
  }));
}

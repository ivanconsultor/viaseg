import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fale Conosco",
  description: "Entre em contato com a equipe da ViaSeg Corretora. Tire suas dúvidas, faça sugestões ou solicite atendimento personalizado de seguros.",
};

export default function FaleConoscoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/cotacao" },
  title: "Simulação e Cotação de Seguros Online",
  description: "Cote online o seguro ideal para o seu perfil com as melhores taxas do mercado. Auto, Residencial, Vida, Viagem, Celular e mais.",
};

export default function CotacaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

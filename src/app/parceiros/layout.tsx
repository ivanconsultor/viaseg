import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nossos Parceiros",
  description: "Trabalhamos em conjunto com as maiores e mais sólidas seguradoras do mercado brasileiro e internacional para garantir a melhor cobertura.",
};

export default function ParceirosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/termos" },
  title: "Termos de Uso",
  description: "Condições de uso do site da ViaSeg Corretora de Seguros: serviços, responsabilidades e limitações.",
};

export default function TermosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

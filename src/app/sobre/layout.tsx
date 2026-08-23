import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/sobre" },
  title: "Sobre a ViaSeg",
  description: "Conheça a história, missão, visão e valores da ViaSeg Corretora de Seguros. Transparência e proteção para sua vida e seus negócios.",
};

export default function SobreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

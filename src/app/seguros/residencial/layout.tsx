import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/seguros/residencial" },
  title: "Seguro Residencial",
  description: "Proteja seu lar e sua família com coberturas sob medida contra incêndio, roubo, danos elétricos e assistência residencial emergencial 24h.",
};

export default function SeguroResidencialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

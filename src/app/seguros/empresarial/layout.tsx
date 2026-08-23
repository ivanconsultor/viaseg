import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/seguros/empresarial" },
  title: "Seguro Empresarial",
  description: "Proteja o patrimônio e a operação da sua empresa. Coberturas personalizadas contra incêndio, danos elétricos, responsabilidade civil e mais.",
};

export default function SeguroEmpresarialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

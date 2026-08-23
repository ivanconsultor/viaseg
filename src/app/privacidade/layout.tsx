import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/privacidade" },
  title: "Política de Privacidade",
  description: "Como a ViaSeg Corretora de Seguros coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.",
};

export default function PrivacidadeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

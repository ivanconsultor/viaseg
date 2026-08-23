import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/seguros/vida" },
  title: "Seguro de Vida",
  description: "Tranquilidade e proteção financeira para quem você mais ama nos momentos mais difíceis. Conheça as opções de seguro de vida individual e familiar.",
};

export default function SeguroVidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

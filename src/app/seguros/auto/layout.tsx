import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seguro Auto",
  description: "Proteção completa para o seu veículo. Coberturas contra roubo, furto, colisão, terceiros e assistência 24h. Cote seu seguro auto online.",
};

export default function SeguroAutoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

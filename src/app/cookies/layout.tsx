import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/cookies" },
  title: "Política de Cookies",
  description: "O que são cookies, como a ViaSeg Corretora os utiliza e como você pode gerenciá-los.",
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

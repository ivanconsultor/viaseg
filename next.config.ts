import type { NextConfig } from "next";

/**
 * ATENCAO - cabecalhos de seguranca
 *
 * Este projeto usa output: 'export' (site estatico para a Hostinger).
 * Nesse modo o Next.js IGNORA a funcao headers() daqui - ela so funciona
 * quando existe um servidor Node rodando, o que nao e o caso na hospedagem
 * compartilhada.
 *
 * CSP, HSTS, X-Frame-Options e os demais cabecalhos estao declarados em
 * public/.htaccess, que e o arquivo que o Apache/LiteSpeed da Hostinger le.
 * Nao recoloque headers() aqui: gera falsa sensacao de seguranca.
 */
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    // Precisa declarar as qualidades usadas nos componentes <Image quality={...} />
    qualities: [75, 90, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

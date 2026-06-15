# Specifications (SPEC) - ViaSeg Corretora

## 1. Stack Tecnológico
- **Framework:** Next.js (App Router) v15+
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS (com classes utilitárias e Design System em `globals.css`)
- **Animações:** Framer Motion
- **Ícones:** Lucide React

## 2. Arquitetura de Pastas (App Router)
- `src/app/`: Contém as rotas da aplicação (`page.tsx`, `layout.tsx`).
- `src/app/sobre/`: Rota estática `/sobre`.
- `src/app/fale-conosco/`: Rota estática `/fale-conosco`.
- `src/app/parceiros/`: Rota estática `/parceiros`.
- `src/app/seguros/`: Rotas agrupadas por categoria de seguro (`auto`, `vida`, etc).
- `src/components/`: Componentes reutilizáveis (Header, Footer, CookieConsent, TiltCard, etc).
- `public/`: Imagens, favicons, robots.txt, sitemap.xml.

## 3. SEO Técnico Implementado
- **API nativa do Next.js:** `<Image />` para compressão automática (WebP) e eliminação de CLS (Cumulative Layout Shift).
- **Metadados Globais:** Open Graph configurado no `layout.tsx` para todas as páginas.
- **Dados Estruturados (JSON-LD):** Implementação de Schema.org `InsuranceAgency` no `RootLayout`.
- **Sitemap & Robots:** Gerados dinamicamente nativamente através dos arquivos `robots.ts` e `sitemap.ts`.

# Estrutura de Execução SEO Google - ViaSeg Corretora

Este arquivo é um guia prático consolidado do plano de SEO, listando os metadados, estrutura semântica e otimizações de performance aplicadas para adequação ao Google (Core Web Vitals e Metadados).

## 1. Metadados e Redes Sociais
No arquivo `index.html`, foram implementadas as seguintes tags:
- **SEO Base**: `title`, `description`, `keywords`, `author`, `robots` e `canonical`.
- **Open Graph (Facebook/WhatsApp/LinkedIn)**: Tags `og:type`, `og:title`, `og:description`, `og:url`, `og:image`.
- **Twitter Card**: Tags `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.

## 2. Dados Estruturados (JSON-LD)
Injeção de scripts para que o Google exiba resultados ricos:
- **Organization**: Define a ViaSeg como uma empresa, incluindo logo, telefone de contato e links sociais (Instagram, Facebook, LinkedIn).
- **WebSite**: Identifica o site e o idioma principal (pt-BR).

## 3. Otimizações de Performance (Core Web Vitals)
Ajustes realizados em elementos de mídia e estrutura para melhorar a pontuação no Google PageSpeed:
- **LCP (Largest Contentful Paint)**: A imagem principal do Hero recebeu a tag `fetchpriority="high"` para ser carregada com prioridade máxima.
- **CLS (Cumulative Layout Shift)**: Definimos `width="800"` e `height="600"` explicitamente na imagem do Hero para evitar saltos de layout.
- **Lazy Loading**: Adicionado `loading="lazy"` em ícones e componentes que não estão na visualização inicial ("abaixo da dobra").

## 4. HTML Semântico
- **Tags de Artigo**: Uso de `<article>` nos cards de serviços (Seguro Auto, Vida, etc.) para facilitar a indexação do conteúdo.
- **Hierarquia de Títulos**: Garantia de uso correto de `h1`, `h2` e `h3`.

## 5. SEO Técnico
- **robots.txt**: Localizado na raiz, guia os rastreadores e aponta para o Sitemap.
- **sitemap.xml**: Contém as URLs principais (`index.html`, `cotacao.html`, etc.) para agilizar a descoberta de páginas pelo Google.

---
_Este arquivo serve de referência para a estratégia de SEO da ViaSeg._

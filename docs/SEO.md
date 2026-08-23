# Plano de Otimização SEO Técnico — viasegcorretora

> **Documento mestre consolidado.** Reúne as diretrizes oficiais do Google e o plano de execução técnico (React + Sanity CMS) em um único guia de referência para o projeto **viasegcorretora**. Substitui e unifica os arquivos `plano_seo_google.md` e `SEO_google.md`.
>
> **Stack alvo:** React (SPA) · Sanity CMS · build estático servido via CDN
> **Domínio de referência:** `https://www.viasegcorretora.com.br` *(confirmar domínio final de produção)*

---

## Sumário

1. [Sumário executivo](#1-sumário-executivo)
2. [Contexto do projeto e por que SEO técnico importa aqui](#2-contexto-do-projeto)
3. [Core Web Vitals (métricas essenciais)](#3-core-web-vitals)
4. [Otimização de imagens (WebP/AVIF, lazy loading, aspect-ratio)](#4-otimização-de-imagens)
5. [HTML semântico](#5-html-semântico)
6. [Metadados, Open Graph e dados estruturados (Schema.org)](#6-metadados-open-graph-e-schemaorg)
7. [E-E-A-T para conteúdo YMYL de seguros](#7-e-e-a-t-para-conteúdo-ymyl)
8. [Arquitetura de URLs e tratamento de keywords](#8-arquitetura-de-urls-e-keywords)
9. [Sitemap.xml e robots.txt](#9-sitemapxml-e-robotstxt)
10. [Plano de execução técnico (dependências e arquivos)](#10-plano-de-execução-técnico)
11. [Checklist de validação e ferramentas](#11-checklist-de-validação-e-ferramentas)
12. [Priorização e roadmap](#12-priorização-e-roadmap)

---

## 1. Sumário executivo

Este plano descreve **o que o Google exige** para ranqueamento e **como aplicaremos** essas práticas no site da viasegcorretora. O objetivo é entregar uma página rápida, estável, semanticamente correta e confiável aos olhos do algoritmo — três pilares que, combinados, formam a base do ranqueamento técnico moderno.

Os limites oficiais do Google (fonte: web.dev / Google Search Central) que norteiam o projeto são:

| Métrica | O que mede | Meta "Bom" | Avaliação |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | Velocidade de carregamento | **≤ 2,5 s** | percentil 75 dos usuários reais |
| **INP** (Interaction to Next Paint) | Responsividade a interações | **≤ 200 ms** | percentil 75 dos usuários reais |
| **CLS** (Cumulative Layout Shift) | Estabilidade visual | **< 0,1** | percentil 75 dos usuários reais |

> **Observação importante:** o Google avalia todas as três métricas no **percentil 75** dos visitantes reais (dados de campo / CrUX). Não basta o site ser rápido no seu notebook — ele precisa ser rápido também para o usuário em rede mais lenta. As três métricas precisam estar simultaneamente em "Bom" para o URL receber status verde no Search Console.

---

## 2. Contexto do projeto

A viasegcorretora é uma **corretora de seguros**. Isso coloca o conteúdo do site na categoria **YMYL (Your Money or Your Life)** — temas que afetam diretamente a saúde financeira e a segurança das pessoas. Para conteúdo YMYL, o Google aplica um **escrutínio mais rigoroso de qualidade e confiabilidade** (E-E-A-T). Por isso, além das otimizações técnicas tradicionais, este documento inclui uma seção dedicada a sinais de confiança (seção 7) — algo que não pode ser ignorado em um projeto de seguros.

Em resumo, o trabalho se divide em três frentes:

- **Performance e experiência** (Core Web Vitals, imagens, lazy loading) — seções 3 e 4.
- **Legibilidade para o robô** (HTML semântico, metadados, dados estruturados, sitemap) — seções 5, 6 e 9.
- **Confiabilidade e relevância** (E-E-A-T, arquitetura de URLs e keywords) — seções 7 e 8.

---

## 3. Core Web Vitals

As Core Web Vitals são métricas do Google que medem a experiência real do usuário quanto a velocidade, tempo de resposta e estabilidade visual. São um sinal de ranqueamento confirmado e funcionam como critério de desempate entre páginas de qualidade e autoridade semelhantes.

### 3.1 LCP — Largest Contentful Paint (carregamento ≤ 2,5 s)

Mede o tempo até o **maior elemento visível** da tela ser renderizado (imagem hero, bloco de título principal).

**Ações no React/Sanity:**

- Pré-carregamento (`preload`) dos recursos críticos: fonte principal e imagem hero.
- A imagem hero deve usar `fetchpriority="high"` e **nunca** `loading="lazy"`.
- Otimização do tempo de resposta do servidor (TTFB) com cache e CDN — um TTFB alto inviabiliza o LCP, mesmo com a imagem otimizada.
- Servir a imagem hero já em formato moderno e dimensão adequada ao viewport (ver seção 4).

### 3.2 INP — Interaction to Next Paint (interatividade ≤ 200 ms)

Mede quão rápido a página responde a **cada** clique, toque ou tecla durante toda a sessão (substituiu o antigo FID em março de 2024, sendo bem mais rigoroso). É a métrica que mais sites falham, porque exige disciplina na arquitetura de JavaScript.

**Ações no React/Sanity:**

- **Code splitting** com `React.lazy` e `Suspense` para reduzir o bundle inicial.
- Quebrar tarefas longas na thread principal; adiar trabalho não crítico (`requestIdleCallback`, defer de scripts de terceiros).
- Revisar e remover plugins/widgets de terceiros não utilizados — cada script extra é risco de INP.
- Evitar re-renderizações desnecessárias (memoização criteriosa onde fizer sentido).

### 3.3 CLS — Cumulative Layout Shift (estabilidade visual < 0,1)

Mede o quanto o layout "pula" durante o carregamento. Um botão que se desloca no momento do clique é um problema clássico de CLS.

**Ações no React/Sanity:**

- Declarar **`width` e `height` explícitos** (ou `aspect-ratio` via CSS) em **todas** as imagens, vídeos e iframes — reservando o espaço antes do carregamento.
- Reservar espaço para conteúdo dinâmico (banners, blocos carregados de forma assíncrona).
- Usar `font-display: swap` com fallback de fonte de dimensões próximas para evitar deslocamento ao trocar a fonte.

---

## 4. Otimização de imagens

### 4.1 Formatos modernos (WebP / AVIF)

O Google recomenda servir imagens em formatos modernos, que reduzem drasticamente o peso sem perda perceptível de qualidade.

- **Ação:** configurar o **Sanity Image Builder** para retornar automaticamente WebP via `auto=format`, e dimensionar a imagem pelo parâmetro de largura conforme o ponto de uso.

### 4.2 Lazy loading (carregamento preguiçoso)

- **Ação:** aplicar o atributo nativo `loading="lazy"` em **todas** as `<img>` que estiverem **abaixo da dobra**.
- **Exceção:** imagens **acima da dobra** (hero, primeiros posts em destaque) **não** recebem lazy loading — elas devem carregar imediatamente, sendo a hero com `fetchpriority="high"`.

### 4.3 Prevenção de CLS via aspect-ratio

- **Ação:** toda `<img>` recebe classes/atributos que respeitem o `aspect-ratio`, reservando o espaço de layout antes de a imagem terminar de baixar.

---

## 5. HTML semântico

HTML semântico ajuda o robô a entender a hierarquia e o papel de cada bloco da página.

- **Ação:** revisar os componentes em `src/components` e `src/App.jsx` (ou páginas) garantindo:
  - Uso correto de `<header>`, `<main>`, `<nav>`, `<article>` e `<section>`.
  - **Uma única tag `<h1>` por página**, seguida de hierarquia coerente de `<h2>`/`<h3>`.
  - Links de navegação dentro de `<nav>` e conteúdo principal dentro de `<main>`.

---

## 6. Metadados, Open Graph e Schema.org

### 6.1 Meta tags dinâmicas

- **Ação:** usar **React Helmet (`react-helmet-async`)** para inserção dinâmica de `<title>` e `<meta name="description">` por rota/post.

### 6.2 Open Graph

- **Ação:** implementar as tags Open Graph para compartilhamento em redes sociais:
  - `og:title`, `og:description`, `og:image`, `og:type`, `og:url` e `og:site_name`.

### 6.3 Dados estruturados (JSON-LD)

- **Ação:** adicionar Schema.org em formato **JSON-LD** para:
  - **Organização e site** (global, em `App.jsx`).
  - **Artigos** do blog (em cada post).
  - **Negócio de seguros** — específico do segmento (ver abaixo).

**Schema da organização (seguros) — exemplo de referência:**

```json
{
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "name": "Viaseg Corretora",
  "url": "https://www.viasegcorretora.com.br",
  "logo": "https://www.viasegcorretora.com.br/logo.png",
  "description": "Corretora de seguros especializada em soluções de proteção para pessoas e empresas.",
  "areaServed": "BR",
  "sameAs": [
    "https://www.facebook.com/corretoraviaseg",
    "https://www.instagram.com/corretoraviaseg",
    "https://www.linkedin.com/company/corretoraviaseg",
    "https://x.com/corretoraviaseg",
    "https://www.reddit.com/user/ViaSeg/"
  ]
}
```

> **Nota:** ajuste `name`, `logo`, `areaServed` e os perfis em `sameAs` aos dados reais da corretora. Para presença local (atendimento em endereço físico), considere também o tipo `LocalBusiness`/`InsuranceAgency` com `address` e `telephone`.

**Schema de artigo do blog — exemplo de referência:**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Título do artigo",
  "image": "https://www.viasegcorretora.com.br/imagem-do-post.webp",
  "datePublished": "2026-01-01",
  "dateModified": "2026-01-10",
  "author": { "@type": "Person", "name": "Nome do autor" },
  "publisher": {
    "@type": "Organization",
    "name": "Viaseg Corretora",
    "logo": { "@type": "ImageObject", "url": "https://www.viasegcorretora.com.br/logo.png" }
  }
}
```

---

## 7. E-E-A-T para conteúdo YMYL

> *Esta seção vai além dos arquivos originais. Foi incluída porque seguros é um tema YMYL e, sem sinais de confiança, a otimização técnica sozinha rende menos. Pode ser tratada como frente de conteúdo, em paralelo à implementação técnica.*

E-E-A-T = **Experience, Expertise, Authoritativeness, Trustworthiness** (Experiência, Especialização, Autoridade e Confiabilidade). Para temas financeiros, o Google pondera fortemente esses sinais.

Boas práticas a aplicar no site:

- **Autoria identificada:** todo artigo com autor real, bio e, idealmente, registro/credencial (ex.: corretor habilitado SUSEP). Marcar o autor no Schema (`author`).
- **Página "Sobre" e "Contato" robustas:** endereço, CNPJ, telefone, canais de atendimento — reforçam a legitimidade da empresa.
- **Transparência regulatória:** menção a registros e órgãos competentes quando aplicável.
- **Conteúdo preciso e atualizado:** datas de publicação e atualização visíveis (`dateModified`).
- **Provas sociais e segurança:** depoimentos verificáveis, selos de segurança, HTTPS em todo o site.

---

## 8. Arquitetura de URLs e keywords

- **Ação:** estruturar as URLs no frontend consumindo **slugs amigáveis** vindos do Sanity CMS (ex.: `/blog/seguro-de-vida-vale-a-pena`).
- URLs curtas, descritivas, em minúsculas e com hifens — sem parâmetros desnecessários.
- Mapear a keyword principal de cada página para o slug, o `<title>`, o `<h1>` e a meta description, sem repetição forçada (evitar *keyword stuffing*).
- Manter consistência entre o slug do Sanity e a rota do React para evitar links quebrados e conteúdo duplicado.

---

## 9. Sitemap.xml e robots.txt

Arquivos técnicos servidos a partir da pasta pública (`public/`).

### 9.1 robots.txt

- **Ação:** criar `public/robots.txt` para orientar os rastreadores e apontar para o sitemap.

```txt
User-agent: *
Allow: /

Sitemap: https://www.viasegcorretora.com.br/sitemap.xml
```

### 9.2 sitemap.xml

- **Ação:** gerar `public/sitemap.xml` por meio de um **script Node local (pré-build)** que consome os dados do Sanity e produz as URLs da home e dos posts dinâmicos.
- O sitemap deve ser regenerado a cada build/publicação de novo conteúdo.

---

## 10. Plano de execução técnico

Guia prático das alterações arquiteturais e dos arquivos que serão modificados.

### 10.1 Dependências novas

| Biblioteca | Finalidade |
|---|---|
| **`react-helmet-async`** | Gerenciar de forma segura e assíncrona as tags `<head>` (title, description, Open Graph) em uma SPA. |
| **Gerador de Sitemap** (script Node local) | Consumir os dados do Sanity e gerar `sitemap.xml` na pasta `public/`. |

### 10.2 Ajustes arquiteturais

**`index.html` e `src/main.jsx`**
- Reestruturação das meta tags estáticas no HTML.
- Injeção do `<HelmetProvider>` na raiz da aplicação (`main.jsx`).

**`src/App.jsx`**
- Inserção de um `<Helmet>` global (title e description padrão).
- Verificação do uso correto de `<main>` e `<section>`.
- Inserção do Schema.org principal (Organization / InsuranceAgency + WebSite).

**Otimizações visuais e de performance (CLS & LCP) por componente**

| Componente | Ação |
|---|---|
| `src/components/HeroParallax.jsx` | Imagem principal com `fetchpriority="high"` e **sem** lazy loading (acima da dobra). |
| `src/components/FeaturedPosts.jsx` | Marcação semântica correta; imagens com prioridade de carregamento mais alta (acima da dobra). |
| `src/components/PostCarousel.jsx` | Capas dos posts com carregamento assíncrono atrasado (`loading="lazy"`). |
| `src/components/AboutAuthor.jsx` | Imagem com `loading="lazy"` e dimensões declaradas (reforça E-E-A-T, ver seção 7). |

> Todos os componentes acima devem ter `width`/`height` ou `aspect-ratio` declarados para proteger o CLS.

### 10.3 SEO técnico (arquivos na raiz pública)

- **`public/robots.txt`** — criado para guiar rastreadores e apontar para o sitemap.
- **`public/sitemap.xml`** — atualizado via script pré-build com links da home e dos posts dinâmicos.

---

## 11. Checklist de validação e ferramentas

Após cada frente de implementação, validar com:

- [ ] **PageSpeed Insights** / **Lighthouse** — LCP, INP e CLS em laboratório e campo.
- [ ] **Google Search Console** — relatório de Core Web Vitals (dados de campo, p75), cobertura de indexação e envio do sitemap.
- [ ] **Teste de Resultados Aprimorados (Rich Results Test)** — validar o JSON-LD de organização e de artigos.
- [ ] **Validador de Schema.org** — checar sintaxe dos dados estruturados.
- [ ] **Inspeção de URL** no Search Console — confirmar renderização e indexação de páginas dinâmicas.
- [ ] **Verificação manual** — uma `<h1>` por página, imagens com dimensões, alt text presente, HTTPS ativo.

> **Boa prática operacional:** configurar alertas preventivos quando as métricas se aproximarem dos limites (ex.: INP > 160 ms, LCP > 2,0 s, CLS > 0,08) — assim os problemas são detectados antes de afetarem o ranqueamento.

---

## 12. Priorização e roadmap

Sugestão de ordem de execução, do maior impacto/menor esforço ao complementar:

| Prioridade | Frente | Seções |
|---|---|---|
| **1 — Fundação** | Metadados dinâmicos (Helmet), HTML semântico, robots.txt + sitemap | 5, 6, 9, 10 |
| **2 — Performance** | Imagens (WebP, lazy loading, aspect-ratio) + LCP/CLS por componente | 3, 4, 10.2 |
| **3 — Responsividade** | INP (code splitting, redução de JS e scripts de terceiros) | 3.2 |
| **4 — Dados estruturados** | Schema.org (Organization/InsuranceAgency + Article) | 6.3 |
| **5 — Confiança (contínuo)** | E-E-A-T: autoria, páginas institucionais, transparência | 7 |

---

*Documento de referência para a equipe de desenvolvimento durante a implantação do SEO técnico da viasegcorretora. Limites de Core Web Vitals conforme documentação oficial do Google (web.dev / Search Central), válidos em 2026.*

# Referências de Design — ViaSeg Corretora

Este é o resumo rápido com as características de design do site para uso como referência direta.

---

## 🎨 Cores Principais (Códigos Hexadecimais)

*   **Cor Primária:** `#FF6B00` (Laranja Vibrante)
    *   *Onde é usada:* Botões principais de ação (CTAs), destaques de textos importantes, ícones e badges de destaque.
*   **Cor Secundária (Fundo Claro / Blocos de Apoio):** `#f1f5f9` (Cinza Claro Azulado)
    *   *Onde é usada:* Fundos de seções de diferenciais, botões secundários e áreas de contraste leve.
*   **Cor de Apoio Escura (Texto e Elementos de Destaque):** `#1A1A2E` (Azul Marinho Muito Escuro)
    *   *Onde é usada:* Textos gerais, títulos no tema claro, cabeçalho e cor de fundo da seção de estatísticas (Trust). Evita o uso do preto puro para dar um visual mais premium.
*   **Cor de Fundo Principal:** `#fdfdfd` (Branco Suave)
    *   *Onde é usada:* Fundo principal do site para garantir uma leitura limpa.

---

## ✍️ Tipologia (Fontes)

*   **Fonte para Títulos:** **Montserrat** (`--font-montserrat`)
    *   *Estilo:* Geométrica, moderna, com excelente peso visual para títulos e seções principais.
*   **Fonte para Textos e Corpo:** **Inter** (`--font-inter`)
    *   *Estilo:* Limpa, neutra e de altíssima legibilidade em qualquer tamanho de tela.

---

## 📏 Tamanho das Fontes (Typography Scale)

*   **Título Hero (H1):** `text-4xl md:text-5xl lg:text-6xl` (aprox. **36px a 60px**) — Peso: Negrito (`font-bold`).
*   **Títulos de Seção (H2):** `text-3xl md:text-4xl` (aprox. **30px a 36px**) — Peso: Negrito (`font-bold`).
*   **Títulos de Cartões (H3):** `text-2xl` a `text-3xl` (aprox. **24px a 30px**) — Peso: Negrito / Seminegrito (`font-bold`/`font-semibold`).
*   **Subtítulos / Parágrafos Auxiliares:** `text-lg` a `text-xl` (aprox. **18px a 20px**) — Peso: Normal (`font-normal`).
*   **Texto de Corpo Geral:** `text-base` (**16px**) — Peso: Normal (`font-normal`).
*   **Textos Menores / Legendas:** `text-sm` (**14px**) — Peso: Normal (`font-normal`).

---

## ✨ Estilo de Design (Características Visuais)

*   **Arredondamento:** Bordas bastante arredondadas. Botões e inputs usam `rounded-xl` (12px) ou `rounded-lg` (8px). Cartões e imagens usam `rounded-2xl` (16px) a `rounded-3xl` (24px).
*   **Sombras:** Efeito de profundidade com sombras suaves nos cartões (`shadow-sm` / `shadow-xl`) e efeito de elevação no hover.
*   **Efeito CTA Glow:** O botão de cotação principal usa sombra com brilho laranja para atrair cliques: `shadow-[0_4px_14px_0_rgba(255,107,0,0.39)]`.

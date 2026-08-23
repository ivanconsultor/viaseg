# Product Requirements Document (PRD) — ViaSeg Corretora

> Documento de produto: **o que** o site precisa entregar.
> Como foi construído está no [SPEC.md](SPEC.md). Regras de design e cores estão no [AGENTS.md](AGENTS.md).

## 1. Visão geral

Site institucional da ViaSeg Corretora de Seguros, focado em captura de leads
(Auto, Vida, Empresarial, Residencial) e otimizado para busca orgânica no Google.

Publicado como site estático em hospedagem compartilhada Hostinger.

## 2. Objetivos

- Converter visitantes em leads de cotação.
- Demonstrar autoridade e confiança (E-E-A-T), exigência do Google para conteúdo
  YMYL — assuntos que afetam dinheiro e saúde, caso de seguros.
- Alta performance no Google PageSpeed Insights (Core Web Vitals).

## 3. Escopo funcional

| Página | Rota | Conteúdo |
|---|---|---|
| Início | `/` | Hero, diferenciais, faixa de seguradoras, tipos de seguro, CTA |
| Seguro Auto | `/seguros/auto` | Coberturas e cotação |
| Seguro Vida | `/seguros/vida` | Coberturas e cotação |
| Seguro Residencial | `/seguros/residencial` | Coberturas e cotação |
| Seguro Empresarial | `/seguros/empresarial` | Coberturas e cotação |
| Parceiros | `/parceiros` | Rede de seguradoras credenciadas |
| Sobre | `/sobre` | História da corretora e provas sociais |
| Cotação | `/cotacao` | Formulário de solicitação |
| Fale Conosco | `/fale-conosco` | Formulário, WhatsApp, e-mail e endereço |
| Privacidade | `/privacidade` | LGPD |
| Termos | `/termos` | LGPD |
| Cookies | `/cookies` | LGPD |

Pop-up de consentimento de cookies aparece globalmente em todas as páginas.

## 4. Identidade visual

O site opera em **modo claro obrigatório**. Fundo `#fdfdfd`, texto `#1A1A2E`,
laranja institucional `#FF6B00`.

É proibido usar tema escuro. Essa regra existe porque o uso de variantes `dark:`
do Tailwind já causou um bug em produção: o pop-up de cookies ficava com fundo
preto e texto escuro, ilegível para quem usa o Windows em tema escuro.

As regras completas estão no [AGENTS.md](AGENTS.md).

## 5. Contato

- Endereço: Rua Dr Othon Machado, 150 — Sala 406, Inhaúma, RJ
- Telefone/WhatsApp: (21) 97684-4444
- E-mail: contato@viasegcorretora.com.br
- Domínio: https://www.viasegcorretora.com.br

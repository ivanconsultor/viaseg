# Product Requirements Document (PRD) — ViaSeg Corretora

> Documento de produto: **o que** o site precisa entregar.
> Como foi construído: [SPEC.md](SPEC.md) · Mapa geral: [ARQUITETURA.md](ARQUITETURA.md)
> Regras de design e publicação: [AGENTS.md](AGENTS.md)
>
> Última revisão: 22/08/2026.

## 1. Visão geral

Site institucional da ViaSeg Corretora de Seguros, corretor pessoa física
registrado na SUSEP sob o nº **201096702**, atuando desde **2005**.

O objetivo é gerar contato qualificado e encaminhar cotações para as
seguradoras parceiras. Publicado como site estático em hospedagem
compartilhada Hostinger, em **www.viasegcorretora.com.br**.

## 2. Objetivos

- Converter visitantes em contato ou cotação.
- Demonstrar autoridade e confiança (E-E-A-T), exigência do Google para
  conteúdo YMYL — assuntos que afetam dinheiro e saúde, caso de seguros.
- Alta performance no PageSpeed Insights (Core Web Vitals).
- Medir o resultado das campanhas de Google Ads e Meta Ads sem violar a LGPD.

## 3. Escopo funcional

| Página | Rota | Conteúdo |
|---|---|---|
| Início | `/` | Hero, diferenciais, faixa de seguradoras, tipos de seguro, CTA |
| Cotação | `/cotacao` | Encaminhamento para os ambientes das seguradoras |
| Seguro Auto | `/seguros/auto` | Coberturas e cotação |
| Seguro Vida | `/seguros/vida` | Coberturas e cotação |
| Seguro Residencial | `/seguros/residencial` | Coberturas e cotação |
| Seguro Empresarial | `/seguros/empresarial` | Coberturas e cotação |
| Parceiros | `/parceiros` | Rede de seguradoras credenciadas |
| Sobre | `/sobre` | História da corretora e provas sociais |
| Fale Conosco | `/fale-conosco` | Formulário, WhatsApp, e-mail e endereço |
| Privacidade | `/privacidade` | LGPD |
| Termos | `/termos` | LGPD |
| Cookies | `/cookies` | LGPD + botão para rever o consentimento |

Aviso de consentimento de cookies aparece globalmente em todas as páginas.

## 4. O que o site NÃO faz

Registrado de propósito, porque as políticas antigas afirmavam o contrário:

- **não calcula preço nem simula seguro.** Ao clicar em cotar, o visitante vai
  para o ambiente da seguradora, onde a cotação é feita por ela;
- **não coleta** CPF, data de nascimento, estado civil, dados de veículo,
  dados de imóvel nem informação de saúde;
- **não tem** banco de dados, área logada nem CMS.

O único formulário do site é o de contato, com quatro campos.

## 5. Captação de contato

**Formulário de contato** (`/fale-conosco`): nome, e-mail, WhatsApp e mensagem.
Chega em `contato@viasegcorretora.com.br` pelo servidor da Hostinger.

**WhatsApp direto**: (21) 97684-4444, clicável em todo o site.

**Links de cotação**: 8 destinos na Porto Seguro (auto, residencial, vida,
viagem, celular, equipamentos portáteis, cartão de crédito e Porto Resolve),
todos carregando o código de corretor para preservar a comissão.

## 6. Identidade visual

O site opera em **modo claro obrigatório**. Fundo `#fdfdfd`, texto `#1A1A2E`,
laranja institucional `#FF6B00`.

É proibido usar tema escuro. Essa regra existe porque o uso de variantes `dark:`
do Tailwind já causou um bug em produção: o aviso de cookies ficava com fundo
preto e texto escuro, ilegível para quem usa o sistema em tema escuro.

Regras completas em [AGENTS.md](AGENTS.md).

## 7. Requisitos de privacidade

- Nenhuma ferramenta de medição pode disparar antes do aceite do visitante.
- Recusar deve ser tão fácil quanto aceitar, e a escolha deve poder ser
  revista a qualquer momento.
- As políticas devem descrever **o tratamento real**, nunca um hipotético.
- O registro SUSEP deve estar visível.

## 8. Medição

Configurado, gerenciado pelo contêiner do Google Tag Manager:

| Ferramenta | Para quê |
|---|---|
| Google Analytics 4 | audiência e comportamento |
| Google Ads | conversões e público |
| Meta Pixel | conversões e público no Facebook e Instagram |
| Stape (server-side) | medição pelo servidor, em domínio próprio |
| Search Console | indexação e desempenho na busca |

Identificadores em [ARQUITETURA.md](ARQUITETURA.md#7-rastreamento).

## 9. Contato e identificação

- Corretor: ViaSeg Corretora de Seguros — SUSEP 201096702, desde 2005
- Endereço: Rua Dr Othon Machado, 150 — Sala 406, Inhaúma, Rio de Janeiro/RJ
- Telefone/WhatsApp: (21) 97684-4444
- E-mail: contato@viasegcorretora.com.br
- Site: https://www.viasegcorretora.com.br

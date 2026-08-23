# Diretrizes de Desenvolvimento e Governança - ViaSeg Corretora Premium

Este documento estabelece as regras de design, arquitetura e processos de publicação exclusivos do projeto **ViaSeg Corretora (viaseg-premium)**.

---

## 🎨 1. Sistema de Design e Identidade Visual

### Paleta de Cores Obrigatória:
- **Fundo Principal (Background):** `#fdfdfd` (Branco limpo / Off-white).
- **Texto Principal (Foreground):** `#1A1A2E` (Azul-marinho escuro profundo de alta legibilidade).
- **Cor Primária (Destaque/Ações):** `#FF6B00` (Laranja vibrante institucional da ViaSeg).
- **Cor Primária Hover:** `#e05e00` (Laranja escuro para estados hover).
- **Cartões & Seções:** `#ffffff` (Branco puro) com bordas `border-slate-200` e sombras suaves `shadow-sm`.
- **Seção Noturna (Rodapé/CTA):** `#1A1A2E` com texto em `#ffffff` e contraste controlado.

### Regra Estrita de Tema (Strict Light Mode):
- É **proibido** utilizar classes utilitárias `dark:` do Tailwind que alterem fundos para preto (`#0b0c10`) mantendo o texto em tom escuro (`#1A1A2E`). 
- Toda a interface deve manter leitura nítida, amigável e contraste impecável (Web Content Accessibility Guidelines - WCAG AAA) em qualquer dispositivo ou configuração de sistema operacional.

---

## 🏢 2. Componentes e Parceiros

### Seção de Seguradoras Parceiras (`ParceirosSection.tsx`):
- Deve obrigatoriamente exibir o grid/carrossel com as maiores seguradoras parceiras do mercado brasileiro:
  - Porto Seguro, Bradesco Seguros, SulAmérica, Allianz, Tokio Marine, Mapfre, HDI Seguros, Liberty Seguros, Azul Seguros, Suhai, Zurich e Sompo Seguros.
- Este componente deve ser mantido sincronizado na **Home (`/`)** e na página **Parceiros (`/parceiros`)**.

---

## ⚙️ 3. Processo de Build e Deploy (Hostinger Apache)

1. **Configuração Next.js (`next.config.ts`):**
   - Configurado para exportação estática (`output: 'export'`, `images: { unoptimized: true }`).

2. **Arquivos Obrigatórios na pasta `public/`:**
   - **`.htaccess`**: Contém as regras de SSL (HTTPS), reescrita de URLs amigáveis sem `.html` e página de erro 404 personalizada.
   - **`send.php` / `enviar.php`**: Script PHP nativo para processar o formulário de contato via infraestrutura de e-mail da Hostinger.

3. **Comando de Build (Windows PowerShell / CMD):**
   ```cmd
   cmd /c npm run build
   ```

4. **Geramento do Pacote ZIP (`site-viaseg.zip`):**
   - O arquivo ZIP de entrega deve incluir os conteúdos internos da pasta `out/` (garantindo `.htaccess` e `send.php` na raiz do pacote ZIP).
   - O arquivo final é atualizado diretamente na Área de Trabalho (`C:\Users\ivanc\Desktop\site-viaseg.zip`).

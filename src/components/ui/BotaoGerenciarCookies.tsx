"use client";

/** Reabre o banner de consentimento para o visitante trocar de ideia. */
export default function BotaoGerenciarCookies() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("viaseg:gerenciar-cookies"))}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF6B00] text-white font-semibold text-sm hover:bg-[#e05e00] transition-colors"
    >
      Gerenciar minhas preferências de cookies
    </button>
  );
}

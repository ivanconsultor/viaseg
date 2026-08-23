"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("viaseg_cookie_consent");
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!consent) {
      timer = setTimeout(() => setShow(true), 1500);
    }

    // Permite reabrir o banner de qualquer lugar do site (ex.: link "Gerenciar
    // cookies"). A LGPD exige que revogar o consentimento seja tao facil quanto
    // concede-lo - sem isto, quem escolhia uma vez ficava preso a escolha.
    const reabrir = () => setShow(true);
    window.addEventListener("viaseg:gerenciar-cookies", reabrir);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("viaseg:gerenciar-cookies", reabrir);
    };
  }, []);

  /**
   * Avisa o Consent Mode do Google sobre a decisao do visitante.
   * Enquanto GTM/GA4/Ads/Pixel nao estiverem instalados isto nao faz nada
   * visivel, mas garante que no dia da ativacao nenhuma tag dispare antes
   * do consentimento.
   */
  const aplicarConsentimento = (aceitou: boolean) => {
    const valor = aceitou ? "granted" : "denied";
    const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    if (typeof g === "function") {
      g("consent", "update", {
        ad_storage: valor,
        ad_user_data: valor,
        ad_personalization: valor,
        analytics_storage: valor,
      });
    }
    const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
    if (Array.isArray(dl)) {
      dl.push({ event: aceitou ? "consentimento_aceito" : "consentimento_recusado" });
    }
  };

  const acceptCookies = () => {
    localStorage.setItem("viaseg_cookie_consent", "accepted");
    aplicarConsentimento(true);
    setShow(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("viaseg_cookie_consent", "rejected");
    aplicarConsentimento(false);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
        >
          <div className="container mx-auto max-w-5xl pointer-events-auto">
            <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-5 md:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
              <div className="flex items-start gap-4 z-10">
                <div className="bg-[#FF6B00]/10 p-3 rounded-full text-[#FF6B00] shrink-0 mt-1 hidden sm:block">
                  <Cookie size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2 text-[#1A1A2E] flex items-center gap-2">
                    <Cookie size={20} className="text-[#FF6B00] sm:hidden" />
                    Nós valorizamos sua privacidade
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-3xl font-normal">
                    Utilizamos cookies para melhorar sua experiência de navegação, personalizar conteúdos e anúncios, além de analisar nosso tráfego. Ao clicar em &ldquo;Aceitar todos&rdquo;, você concorda com o armazenamento de cookies em seu dispositivo. Leia nossa{" "}
                    <Link href="/cookies" className="text-[#FF6B00] hover:underline font-semibold">
                      Política de Cookies
                    </Link>{" "}
                    e{" "}
                    <Link href="/privacidade" className="text-[#FF6B00] hover:underline font-semibold">
                      Política de Privacidade
                    </Link>{" "}
                    para saber mais.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto z-10">
                <button
                  onClick={rejectCookies}
                  className="px-6 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-semibold text-sm w-full sm:w-auto text-center"
                >
                  Recusar
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-6 py-2.5 rounded-full bg-[#FF6B00] text-white hover:bg-[#e05e00] transition-colors font-bold shadow-md text-sm w-full sm:w-auto text-center"
                >
                  Aceitar todos
                </button>
              </div>

              <button 
                onClick={rejectCookies}
                className="absolute top-4 right-4 text-slate-400 hover:text-[#1A1A2E] transition-colors p-1"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

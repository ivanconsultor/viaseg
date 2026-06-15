"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já respondeu ao consentimento
    const consent = localStorage.getItem("viaseg_cookie_consent");
    if (!consent) {
      // Pequeno delay para a animação ficar suave após o carregamento da página
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("viaseg_cookie_consent", "accepted");
    setShow(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("viaseg_cookie_consent", "rejected");
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
            <div className="bg-white dark:bg-[#0b0c10] border border-gray-200 dark:border-gray-800 shadow-2xl rounded-2xl p-5 md:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
              {/* Elemento decorativo */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

              <div className="flex items-start gap-4 z-10">
                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0 mt-1 hidden sm:block">
                  <Cookie size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2 flex items-center gap-2">
                    <Cookie size={20} className="text-primary sm:hidden" />
                    Nós valorizamos sua privacidade
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed max-w-3xl">
                    Utilizamos cookies para melhorar sua experiência de navegação, personalizar conteúdos e anúncios, além de analisar nosso tráfego. Ao clicar em "Aceitar todos", você concorda com o armazenamento de cookies em seu dispositivo. Leia nossa{" "}
                    <Link href="/cookies" className="text-primary hover:underline font-medium">
                      Política de Cookies
                    </Link>{" "}
                    e{" "}
                    <Link href="/privacidade" className="text-primary hover:underline font-medium">
                      Política de Privacidade
                    </Link>{" "}
                    para saber mais.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto z-10">
                <button
                  onClick={rejectCookies}
                  className="px-6 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 text-foreground/80 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm w-full sm:w-auto text-center"
                >
                  Recusar
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-6 py-2.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors font-medium shadow-lg shadow-primary/20 text-sm w-full sm:w-auto text-center"
                >
                  Aceitar todos
                </button>
              </div>

              {/* Botão de fechar (x) */}
              <button 
                onClick={rejectCookies}
                className="absolute top-4 right-4 text-gray-400 hover:text-foreground transition-colors p-1"
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

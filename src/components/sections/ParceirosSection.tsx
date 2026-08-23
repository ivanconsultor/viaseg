"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

/**
 * Versao dos arquivos de logo.
 * Os arquivos foram reexportados com fundo transparente mantendo o mesmo nome,
 * entao navegadores que ja visitaram o site continuariam mostrando a versao
 * antiga (com o quadrado branco) guardada em cache. Este sufixo forca o
 * download da versao nova. Se as logos forem trocadas de novo, incremente.
 */
const VERSAO_LOGOS = "?v=2";

export const seguradorasLogos = [
  { name: "Porto Seguro", src: "/images/logo-seguradoras/porto-seguro.webp" },
  { name: "Allianz Seguros", src: "/images/logo-seguradoras/allianz.webp" },
  { name: "Azul Seguros", src: "/images/logo-seguradoras/azul.webp" },
  { name: "HDI Seguros", src: "/images/logo-seguradoras/hdi.webp" },
  { name: "Tokio Marine", src: "/images/logo-seguradoras/tokio-marine.webp" },
  { name: "Suhai Seguradora", src: "/images/logo-seguradoras/suhai.webp" },
  { name: "Icatu Seguros", src: "/images/logo-seguradoras/icatu-seguradora.webp" },
  { name: "Itaú Seguros", src: "/images/logo-seguradoras/itau.webp" },
  { name: "MAG Seguros", src: "/images/logo-seguradoras/mag.webp" },
];

// Desvanece as pontas da esteira sem overlay colorido, para nao criar linha nem quadro.
const pontasSuaves = {
  WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
  maskImage: "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
};

// Vidro fosco que nasce e morre no fundo da pagina: sem borda, sem corte visivel.
const vidroSemBorda = {
  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)",
};

export default function ParceirosSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  } as const;

  const doubleLogos = [...seguradorasLogos, ...seguradorasLogos, ...seguradorasLogos];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Camada de vidro (glassmorphism) */}
      <div
        className="pointer-events-none absolute inset-0 backdrop-blur-md bg-gradient-to-b from-white/0 via-white/55 to-white/0"
        style={vidroSemBorda}
      />
      {/* Brilho suave por tras, dando profundidade ao vidro */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_50%,rgba(255,107,0,0.05),transparent_70%)]" />

      <div className="container relative mx-auto px-4 md:px-6 mb-7 text-center">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] font-semibold text-xs mb-2 border border-[#FF6B00]/20"
        >
          <Building2 size={14} />
          <span>Rede Credenciada Nacional</span>
        </motion.div>
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="font-heading text-xl md:text-2xl font-bold text-[#1A1A2E]"
        >
          Cote com as <span className="text-[#FF6B00]">Maiores Seguradoras</span> do Brasil
        </motion.h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 overflow-hidden py-2" style={pontasSuaves}>
        <motion.div
          className="flex items-center gap-16 md:gap-24 w-max"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {doubleLogos.map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center h-16 w-40 md:h-20 md:w-48 shrink-0">
              <img
                src={logo.src + VERSAO_LOGOS}
                alt={`Logomarca ${logo.name}`}
                decoding="async"
                className="max-h-14 md:max-h-[68px] max-w-[160px] md:max-w-[190px] object-contain [filter:contrast(1.08)_saturate(1.12)] transition-transform duration-300 hover:scale-110 drop-shadow-[0_1px_3px_rgba(26,26,46,0.14)]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

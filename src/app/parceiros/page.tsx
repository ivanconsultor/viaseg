"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ParceirosSection from "@/components/sections/ParceirosSection";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building, CheckCircle2, ShieldCheck } from "lucide-react";

export default function Parceiros() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  return (
    <main className="min-h-screen bg-slate-50 text-[#1A1A2E] flex flex-col">
      <Header />

      {/* Hero Section Parceiros com Foto do Casal Cristalina */}
      <section className="relative flex items-center pt-32 pb-20 md:pt-40 md:pb-28 bg-white overflow-hidden border-b border-slate-100 min-h-[min(70vw,880px)]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/casal-feliz.webp" 
            alt="Família feliz protegida pelos seguros da ViaSeg"
            className="w-full h-full object-cover object-[60%_20%] md:object-[35%_22%]"
          />
          {/* Veu branco do lado esquerdo: da contraste ao texto sem apagar a foto */}
          <div className="absolute inset-0 w-full md:w-6/12 bg-gradient-to-r from-white via-white/90 to-transparent md:from-white/95 md:via-white/70"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-xl md:max-w-2xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] font-semibold text-sm mb-6 border border-[#FF6B00]/20 shadow-sm">
                <Building size={16} />
                <span>As Melhores Seguradoras</span>
              </div>
            </motion.div>

            <motion.h1 
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#1A1A2E]"
              initial="hidden" animate="visible" variants={fadeUp}
            >
              Nossos <span className="text-[#FF6B00]">Parceiros</span> de Confiança
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-slate-700 mb-10 leading-relaxed font-normal"
              initial="hidden" animate="visible" variants={fadeUp}
            >
              Trabalhamos lado a lado com as maiores e mais respeitadas seguradoras do mercado para garantir que você tenha as melhores coberturas e o suporte necessário em qualquer situação.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial="hidden" animate="visible" variants={fadeUp}
            >
              <Link 
                href="/cotacao" 
                className="bg-[#FF6B00] hover:bg-[#e05e00] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,0,0.23)] hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
              >
                Fazer Cotação Agora
                <ArrowRight size={20} />
              </Link>
              <Link 
                href="/fale-conosco" 
                className="bg-white hover:bg-slate-50 text-[#1A1A2E] border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg transition-all text-center shadow-sm"
              >
                Falar com Consultor
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Faixa de Seguradoras Parceiras sem Molduras/Bordas */}
      <ParceirosSection />

      {/* O que significa ser nosso parceiro */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] group border border-slate-200"
            >
              <img 
                src="/images/familia-na-sala.webp" 
                alt="Família na sala" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6">Rede Nacional de Proteção</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Selecionamos nossos parceiros rigorosamente para garantir excelência em todos os serviços. Com a ViaSeg, você não apenas compra um seguro; você adquire a solidez de uma rede estruturada para agir rápido quando você mais precisar.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Ampla rede referenciada (oficinas, médicos, prestadores).",
                  "Atendimento 24 horas em todo território nacional.",
                  "Assistência ágil e resolutiva.",
                  "Garantia de solidez e reputação inquestionável."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={24} className="text-[#FF6B00] shrink-0" />
                    <span className="text-slate-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compromisso e Confiança */}
      <section className="py-24 bg-slate-100/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="order-2 md:order-1">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6">A força da nossa parceria a seu favor</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Ao escolher a ViaSeg, você se beneficia do nosso volume e relacionamento direto com os executivos das seguradoras parceiras. Nós conseguimos negociar condições exclusivas, preços mais justos e maior agilidade nas resoluções de sinistros do que você conseguiria sozinho.
              </p>
              <Link 
                href="/cotacao" 
                className="inline-flex items-center justify-center bg-[#FF6B00] hover:bg-[#e05e00] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 gap-2"
              >
                Faça uma Cotação Agora
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] group order-1 md:order-2 border border-slate-200"
            >
              <img 
                src="/images/familia-na-mesa.webp" 
                alt="Família na mesa" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1A1A2E] text-white relative">
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <ShieldCheck size={48} className="text-[#FF6B00] mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-white">Cote com as maiores seguradoras</h2>
            <p className="text-slate-300 text-lg mb-10 leading-relaxed">
              Encontre o plano perfeito que combina com o seu perfil e o seu bolso em poucos minutos.
            </p>
            <Link 
              href="/fale-conosco" 
              className="inline-block bg-white text-[#1A1A2E] px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors shadow-md"
            >
              Falar com nossos consultores
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

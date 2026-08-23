"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Users, Award, HeartHandshake, ArrowRight } from "lucide-react";

export default function Sobre() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  return (
    <main className="min-h-screen bg-slate-50 text-[#1A1A2E] flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-white border-b border-slate-100 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] font-semibold text-sm mb-6 border border-[#FF6B00]/20 shadow-sm">
              <ShieldCheck size={18} />
              <span>Conheça a ViaSeg</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-[#1A1A2E] mb-6">Sobre a ViaSeg Corretora</h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
              Há anos protegendo o que é mais valioso para nossos clientes com ética, transparência e soluções sob medida.
            </p>
          </motion.div>
        </div>
      </section>

      {/* História e Valores */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-14 h-14 bg-[#FF6B00]/10 text-[#FF6B00] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users size={28} />
              </div>
              <h3 className="font-bold text-xl text-[#1A1A2E] mb-3">Missão</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Oferecer a melhor experiência em consultoria de seguros, garantindo a proteção patrimonial e familiar dos nossos clientes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-14 h-14 bg-[#FF6B00]/10 text-[#FF6B00] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award size={28} />
              </div>
              <h3 className="font-bold text-xl text-[#1A1A2E] mb-3">Visão</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ser referência nacional em atendimento ao cliente e inovação no mercado de corretagem de seguros.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-14 h-14 bg-[#FF6B00]/10 text-[#FF6B00] rounded-xl flex items-center justify-center mx-auto mb-6">
                <HeartHandshake size={28} />
              </div>
              <h3 className="font-bold text-xl text-[#1A1A2E] mb-3">Valores</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Transparência total, respeito ao cliente, agilidade nas resoluções e busca constante por excelência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A1A2E] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-white">Pronto para conversar com a gente?</h2>
          <p className="text-slate-300 text-lg mb-8 font-normal">
            Nossos especialistas estão à disposição para tirar dúvidas e indicar a melhor solução para o seu perfil.
          </p>
          <Link
            href="/fale-conosco"
            className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
          >
            Falar Conosco
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

export default function SeguroVida() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  return (
    <main className="min-h-screen bg-slate-50 text-[#1A1A2E] flex flex-col">
      <Header />

      {/* Hero Emotivo */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/seguro-vida.webp" 
            alt="Família unida e protegida" 
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl pt-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-black/30 p-6 md:p-8 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl max-w-3xl mx-auto">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#FF6B00] text-white font-bold tracking-wider uppercase text-sm mb-6 shadow-md">Seguro de Vida</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-md">
              O seu amor transformado em proteção financeira.
            </h1>
            <p className="text-xl text-white/95 mb-2 leading-relaxed font-medium drop-shadow-md">
              Cuidar de quem amamos é um compromisso para a vida toda. O Seguro de Vida garante que o futuro da sua família estará amparado em qualquer circunstância.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Conteúdo e Benefícios */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading text-3xl font-bold mb-6 text-[#1A1A2E]">Tranquilidade para você e para quem você ama.</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                O Seguro de Vida não é apenas para imprevistos fatais; ele é um apoio financeiro crucial também em vida, cobrindo diagnósticos de doenças graves e invalidez por acidente.
              </p>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Garanta a continuidade dos estudos dos seus filhos, o pagamento de despesas e a manutenção da qualidade de vida daqueles que dependem de você.
              </p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <div className="bg-[#FF6B00]/10 p-1.5 rounded-full mt-1 text-[#FF6B00]"><ShieldCheck size={18} /></div>
                  <span className="text-slate-800 font-medium">Cobertura para doenças graves e diagnósticos inesperados.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-[#FF6B00]/10 p-1.5 rounded-full mt-1 text-[#FF6B00]"><Heart size={18} /></div>
                  <span className="text-slate-800 font-medium">Indenização isenta de Imposto de Renda e fora de inventário.</span>
                </li>
              </ul>
              
              <Link href="/cotacao" className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,0,0.23)] hover:-translate-y-1">
                Quero proteger minha família agora <ArrowRight size={20} />
              </Link>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Família feliz reunida" className="rounded-2xl shadow-xl relative z-10 border border-slate-100" />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

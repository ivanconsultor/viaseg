"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

export default function SeguroResidencial() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Emotivo */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/seguro-residencial.webp" 
            alt="Casa bonita e segura" 
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl pt-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-black/10 p-6 md:p-8 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl max-w-3xl mx-auto">
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary text-white font-bold tracking-wider uppercase text-sm mb-6 shadow-md">Seguro Residencial</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-md">
              O seu porto seguro blindado contra o mundo.
            </h1>
            <p className="text-xl text-white mb-2 leading-relaxed font-medium drop-shadow-md">
              Nossa casa é o lugar onde guardamos nossas melhores memórias e as pessoas mais importantes. Proteger o seu lar é proteger o coração da sua família.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Conteúdo e Benefícios */}
      <section className="py-24 bg-white dark:bg-[#0b0c10]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading text-3xl font-bold mb-6">Tranquilidade do lado de dentro da porta.</h2>
              <p className="text-foreground/70 text-lg mb-6 leading-relaxed">
                Imagine dormir todos os dias com a certeza de que, se o telhado quebrar, a fiação fechar curto ou até mesmo se uma janela quebrar de madrugada, alguém estará lá para resolver.
              </p>
              <p className="text-foreground/70 text-lg mb-8 leading-relaxed">
                Com coberturas contra incêndio, roubo, danos elétricos e assistência 24h para emergências como encanador e chaveiro, a sua casa volta ao normal rapidamente.
              </p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-full mt-1 text-primary"><ShieldCheck size={18} /></div>
                  <span className="text-foreground/80 font-medium">Assistência residencial com eletricista e encanador.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-full mt-1 text-primary"><Heart size={18} /></div>
                  <span className="text-foreground/80 font-medium">Cobertura total contra incidentes graves e desastres.</span>
                </li>
              </ul>
              
              <Link href="/cotacao" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,0,0.23)] hover:-translate-y-1">
                Quero blindar minha casa agora <ArrowRight size={20} />
              </Link>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Interior de casa confortável" className="rounded-2xl shadow-2xl relative z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

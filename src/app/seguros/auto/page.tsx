"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SeguroAuto() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Emotivo */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Família viajando de carro felizes" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl pt-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-black/20 p-8 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary text-white font-bold tracking-wider uppercase text-sm mb-6 shadow-md">Seguro Auto</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-md">
              A liberdade de ir e vir com quem você mais ama.
            </h1>
            <p className="text-xl text-white mb-2 leading-relaxed font-medium drop-shadow-md">
              Não é sobre proteger um pedaço de metal. É sobre garantir que cada viagem de férias, cada ida à escola e cada retorno para casa terminem sempre com um sorriso e em total segurança.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Conteúdo e Benefícios */}
      <section className="py-24 bg-white dark:bg-[#0b0c10]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading text-3xl font-bold mb-6">Tranquilidade no trânsito e na vida.</h2>
              <p className="text-foreground/70 text-lg mb-6 leading-relaxed">
                Imagine estar na estrada durante uma tempestade e saber que, aconteça o que acontecer, você tem um time inteiro pronto para resgatar, consertar e amparar sua família. 
              </p>
              <p className="text-foreground/70 text-lg mb-8 leading-relaxed">
                Nosso Seguro Auto não tem letras miúdas. Ele cobre colisões, roubos, desastres naturais e oferece guincho 24 horas, porque imprevistos não têm hora para acontecer, mas o nosso cuidado também não.
              </p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-full mt-1 text-primary"><ShieldCheck size={18} /></div>
                  <span className="text-foreground/80 font-medium">Assistência 24h em qualquer lugar do Brasil.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-full mt-1 text-primary"><Heart size={18} /></div>
                  <span className="text-foreground/80 font-medium">Cobertura completa para terceiros, cuidando de todos ao redor.</span>
                </li>
              </ul>
              
              <Link href="/cotacao" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,0,0.23)] hover:-translate-y-1">
                Quero proteger meu carro agora <ArrowRight size={20} />
              </Link>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Mulher sorrindo no carro" className="rounded-2xl shadow-2xl relative z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

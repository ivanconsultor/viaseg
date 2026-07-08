"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import { 
  ShieldCheck, 
  HeartHandshake, 
  Clock, 
  ThumbsUp, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Users,
  BadgeDollarSign
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TiltCard = ({ imageSrc, alt, title, desc, linkHref }: { imageSrc: string, alt: string, title: string, desc: string, linkHref: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax calculations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d"
      }}
      className="group relative overflow-hidden rounded-3xl h-[400px] flex items-end shadow-xl hover:shadow-2xl transition-shadow"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
        style={{
          background: useTransform(() => `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.4) 0%, transparent 60%)`),
          mixBlendMode: "overlay"
        }}
      />
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: backgroundY }}>
        <img src={imageSrc} alt={alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 scale-110" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="relative z-10 p-10 w-full" style={{ transform: "translateZ(30px)" }}>
        <h3 className="font-heading text-3xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/80 mb-6 max-w-md">{desc}</p>
        <div className="pointer-events-auto">
          <Link href={linkHref} className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">
            Conhecer Produtos <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/casal-feliz.webp" 
            alt="Família feliz" 
            fill
            priority
            quality={90}
            className="object-cover object-top brightness-95 contrast-[1.03] saturate-[1.10]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent dark:from-[#0b0c10] dark:via-[#0b0c10]/80 dark:to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
                <ShieldCheck size={16} />
                <span>Sua proteção em primeiro lugar</span>
              </div>
            </motion.div>

            <motion.h1 
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground"
              initial="hidden" animate="visible" variants={fadeUp}
            >
              Cote com uma das <span className="text-primary">maiores corretoras</span> do Brasil
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-foreground/70 mb-10 leading-relaxed"
              initial="hidden" animate="visible" variants={fadeUp}
            >
              Atendimento especializado, preço justo e proteção real para você e sua família. Descomplique seu seguro hoje mesmo.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial="hidden" animate="visible" variants={fadeUp}
            >
              <Link 
                href="/cotacao" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,0,0.23)] hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
              >
                Fazer cotação grátis
                <ArrowRight size={20} />
              </Link>
              <a 
                href="#contato" 
                className="bg-white hover:bg-gray-50 text-foreground border border-gray-200 dark:bg-transparent dark:border-gray-800 dark:hover:bg-white/5 px-8 py-4 rounded-xl font-medium text-lg transition-all text-center"
              >
                Falar com especialista
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-20 bg-secondary/50" id="diferenciais">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Por que escolher a ViaSeg?</h2>
            <p className="text-foreground/70 text-lg">Nós transformamos a complexidade dos seguros em tranquilidade para o seu dia a dia.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          >
            {[
              { icon: <HeartHandshake />, title: "Atendimento Especializado", desc: "Consultores prontos para ajudar a escolher o melhor seguro para você." },
              { icon: <CheckCircle2 />, title: "Sem Surpresas", desc: "Coberturas claras e transparentes, sem letras miúdas na apólice." },
              { icon: <ShieldCheck />, title: "Melhores Seguradoras", desc: "Parceria com as maiores e mais confiáveis do mercado brasileiro." },
              { icon: <Clock />, title: "Processo Descomplicado", desc: "Contratação rápida, 100% digital e sem burocracia do começo ao fim." }
            ].map((item, i) => (
              <motion.div 
                key={i} variants={fadeUp}
                className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md hover:border-primary/20 transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tipos de Seguro */}
      <section className="py-24" id="seguros">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div 
              className="max-w-2xl"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Soluções completas para todos os momentos</h2>
              <p className="text-foreground/70 text-lg">Temos o seguro ideal para proteger seu patrimônio, sua saúde e o seu futuro.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <TiltCard 
                imageSrc="/images/familia-na-sala.webp"
                alt="Seguros para você"
                title="Para Você"
                desc="Proteção para seu carro, sua casa e, o mais importante, sua vida e saúde."
                linkHref="/cotacao"
              />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <TiltCard 
                imageSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Seguros para empresas"
                title="Para Empresas"
                desc="Segurança completa para o seu negócio crescer sem imprevistos ou preocupações."
                linkHref="/cotacao"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-[#1A1A2E] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 leading-tight">Uma corretora que entende você.</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Nossa missão é mais do que vender seguros, é entregar tranquilidade. Com milhares de clientes satisfeitos em todo o Brasil, a ViaSeg construiu uma reputação baseada na confiança e na transparência.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                    <MapPin />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">+1.800</h4>
                    <p className="text-gray-400 text-sm">Cidades Atendidas</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                    <Users />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">+270 Mil</h4>
                    <p className="text-gray-400 text-sm">Clientes Segurados</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                    <ShieldCheck />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">+50</h4>
                    <p className="text-gray-400 text-sm">Seguradoras Parceiras</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                    <BadgeDollarSign />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Preço Justo</h4>
                    <p className="text-gray-400 text-sm">Que cabe no seu bolso</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10 aspect-[4/3] w-full">
                <Image src="/images/familia-na-mesa.webp" alt="Clientes ViaSeg" fill className="object-cover scale-[1.03]" />
              </div>
              <div className="absolute -inset-4 border border-white/20 rounded-3xl z-0 translate-x-4 translate-y-4"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 relative overflow-hidden bg-white dark:bg-[#0b0c10]">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Pronto para proteger o que é seu?</h2>
            <p className="text-xl text-foreground/70 mb-10">Não deixe para amanhã a segurança que você e sua família merecem hoje. Faça uma cotação rápida e sem compromisso.</p>
            <Link 
              href="/cotacao" 
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,0,0.23)] hover:-translate-y-1"
            >
              Fazer Cotação Grátis
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

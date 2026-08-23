"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import { 
  ShieldCheck, 
  HeartHandshake, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Users,
  BadgeDollarSign
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ParceirosSection from "@/components/sections/ParceirosSection";

const TiltCard = ({ imageSrc, alt, title, desc, linkHref }: { imageSrc: string, alt: string, title: string, desc: string, linkHref: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  
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
          <Link href={linkHref} className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-[#FF6B00] hover:text-white transition-colors">
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
    <main className="min-h-screen bg-slate-50 text-[#1A1A2E] flex flex-col">
      <Header />

      {/* Hero: foto de fundo integrada a pagina (formato original).
          Ajustes: foto deslocada para a direita e vEu branco mais leve,
          para a imagem aparecer mais viva sem prejudicar a leitura do texto. */}
      <section className="relative flex items-center pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white min-h-[min(70vw,880px)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/casal-feliz.webp"
            alt="Família feliz protegida pelos seguros da ViaSeg"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-[60%_20%] md:object-[35%_22%]"
          />
          {/* Veu branco do lado esquerdo: da contraste ao texto sem apagar a foto */}
          <div className="absolute inset-0 w-full md:w-6/12 bg-gradient-to-r from-white via-white/90 to-transparent md:from-white/95 md:via-white/70"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-xl md:max-w-2xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] font-semibold text-sm mb-6 border border-[#FF6B00]/20 shadow-sm">
                <ShieldCheck size={16} />
                <span>Sua proteção em primeiro lugar</span>
              </div>
            </motion.div>

            <motion.h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#1A1A2E]"
              initial="hidden" animate="visible" variants={fadeUp}
            >
              Cote com uma das <span className="text-[#FF6B00]">maiores corretoras</span> do Brasil
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-700 mb-10 leading-relaxed font-normal"
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
                className="bg-[#FF6B00] hover:bg-[#e05e00] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,0,0.23)] hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
              >
                Fazer cotação grátis
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/fale-conosco"
                className="bg-white hover:bg-slate-50 text-[#1A1A2E] border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg transition-all text-center shadow-sm"
              >
                Falar com especialista
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Faixa de Seguradoras Parceiras sem Molduras/Bordas */}
      <ParceirosSection />

      {/* Diferenciais Section */}
      <section className="py-20 bg-slate-100/60" id="diferenciais">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">Por que escolher a ViaSeg?</h2>
            <p className="text-slate-600 text-lg">Trabalhamos para garantir que você tenha a melhor experiência e a máxima segurança.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {[
              { icon: <HeartHandshake />, title: "Atendimento Especializado", desc: "Consultores prontos para ajudar a escolher o melhor seguro para você." },
              { icon: <CheckCircle2 />, title: "Sem Surpresas", desc: "Coberturas claras e transparentes, sem letras miúdas na apólice." },
              { icon: <ShieldCheck />, title: "Melhores Seguradoras", desc: "Parceria com as maiores e mais confiáveis do mercado brasileiro." },
              { icon: <Clock />, title: "Processo Descomplicado", desc: "Contratação rápida, 100% digital e sem burocracia do começo ao fim." }
            ].map((item, i) => (
              <motion.div 
                key={i} variants={fadeUp}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md hover:border-[#FF6B00]/30 transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-[#FF6B00]/10 text-[#FF6B00] rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-xl text-[#1A1A2E] mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tipos de Seguro */}
      <section className="py-24 bg-white" id="seguros">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div 
              className="max-w-2xl"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">Soluções completas para todos os momentos</h2>
              <p className="text-slate-600 text-lg">Temos o seguro ideal para proteger seu patrimônio, sua saúde e o seu futuro.</p>
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
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">Uma corretora que entende você.</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Nossa missão é mais do que vender seguros, é entregar tranquilidade. Com milhares de clientes satisfeitos em todo o Brasil, a ViaSeg construiu uma reputação baseada na confiança e na transparência.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#FF6B00]">
                    <MapPin />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white">+1.800</h4>
                    <p className="text-slate-400 text-sm">Cidades Atendidas</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#FF6B00]">
                    <Users />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white">+270 Mil</h4>
                    <p className="text-slate-400 text-sm">Clientes Segurados</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#FF6B00]">
                    <ShieldCheck />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white">+50</h4>
                    <p className="text-slate-400 text-sm">Seguradoras Parceiras</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#FF6B00]">
                    <BadgeDollarSign />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white">Preço Justo</h4>
                    <p className="text-slate-400 text-sm">Que cabe no seu bolso</p>
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
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-6">Pronto para proteger o que é seu?</h2>
            <p className="text-xl text-slate-600 mb-10">Não deixe para amanhã a segurança que você e sua família merecem hoje. Faça uma cotação rápida e sem compromisso.</p>
            <Link 
              href="/cotacao" 
              className="inline-flex items-center justify-center bg-[#FF6B00] hover:bg-[#e05e00] text-white px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,0,0.23)] hover:-translate-y-1"
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

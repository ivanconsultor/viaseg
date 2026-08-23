"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Car, Home, Heart, Plane, Smartphone, Laptop, CreditCard, Wrench, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Cotacao() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const portoLinks = [
    {
      title: "Seguro Auto",
      desc: "Proteção completa para o seu veículo com assistência 24h.",
      icon: <Car size={32} />,
      link: "https://www.portoseguro.com.br/loja/seguro-auto/placa-do-veiculo?link_uuid=9850c93f-1680-4cda-a6c0-b88cc871c3c4&origem=gerador-link_corretor&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&utm_id=9850c93f-1680-4cda-a6c0-b88cc871c3c4&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=seguroauto",
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      title: "Seguro Residencial",
      desc: "Cuidado e segurança para o seu lar contra imprevistos.",
      icon: <Home size={32} />,
      link: "https://www.portoseguro.com.br/loja/seguro-residencial?link_uuid=3bbee30f-3cbc-4f07-8609-3c78d68cf153&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&origem=gerador-link_corretor&utm_id=3bbee30f-3cbc-4f07-8609-3c78d68cf153&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=residenciaessencial",
      color: "bg-orange-50 text-orange-600 border-orange-200"
    },
    {
      title: "Seguro de Vida",
      desc: "Garantia de tranquilidade financeira para quem você ama.",
      icon: <Heart size={32} />,
      link: "https://www.portoseguro.com.br/loja/seguro-de-vida?link_uuid=01ac15dd-ee60-44ef-9911-f8f2ae19822c&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&origem=gerador-link_corretor&utm_id=01ac15dd-ee60-44ef-9911-f8f2ae19822c&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=segurodevidaon",
      color: "bg-rose-50 text-rose-600 border-rose-200"
    },
    {
      title: "Seguro Viagem",
      desc: "Voe tranquilo. Cobertura médica e bagagem para viagens.",
      icon: <Plane size={32} />,
      link: "https://www.portoseguro.com.br/loja/seguro-viagem?link_uuid=19f7037c-f47a-46a3-9505-33ee690ab165&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&origem=gerador-link_corretor&utm_id=19f7037c-f47a-46a3-9505-33ee690ab165&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=viagem",
      color: "bg-teal-50 text-teal-600 border-teal-200"
    },
    {
      title: "Seguro Equipamentos",
      desc: "Proteção contra roubo e danos para notebooks e câmeras.",
      icon: <Laptop size={32} />,
      link: "https://www.portoseguro.com.br/equipamentos-portateis/corretor?link_uuid=077ebd00-634b-46cd-a399-e653720e7031&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&origem=gerador-link_corretor&utm_id=077ebd00-634b-46cd-a399-e653720e7031&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=equipamentosportateis",
      color: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
      title: "Seguro Celular",
      desc: "Cobertura contra roubo, quebra e danos ao seu smartphone.",
      icon: <Smartphone size={32} />,
      link: "https://www.portoseguro.com.br/loja/seguro-celular?link_uuid=fe4715f0-d38b-4428-a56d-231f82e0d600&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&origem=gerador-link_corretor&utm_id=fe4715f0-d38b-4428-a56d-231f82e0d600&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=segurocelular",
      color: "bg-purple-50 text-purple-600 border-purple-200"
    },
    {
      title: "Cartão de Crédito",
      desc: "Solicite o Cartão Porto Seguro com descontos exclusivos.",
      icon: <CreditCard size={32} />,
      link: "https://www.portoseguro.com.br/loja/cartao-de-credito/aquisicao?link_uuid=077ebd00-634b-46cd-a399-e653720e7031&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&origem=gerador-link_corretor&utm_id=077ebd00-634b-46cd-a399-e653720e7031&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=equipamentosportateis&referencia=site-institucional",
      color: "bg-green-50 text-green-600 border-green-200"
    },
    {
      title: "Porto Resolve",
      desc: "Assistência para casa: encanador, eletricista e chaveiro.",
      icon: <Wrench size={32} />,
      link: "https://www.portoseguro.com.br/resolve?link_uuid=70420bd3-c39c-4448-8d20-ec0de07b64e3&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&origem=gerador-link_corretor&utm_id=70420bd3-c39c-4448-8d20-ec0de07b64e3&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=portoresolve",
      color: "bg-amber-50 text-amber-600 border-amber-200"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-[#1A1A2E] flex flex-col">
      <Header />

      <section className="flex-grow pt-32 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-[#FF6B00] font-semibold mb-8 transition-colors">
            <ArrowLeft size={18} />
            <span>Voltar para Início</span>
          </Link>

          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden" animate="visible" variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] font-semibold text-sm mb-4 border border-[#FF6B00]/20 shadow-sm">
              <ShieldCheck size={18} />
              <span>Cotação Online Instantânea</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-6">
              Escolha a cobertura ideal para você
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Faça a sua cotação diretamente com a nossa corretora parceira oficial e garanta descontos e condições exclusivas.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
            initial="hidden" animate="visible" variants={staggerContainer}
          >
            {portoLinks.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#FF6B00]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 border ${item.color}`}>
                    {item.icon}
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#1A1A2E] mb-2 group-hover:text-[#FF6B00] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#FF6B00] font-bold text-sm group-hover:translate-x-1 transition-transform">
                  <span>Cotar Agora</span>
                  <ArrowRight size={16} />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

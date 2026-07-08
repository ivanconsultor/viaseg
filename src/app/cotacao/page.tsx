"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Car, Home, Heart, Briefcase, ExternalLink, ShieldCheck, Plane, Smartphone, Laptop, CreditCard, Wrench } from "lucide-react";
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
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Seguro Residencial",
      desc: "Cuidado e segurança para o seu lar contra imprevistos.",
      icon: <Home size={32} />,
      link: "https://www.portoseguro.com.br/loja/seguro-residencial?link_uuid=3bbee30f-3cbc-4f07-8609-3c78d68cf153&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&origem=gerador-link_corretor&utm_id=3bbee30f-3cbc-4f07-8609-3c78d68cf153&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=residenciaessencial",
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Seguro de Vida",
      desc: "Garantia de tranquilidade financeira para quem você ama.",
      icon: <Heart size={32} />,
      link: "https://www.portoseguro.com.br/loja/seguro-de-vida?link_uuid=01ac15dd-ee60-44ef-9911-f8f2ae19822c&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&origem=gerador-link_corretor&utm_id=01ac15dd-ee60-44ef-9911-f8f2ae19822c&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=segurodevidaon",
      color: "bg-rose-50 text-rose-600"
    },
    {
      title: "Seguro Viagem",
      desc: "Voe tranquilo. Cobertura médica e bagagem para viagens.",
      icon: <Plane size={32} />,
      link: "https://www.portoseguro.com.br/loja/seguro-viagem?link_uuid=19f7037c-f47a-46a3-9505-33ee690ab165&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&origem=gerador-link_corretor&utm_id=19f7037c-f47a-46a3-9505-33ee690ab165&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=viagem",
      color: "bg-teal-50 text-teal-600"
    },
    {
      title: "Seguro Equipamentos",
      desc: "Proteção contra roubo e danos para notebooks e câmeras.",
      icon: <Laptop size={32} />,
      link: "https://www.portoseguro.com.br/equipamentos-portateis/corretor?link_uuid=077ebd00-634b-46cd-a399-e653720e7031&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&origem=gerador-link_corretor&utm_id=077ebd00-634b-46cd-a399-e653720e7031&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=equipamentosportateis",
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      title: "Seguro Celular",
      desc: "Cobertura contra roubo, quebra e danos ao seu smartphone.",
      icon: <Smartphone size={32} />,
      link: "https://www.portoseguro.com.br/loja/seguro-celular?link_uuid=fe4715f0-d38b-4428-a56d-231f82e0d600&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&origem=gerador-link_corretor&utm_id=fe4715f0-d38b-4428-a56d-231f82e0d600&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=segurocelular",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Cartão de Crédito",
      desc: "Solicite o Cartão Porto Seguro com descontos exclusivos.",
      icon: <CreditCard size={32} />,
      link: "https://www.portoseguro.com.br/loja/cartao-de-credito/aquisicao?link_uuid=077ebd00-634b-46cd-a399-e653720e7031&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&origem=gerador-link_corretor&utm_id=077ebd00-634b-46cd-a399-e653720e7031&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=equipamentosportateis&referencia=site-institucional",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Porto Resolve",
      desc: "Assistência para casa: encanador, eletricista e chaveiro.",
      icon: <Wrench size={32} />,
      link: "https://www.portoseguro.com.br/resolve?link_uuid=70420bd3-c39c-4448-8d20-ec0de07b64e3&social_media=OTHERS&source=NEW_ENGINE&susep=65956F&origem=gerador-link_corretor&utm_id=70420bd3-c39c-4448-8d20-ec0de07b64e3&utm_source=gerador-link-corretor&utm_medium=others&utm_campaign=65956F&utm_content=portoresolve",
      color: "bg-amber-50 text-amber-600"
    }
  ];

  return (
    <main className="min-h-screen bg-secondary/30 flex flex-col">
      <Header />

      <section className="flex-grow pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary font-medium mb-8 transition-colors">
            <ArrowLeft size={18} />
            <span>Voltar para Início</span>
          </Link>

          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden" animate="visible" variants={fadeUp}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6 border border-gray-100">
              <ShieldCheck className="text-primary" size={32} />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Cotação Online</h1>
            <p className="text-lg text-foreground/70">
              Escolha o produto desejado e faça sua cotação em tempo real com a <strong className="text-foreground">Porto Seguro</strong>.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
            initial="hidden" animate="visible" variants={staggerContainer}
          >
            {portoLinks.map((item, index) => (
              <motion.a 
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                className="group flex flex-col bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                    {item.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                    <ExternalLink size={16} />
                  </div>
                </div>
                
                <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed mb-6 flex-grow">{item.desc}</p>
                
                <div className="text-sm font-medium text-primary flex items-center gap-2 mt-auto">
                  Acessar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div 
            className="mt-20 max-w-3xl mx-auto bg-primary/5 border border-primary/20 p-8 rounded-3xl text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <h4 className="font-heading font-bold text-xl mb-3">Precisa de ajuda para escolher?</h4>
            <p className="text-foreground/70 mb-6">
              Nossos consultores estão disponíveis para auxiliar você a encontrar o melhor plano.
            </p>
            <a href="https://api.whatsapp.com/send/?phone=5521976844444&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors">
              Falar com Consultor
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

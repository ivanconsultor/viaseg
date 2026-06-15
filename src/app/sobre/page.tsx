"use client";

import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck, HeartHandshake, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Sobre() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header lightText={true} />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#1A1A2E] text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Equipe ViaSeg" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E] via-[#1A1A2E]/80 to-transparent"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary/20 text-primary font-bold tracking-wider uppercase text-sm mb-6 border border-primary/30">Nossa História</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">Mais do que seguros, vendemos tranquilidade.</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Na ViaSeg, acreditamos que proteger o que você conquistou é o primeiro passo para voar ainda mais alto. Somos uma corretora dedicada a entregar soluções sob medida para sua vida e seus negócios.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quem Somos */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-foreground">Quem é a ViaSeg?</h2>
              <div className="space-y-6 text-lg text-foreground/70 leading-relaxed">
                <p>
                  A <strong>ViaSeg Corretora de Seguros</strong> nasceu com um propósito claro: desburocratizar o mercado de seguros e colocar o cliente no centro de tudo. Sabemos que lidar com apólices, sinistros e coberturas pode ser confuso, e é por isso que atuamos como seus tradutores e defensores.
                </p>
                <p>
                  Trabalhamos em parceria com as maiores e mais sólidas seguradoras do mercado brasileiro e internacional. Isso nos permite não apenas encontrar os melhores preços, mas garantir que você receba a cobertura exata para a sua necessidade, sem entrelinhas ou surpresas desagradáveis.
                </p>
                <p>
                  Seja para o seu primeiro carro, a casa dos seus sonhos, a saúde da sua família ou o futuro da sua empresa, nossa equipe de especialistas está sempre pronta para oferecer um atendimento humanizado, ágil e resolutivo.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-3xl transform translate-x-4 translate-y-4"></div>
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Profissionais da ViaSeg" className="rounded-3xl shadow-xl relative z-10 w-full h-auto object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-24 bg-gray-50 dark:bg-black/20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Nossos Pilares</h2>
            <p className="text-foreground/70 text-lg mt-4 max-w-2xl mx-auto">Os fundamentos que guiam nossas decisões e a forma como atendemos cada um de nossos clientes.</p>
          </motion.div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Missão */}
            <motion.div variants={fadeUp} className="bg-white dark:bg-[#1A1A2E] p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-white/10 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                <Target size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">Missão</h3>
              <p className="text-foreground/70 leading-relaxed">
                Garantir a proteção do patrimônio e da vida de nossos clientes através de soluções de seguros inteligentes, prestando um serviço de excelência pautado na agilidade e no suporte incondicional nos momentos em que mais precisarem.
              </p>
            </motion.div>

            {/* Visão */}
            <motion.div variants={fadeUp} className="bg-white dark:bg-[#1A1A2E] p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-white/10 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                <Eye size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">Visão</h3>
              <p className="text-foreground/70 leading-relaxed">
                Ser reconhecida como a corretora de seguros mais confiável e inovadora da região, destacando-se pela tecnologia aliada ao atendimento humano, e construindo relacionamentos duradouros com clientes e parceiros de negócios.
              </p>
            </motion.div>

            {/* Valores */}
            <motion.div variants={fadeUp} className="bg-white dark:bg-[#1A1A2E] p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-white/10 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">Valores</h3>
              <ul className="text-foreground/70 space-y-3 text-left pl-4">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Transparência Absoluta</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Ética Profissional</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Foco no Cliente</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Resolução Rápida</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Inovação</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-primary text-white rounded-3xl p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <HeartHandshake size={200} />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">O seu corretor não deve ser lembrado apenas na renovação.</h2>
              <p className="text-xl mb-10 opacity-90 leading-relaxed">
                Nosso maior diferencial é o atendimento ativo de pós-venda. Em caso de sinistro, você não fala com um robô, você liga direto para a gente. Nós assumimos a burocracia para que você fique tranquilo.
              </p>
              <a href="/cotacao" className="inline-block bg-white text-primary font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-xl">
                Venha fazer parte da ViaSeg
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

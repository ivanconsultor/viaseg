"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function FaleConosco() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria implementada a lógica de envio (ex: EmailJS, Resend, etc)
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-white dark:bg-[#0b0c10] text-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-background to-background"></div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">Fale Conosco</h1>
            <p className="text-lg md:text-xl text-foreground/70">
              Estamos aqui para ajudar. Tire suas dúvidas, solicite uma cotação especial ou envie suas sugestões. Nossa equipe retornará o mais rápido possível!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Formulário */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true }}
              className="bg-white dark:bg-[#1A1A2E] p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10"
            >
              <h2 className="text-2xl font-bold mb-6 text-foreground">Envie uma mensagem</h2>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="nome" className="text-sm font-medium text-foreground/80">Nome Completo</label>
                  <input 
                    type="text" 
                    id="nome" 
                    placeholder="Como gostaria de ser chamado?" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground/80">E-mail</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="seu@email.com" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="text-sm font-medium text-foreground/80">WhatsApp</label>
                    <input 
                      type="tel" 
                      id="whatsapp" 
                      placeholder="(00) 00000-0000" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="assunto" className="text-sm font-medium text-foreground/80">Descrição do Assunto</label>
                  <textarea 
                    id="assunto" 
                    rows={4} 
                    placeholder="Digite sua dúvida ou solicitação aqui..." 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl transition-all hover:-translate-y-1 shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,0,0.23)]"
                >
                  <Send size={20} />
                  Enviar Mensagem
                </button>
              </form>
            </motion.div>

            {/* Informações de Contato */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-heading font-bold mb-4">Informações de Contato</h2>
                <p className="text-foreground/70 leading-relaxed mb-8">
                  Prefere falar diretamente conosco? Nossos canais de atendimento estão sempre abertos para lhe dar o melhor suporte.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground">WhatsApp</h4>
                    <a href="https://api.whatsapp.com/send/?phone=5521976844444&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-foreground/70 mt-1 hover:text-primary transition-colors block">
                      (21) 97684-4444
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground">E-mail</h4>
                    <a href="mailto:contato@viasegcorretora.com.br" className="text-foreground/70 mt-1 hover:text-primary transition-colors block">
                      contato@viasegcorretora.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground">Endereço</h4>
                    <p className="text-foreground/70 mt-1">Rua Dr Othon Machado, 150 - Sala 406</p>
                    <p className="text-foreground/70 mt-1">Inhaúma - Rio de Janeiro - RJ</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground">Horário de Atendimento</h4>
                    <p className="text-foreground/70 mt-1">Segunda a Sexta: 09h às 18h</p>
                    <p className="text-foreground/70 mt-1">Sábados: 09h às 13h</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

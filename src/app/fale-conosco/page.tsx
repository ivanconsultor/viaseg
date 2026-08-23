"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SafeShadowBoundary from "@/components/SafeShadowBoundary";

export default function FaleConosco() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    
    const nomeInput = form.querySelector("#nome") as HTMLInputElement;
    const emailInput = form.querySelector("#email") as HTMLInputElement;
    const whatsappInput = form.querySelector("#whatsapp") as HTMLInputElement;
    const assuntoInput = form.querySelector("#assunto") as HTMLTextAreaElement;

    const nome = nomeInput?.value || "";
    const email = emailInput?.value || "";
    const whatsapp = whatsappInput?.value || "";
    const assunto = assuntoInput?.value || "";

    try {
      const response = await fetch("/send.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, whatsapp, assunto }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
        form.reset();
      } else {
        alert(data.message || "Ocorreu um erro ao enviar a mensagem. Tente novamente.");
      }
    } catch (error) {
      alert("Erro ao enviar a mensagem. Tente novamente mais tarde.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-[#1A1A2E] flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-white border-b border-slate-100 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-[#1A1A2E]">Fale Conosco</h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
              Estamos aqui para ajudar. Tire suas dúvidas, solicite uma cotação especial ou envie suas sugestões. Nossa equipe retornará o mais rápido possível!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 flex-1 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Formulário */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-200"
            >
              <h2 className="text-2xl font-bold mb-6 text-[#1A1A2E]">Envie uma mensagem</h2>
              <SafeShadowBoundary>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="text-sm font-semibold text-slate-700">Nome Completo</label>
                    <input 
                      type="text" 
                      id="nome" 
                      placeholder="Como gostaria de ser chamado?" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-[#1A1A2E] focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-slate-700">E-mail</label>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="seu@email.com" 
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-[#1A1A2E] focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="text-sm font-semibold text-slate-700">WhatsApp / Telefone</label>
                      <input 
                        type="tel" 
                        id="whatsapp" 
                        placeholder="(00) 00000-0000" 
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-[#1A1A2E] focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="assunto" className="text-sm font-semibold text-slate-700">Mensagem</label>
                    <textarea 
                      id="assunto" 
                      rows={4} 
                      placeholder="Como podemos te ajudar hoje?" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-[#1A1A2E] focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#FF6B00] hover:bg-[#e05e00] text-white py-4 px-6 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 text-base"
                  >
                    <Send size={18} />
                    Enviar Mensagem
                  </button>
                </form>
              </SafeShadowBoundary>
            </motion.div>

            {/* Informações de Contato */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true }}
              className="space-y-8 lg:pl-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#1A1A2E]">Nossos Canais</h2>
                <p className="text-slate-600 mb-8 leading-relaxed font-normal">
                  Fique à vontade para entrar em contato através dos nossos canais de atendimento ou venha tomar um café conosco.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A2E]">Endereço</h3>
                    <p className="text-slate-600 text-sm mt-1">Rua Dr Othon Machado, 150 - Sala 406<br />Rio de Janeiro - RJ</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A2E]">Telefone & WhatsApp</h3>
                    <a href="https://wa.me/5521976844444" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-[#FF6B00] text-sm mt-1 block font-medium">
                      +55 (21) 97684-4444
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A2E]">E-mail</h3>
                    <a href="mailto:contato@viasegcorretora.com.br" className="text-slate-600 hover:text-[#FF6B00] text-sm mt-1 block font-medium">
                      contato@viasegcorretora.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A2E]">Horário de Atendimento</h3>
                    <p className="text-slate-600 text-sm mt-1">Segunda a Sexta: 09h às 18h</p>
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

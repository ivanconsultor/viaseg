"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function Termos() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 md:px-6 py-32 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-foreground">Termos de Uso</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/80">
            <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
            
            <p>Bem-vindo ao site da <strong>ViaSeg Corretora de Seguros</strong>. Ao acessar e utilizar o nosso site, você concorda com os presentes Termos de Uso. Leia-os atentamente antes de prosseguir com qualquer simulação ou cotação.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">1. Serviços Oferecidos</h2>
            <p>A ViaSeg disponibiliza uma plataforma online para simulação, cotação e intermediação de seguros automotivos, residenciais, empresariais e de vida, operando como representante do segurado perante as seguradoras parceiras cadastradas na SUSEP.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">2. Responsabilidades do Usuário</h2>
            <p>Ao utilizar nossos formulários, você se compromete a fornecer <strong>informações verdadeiras, precisas e completas</strong>. A inexatidão dos dados (como perfil de condutor, CEP de pernoite, ou informações de saúde) pode resultar em:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Alteração do valor final do prêmio do seguro.</li>
              <li>Recusa de aceitação da proposta por parte da Seguradora.</li>
              <li><strong>Perda do direito à indenização</strong> em caso de sinistro (Artigo 766 do Código Civil Brasileiro).</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">3. Limitação de Responsabilidade</h2>
            <p>Os valores apresentados em nossas simulações são <strong>estimativas</strong> baseadas nas informações fornecidas e nas tabelas momentâneas das Seguradoras. A ViaSeg não garante a manutenção de preços e condições de cobertura até a efetiva emissão da apólice, estando sujeitos à análise de risco da Seguradora final.</p>

            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">4. Propriedade Intelectual</h2>
            <p>Todo o conteúdo, design, logotipos e código-fonte deste site são de propriedade exclusiva da ViaSeg Corretora de Seguros. É terminantemente proibida a cópia, reprodução ou distribuição não autorizada.</p>

            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">5. Foro de Eleição</h2>
            <p>Fica eleito o foro da comarca da sede da corretora para dirimir quaisquer questões decorrentes destes Termos de Uso, com renúncia de qualquer outro, por mais privilegiado que seja.</p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

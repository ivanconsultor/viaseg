"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function Privacidade() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 md:px-6 py-32 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-foreground">Política de Privacidade</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/80">
            <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
            
            <p>A <strong>ViaSeg Corretora de Seguros</strong> ("nós", "nosso", "nossa") está comprometida em proteger a sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais quando você usa o nosso site e serviços de cotação de seguros, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">1. Dados que Coletamos</h2>
            <p>Para fornecer cotações precisas e atendimento personalizado, coletamos os seguintes tipos de informações:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dados Pessoais:</strong> Nome completo, CPF, e-mail, telefone, data de nascimento e estado civil.</li>
              <li><strong>Dados Relacionados ao Seguro:</strong> Informações sobre seu veículo (placa, chassi, ano), residência, empresa ou condições de saúde (no caso de seguro de vida/saúde), estritamente necessários para a precificação junto às seguradoras.</li>
              <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas e tempo de permanência no site.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">2. Como Usamos seus Dados</h2>
            <p>Utilizamos suas informações exclusivamente para as seguintes finalidades:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gerar e apresentar propostas de seguros adequadas ao seu perfil.</li>
              <li>Comunicar-nos com você sobre cotações, renovações e novidades.</li>
              <li>Cumprir obrigações legais e regulatórias da SUSEP.</li>
              <li>Melhorar a segurança e a usabilidade do nosso site.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">3. Compartilhamento de Dados</h2>
            <p>A ViaSeg atua como intermediária. Portanto, <strong>precisamos compartilhar seus dados com as Seguradoras Parceiras</strong> para gerar as cotações. Não vendemos, alugamos ou comercializamos seus dados com terceiros para fins de marketing sem o seu consentimento explícito.</p>

            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">4. Seus Direitos (LGPD)</h2>
            <p>Você tem o direito de:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Confirmar a existência de tratamento e acessar seus dados.</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
              <li>Revogar o seu consentimento a qualquer momento.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">5. Contato</h2>
            <p>Se você tiver qualquer dúvida sobre esta política ou quiser exercer seus direitos, entre em contato com nosso Encarregado de Proteção de Dados (DPO) através do e-mail: <strong>contato@viasegcorretora.com.br</strong>.</p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

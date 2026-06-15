"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function Cookies() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 md:px-6 py-32 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-foreground">Política de Cookies</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/80">
            <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
            
            <p>A <strong>ViaSeg Corretora de Seguros</strong> utiliza cookies e tecnologias semelhantes para melhorar a sua experiência de navegação, entender como você interage com nosso site e personalizar nosso atendimento. Esta política explica o que são cookies, como os usamos e como você pode gerenciá-los.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">1. O que são Cookies?</h2>
            <p>Cookies são pequenos arquivos de texto que um site armazena no seu computador ou dispositivo móvel quando você o visita. Eles permitem que o site "lembre" de suas ações e preferências por um certo período de tempo.</p>
            
            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">2. Como utilizamos os Cookies</h2>
            <p>Nosso site utiliza os seguintes tipos de cookies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies Estritamente Necessários:</strong> Essenciais para o funcionamento do site (ex: navegação na página, acesso a áreas seguras de preenchimento de cotação). O site não pode funcionar corretamente sem eles.</li>
              <li><strong>Cookies de Desempenho e Estatística:</strong> Ajudam-nos a entender como os visitantes interagem com o site, coletando informações de forma anônima (ex: Google Analytics).</li>
              <li><strong>Cookies de Marketing/Publicidade:</strong> Usados para rastrear visitantes pelos sites. A intenção é exibir anúncios que sejam relevantes e atraentes para o usuário individual.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">3. Como gerenciar seus Cookies</h2>
            <p>Você pode controlar e/ou excluir cookies conforme desejar. Você pode apagar todos os cookies que já estão no seu computador e pode configurar a maioria dos navegadores para evitar que eles sejam colocados.</p>
            <p>No entanto, se você fizer isso, pode ser necessário ajustar manualmente algumas preferências toda vez que visitar o site, e alguns serviços e funcionalidades (como os formulários de cotação) podem não funcionar perfeitamente.</p>
            
            <p className="mt-8">Consulte a aba de "Configurações" ou "Preferências" do seu navegador (Chrome, Safari, Firefox, Edge) para gerenciar o bloqueio ou a exclusão de cookies.</p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { EMPRESA, ATUALIZADO_EM } from "@/lib/empresa";

export default function Termos() {
  const h2 = "text-2xl font-bold text-[#1A1A2E] mt-10 mb-4";
  const ul = "list-disc pl-6 space-y-2";

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto px-4 md:px-6 py-32 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-[#1A1A2E]">Termos de Uso</h1>

          <div className="prose prose-lg max-w-none space-y-6 text-[#1A1A2E]/80">
            <p><strong>Última atualização:</strong> {ATUALIZADO_EM}</p>

            <p>
              Estes termos valem para o uso do site {EMPRESA.site}, mantido pela{" "}
              <strong>{EMPRESA.nome}</strong>
              {EMPRESA.cnpj ? <>, CNPJ {EMPRESA.cnpj}</> : null}
              {EMPRESA.susep ? <>, corretora registrada na SUSEP sob o nº {EMPRESA.susep}</> : null}.
            </p>

            <h2 className={h2}>1. O que este site faz</h2>
            <p>
              Este é um site institucional. Ele apresenta a corretora, explica os tipos de seguro que
              intermediamos e oferece canais de contato.
            </p>
            <p>
              <strong>Não há cálculo de preço nem simulação dentro deste site.</strong> Ao clicar em um
              botão de cotação, você é encaminhado ao ambiente da seguradora parceira, onde a cotação é
              feita por ela, sob as regras e a política de privacidade dela.
            </p>

            <h2 className={h2}>2. Nosso papel como corretora</h2>
            <p>
              A {EMPRESA.nome} atua como intermediária entre você e as seguradoras. Quem aceita a
              proposta, calcula o prêmio, emite a apólice e decide sobre sinistros é sempre a{" "}
              <strong>seguradora</strong>, não a corretora.
            </p>

            <h2 className={h2}>3. Informações que você fornece</h2>
            <p>
              Ao entrar em contato ou preencher uma cotação, comprometa-se a fornecer informações{" "}
              <strong>verdadeiras, precisas e completas</strong>. Informação incorreta — como perfil de
              condutor, CEP de pernoite ou dados de saúde — pode causar:
            </p>
            <ul className={ul}>
              <li>alteração do valor final do prêmio;</li>
              <li>recusa da proposta pela seguradora;</li>
              <li><strong>perda do direito à indenização</strong> em caso de sinistro, conforme o art. 766 do Código Civil.</li>
            </ul>

            <h2 className={h2}>4. Limites de responsabilidade</h2>
            <ul className={ul}>
              <li>Valores mostrados em ambientes de cotação são <strong>estimativas</strong>, sujeitas à análise de risco da seguradora até a emissão da apólice.</li>
              <li>Não garantimos manutenção de preços ou condições de cobertura entre a cotação e a contratação.</li>
              <li>Não respondemos pelo conteúdo, disponibilidade ou práticas dos sites das seguradoras e de terceiros para os quais encaminhamos.</li>
              <li>Buscamos manter o site disponível e correto, mas ele pode ficar indisponível para manutenção ou por causas fora do nosso controle.</li>
            </ul>

            <h2 className={h2}>5. Uso adequado</h2>
            <p>Ao usar este site, você concorda em não:</p>
            <ul className={ul}>
              <li>enviar conteúdo ilegal, ofensivo ou de terceiros sem autorização;</li>
              <li>usar os formulários para disparo em massa, spam ou qualquer forma de abuso;</li>
              <li>tentar burlar mecanismos de segurança ou obter acesso não autorizado.</li>
            </ul>

            <h2 className={h2}>6. Propriedade intelectual</h2>
            <p>
              O conteúdo, o design e o código deste site pertencem à {EMPRESA.nome}. As marcas e
              logotipos das seguradoras parceiras pertencem às respectivas empresas e aparecem aqui
              apenas para identificar a rede credenciada.
            </p>

            <h2 className={h2}>7. Privacidade</h2>
            <p>
              O tratamento dos seus dados está descrito na{" "}
              <Link href="/privacidade" className="text-[#FF6B00] font-semibold hover:underline">Política de Privacidade</Link>{" "}
              e o uso de cookies na{" "}
              <Link href="/cookies" className="text-[#FF6B00] font-semibold hover:underline">Política de Cookies</Link>.
            </p>

            <h2 className={h2}>8. Mudanças nestes termos</h2>
            <p>
              Estes termos podem ser atualizados. A data no topo indica a última revisão, e o uso do
              site após a mudança significa concordância com a versão vigente.
            </p>

            <h2 className={h2}>9. Lei aplicável e foro</h2>
            <p>
              Aplica-se a lei brasileira, incluindo o Código de Defesa do Consumidor. Nas relações de
              consumo, fica assegurado ao consumidor o direito de propor ação{" "}
              <strong>no foro do seu próprio domicílio</strong>, nos termos do art. 101, I, do CDC.
            </p>

            <h2 className={h2}>10. Contato</h2>
            <p>
              {EMPRESA.nome}<br />
              {EMPRESA.endereco}<br />
              {EMPRESA.telefone} — <strong>{EMPRESA.email}</strong>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

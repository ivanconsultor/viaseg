"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { EMPRESA, ATUALIZADO_EM } from "@/lib/empresa";

export default function Privacidade() {
  const h2 = "text-2xl font-bold text-[#1A1A2E] mt-10 mb-4";
  const ul = "list-disc pl-6 space-y-2";

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto px-4 md:px-6 py-32 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-[#1A1A2E]">Política de Privacidade</h1>

          <div className="prose prose-lg max-w-none space-y-6 text-[#1A1A2E]/80">
            <p><strong>Última atualização:</strong> {ATUALIZADO_EM}</p>

            <p>
              Esta política explica como a <strong>{EMPRESA.nome}</strong> trata seus dados pessoais neste
              site, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
              Ela descreve apenas o que acontece <strong>dentro de {EMPRESA.site}</strong>.
            </p>

            <h2 className={h2}>1. Quem é o controlador</h2>
            <p>
              <strong>{EMPRESA.nome}</strong>, corretor de seguros
              {EMPRESA.susep ? <> registrado na SUSEP sob o nº {EMPRESA.susep},</> : null} atuando
              desde {EMPRESA.atuaDesde}
              {EMPRESA.cnpj ? <> (CNPJ {EMPRESA.cnpj})</> : null}.<br />
              Endereço: {EMPRESA.endereco}.<br />
              Contato do Encarregado de Proteção de Dados: <strong>{EMPRESA.email}</strong>.
            </p>

            <h2 className={h2}>2. Quais dados coletamos</h2>
            <p>Este site coleta pouca coisa. Somente o seguinte:</p>
            <ul className={ul}>
              <li>
                <strong>Formulário de contato:</strong> nome, e-mail, telefone/WhatsApp e a mensagem
                que você escrever. Só é enviado quando você preenche e clica em enviar.
              </li>
              <li>
                <strong>Endereço IP:</strong> registrado de forma temporária e codificada, apenas para
                limitar envios repetidos do formulário e conter tentativas de abuso.
              </li>
              <li>
                <strong>Dados de navegação:</strong> páginas visitadas, origem do acesso, tipo de
                dispositivo e navegador, coletados pelas ferramentas descritas no item 4 —{" "}
                <strong>somente se você aceitar os cookies</strong>.
              </li>
            </ul>
            <p>
              <strong>O que este site não coleta:</strong> não pedimos CPF, data de nascimento, estado
              civil, dados do veículo, dados de imóvel nem qualquer informação de saúde. Não existe
              formulário de cotação neste site.
            </p>

            <h2 className={h2}>3. Cotações: você sai deste site</h2>
            <p>
              Ao clicar em qualquer botão de cotação, você é levado ao ambiente da seguradora parceira,
              como a Porto Seguro. Tudo o que você preencher lá é coletado{" "}
              <strong>pela seguradora, no site dela, sob a política de privacidade dela</strong>. A{" "}
              {EMPRESA.nome} não recebe nem armazena o que você digita nessas páginas.
            </p>

            <h2 className={h2}>4. Ferramentas de medição e publicidade</h2>
            <p>
              Com o seu consentimento, utilizamos as seguintes ferramentas para entender o desempenho
              do site e medir o resultado das campanhas:
            </p>
            <ul className={ul}>
              <li><strong>Google Analytics 4:</strong> estatísticas de audiência e comportamento de navegação.</li>
              <li><strong>Google Ads:</strong> medição de conversões e formação de público para anúncios.</li>
              <li><strong>Meta Pixel (Facebook e Instagram):</strong> medição de conversões e formação de público para anúncios.</li>
              <li><strong>Google Tag Manager:</strong> ferramenta que organiza o disparo das três acima.</li>
            </ul>
            <p>
              Enquanto você não decide, essas ferramentas ficam <strong>bloqueadas</strong>. Nenhuma
              delas registra nada antes do seu aceite. Os detalhes e a forma de mudar sua escolha estão
              na <Link href="/cookies" className="text-[#FF6B00] font-semibold hover:underline">Política de Cookies</Link>.
            </p>

            <h2 className={h2}>5. Por que tratamos cada dado</h2>
            <ul className={ul}>
              <li><strong>Formulário de contato:</strong> para responder e dar andamento ao atendimento — procedimentos preliminares de contrato (art. 7º, V) e legítimo interesse (art. 7º, IX).</li>
              <li><strong>Endereço IP:</strong> segurança e prevenção a abuso — legítimo interesse (art. 7º, IX).</li>
              <li><strong>Medição e publicidade:</strong> exclusivamente <strong>consentimento</strong> (art. 7º, I), que você pode revogar quando quiser.</li>
              <li><strong>Registros obrigatórios:</strong> cumprimento de obrigação legal e regulatória, inclusive da SUSEP (art. 7º, II).</li>
            </ul>

            <h2 className={h2}>6. Com quem compartilhamos</h2>
            <ul className={ul}>
              <li><strong>Seguradoras parceiras:</strong> quando você nos procura para contratar, compartilhamos o necessário para gerar a proposta.</li>
              <li><strong>Google e Meta:</strong> dados de navegação, apenas se você aceitar os cookies.</li>
              <li><strong>Empresa de hospedagem:</strong> que mantém o site no ar e entrega as mensagens do formulário.</li>
            </ul>
            <p>Não vendemos, alugamos nem cedemos seus dados a terceiros com finalidade comercial.</p>

            <h2 className={h2}>7. Transferência internacional</h2>
            <p>
              Google e Meta processam dados em servidores fora do Brasil, inclusive nos Estados Unidos.
              Ao aceitar os cookies, você concorda com essa transferência, feita nos termos do art. 33
              da LGPD e das cláusulas contratuais adotadas por essas empresas.
            </p>

            <h2 className={h2}>8. Por quanto tempo guardamos</h2>
            <ul className={ul}>
              <li><strong>Mensagens do formulário:</strong> durante o atendimento e por até 5 anos depois, prazo que atende a exigências legais e regulatórias.</li>
              <li><strong>Registro de IP:</strong> descartado em até 1 hora.</li>
              <li><strong>Cookies de medição:</strong> conforme o prazo de cada ferramenta, no máximo 2 anos.</li>
            </ul>

            <h2 className={h2}>9. Seus direitos</h2>
            <p>A LGPD garante a você o direito de:</p>
            <ul className={ul}>
              <li>confirmar que existe tratamento e acessar seus dados;</li>
              <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
              <li>pedir anonimização, bloqueio ou eliminação de dados desnecessários ou tratados fora da lei;</li>
              <li><strong>solicitar a portabilidade</strong> dos dados a outro fornecedor;</li>
              <li>pedir a eliminação dos dados tratados com base no seu consentimento;</li>
              <li><strong>saber com quem compartilhamos</strong> seus dados;</li>
              <li>ser informado sobre a possibilidade de não consentir e o que isso acarreta;</li>
              <li><strong>revogar o consentimento</strong> a qualquer momento;</li>
              <li>opor-se a tratamento feito com base em legítimo interesse;</li>
              <li><strong>peticionar à ANPD</strong>, a Autoridade Nacional de Proteção de Dados.</li>
            </ul>
            <p>
              Para exercer qualquer um deles, escreva para <strong>{EMPRESA.email}</strong>. Respondemos
              em até 15 dias.
            </p>

            <h2 className={h2}>10. Segurança</h2>
            <p>
              O site funciona em conexão criptografada (HTTPS) e o formulário conta com validação,
              limite de envios e proteção contra robôs. Nenhum sistema é infalível, mas mantemos medidas
              técnicas compatíveis com o tipo de dado que tratamos.
            </p>

            <h2 className={h2}>11. Mudanças nesta política</h2>
            <p>
              Se esta política mudar, a data no topo será atualizada. Alterações relevantes no uso de
              cookies farão o aviso de consentimento aparecer novamente.
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

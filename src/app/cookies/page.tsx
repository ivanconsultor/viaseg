"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import BotaoGerenciarCookies from "@/components/ui/BotaoGerenciarCookies";
import { EMPRESA, ATUALIZADO_EM } from "@/lib/empresa";

export default function Cookies() {
  const h2 = "text-2xl font-bold text-[#1A1A2E] mt-10 mb-4";
  const td = "border border-slate-200 px-3 py-2 align-top text-sm";

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto px-4 md:px-6 py-32 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-[#1A1A2E]">Política de Cookies</h1>

          <div className="prose prose-lg max-w-none space-y-6 text-[#1A1A2E]/80">
            <p><strong>Última atualização:</strong> {ATUALIZADO_EM}</p>

            <p>
              Cookies são pequenos arquivos que um site guarda no seu dispositivo. Esta política
              explica exatamente quais usamos, para quê, e como você controla cada um.
            </p>

            <h2 className={h2}>1. Nada é ativado sem o seu aceite</h2>
            <p>
              Ao entrar no site pela primeira vez, tudo o que não é essencial fica{" "}
              <strong>bloqueado</strong>. Analytics, publicidade e o Pixel só começam a funcionar
              depois que você clica em &ldquo;Aceitar todos&rdquo;. Se clicar em &ldquo;Recusar&rdquo;,
              eles permanecem desligados e o site continua funcionando normalmente.
            </p>

            <h2 className={h2}>2. O que usamos</h2>

            <h3 className="text-xl font-bold text-[#1A1A2E] mt-6 mb-3">Essenciais — sempre ativos</h3>
            <p>
              Necessários para o site funcionar. Não coletam dados de navegação e não dependem de
              consentimento.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className={td}>Item</th>
                    <th className={td}>Para quê</th>
                    <th className={td}>Duração</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={td}>viaseg_cookie_consent</td>
                    <td className={td}>Guarda a sua escolha, para não perguntarmos de novo a cada visita</td>
                    <td className={td}>Até você limpar o navegador</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-[#1A1A2E] mt-6 mb-3">Estatística — só com seu aceite</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className={td}>Ferramenta</th>
                    <th className={td}>Para quê</th>
                    <th className={td}>Duração</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={td}>Google Analytics 4<br /><span className="text-slate-500">_ga, _ga_*</span></td>
                    <td className={td}>Contar visitas e entender quais páginas são mais úteis</td>
                    <td className={td}>Até 2 anos</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-[#1A1A2E] mt-6 mb-3">Publicidade — só com seu aceite</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className={td}>Ferramenta</th>
                    <th className={td}>Para quê</th>
                    <th className={td}>Duração</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={td}>Google Ads<br /><span className="text-slate-500">_gcl_*</span></td>
                    <td className={td}>Medir conversões e evitar mostrar o mesmo anúncio repetidamente</td>
                    <td className={td}>Até 90 dias</td>
                  </tr>
                  <tr>
                    <td className={td}>Meta Pixel<br /><span className="text-slate-500">_fbp, _fbc</span></td>
                    <td className={td}>Medir resultados de anúncios no Facebook e Instagram</td>
                    <td className={td}>Até 90 dias</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className={h2}>3. Medição pelo servidor</h2>
            <p>
              Parte dessa medição passa por um servidor próprio, no endereço{" "}
              <strong>server.viasegcorretora.com.br</strong>, em vez de ir direto do seu navegador
              para Google e Meta. Isso deixa o site mais rápido e nos dá mais controle sobre o que é
              enviado. <strong>A sua escolha vale igualmente nesse caminho</strong>: se você recusar,
              nada é enviado por ali também.
            </p>

            <h2 className={h2}>4. Mudar de ideia a qualquer momento</h2>
            <p>
              Você pode rever sua escolha quando quiser. É só clicar no botão abaixo — o aviso reaparece
              e você decide de novo.
            </p>
            <div className="not-prose my-6">
              <BotaoGerenciarCookies />
            </div>
            <p>
              Também é possível apagar cookies já gravados pelas configurações do seu navegador
              (Chrome, Safari, Firefox ou Edge), na seção de privacidade. Nesse caso, o site perde a
              memória da sua escolha e vai perguntar novamente na próxima visita.
            </p>

            <h2 className={h2}>5. Dúvidas</h2>
            <p>
              Escreva para <strong>{EMPRESA.email}</strong>. Para entender o tratamento completo dos
              seus dados, veja também a{" "}
              <Link href="/privacidade" className="text-[#FF6B00] font-semibold hover:underline">
                Política de Privacidade
              </Link>.
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

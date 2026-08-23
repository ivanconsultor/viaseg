import Link from "next/link";
import { ShieldCheck, MapPin, Phone, Mail } from "lucide-react";
import { EMPRESA } from "@/lib/empresa";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <img src="/images/Logo2.webp" alt="Logo ViaSeg Corretora" className="h-10 w-auto group-hover:scale-105 transition-transform" />
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                ViaSeg Corretora
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Atuamos em todos os ramos de seguros com excelência e transparência. Sua segurança é o nosso compromisso.
            </p>
            <div className="flex gap-4">
              {/* Facebook */}
              <a href="https://www.facebook.com/corretoraviaseg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#1877F2] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/corretoraviaseg/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#E1306C] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/corretoraviaseg/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#0077B5] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              {/* Reddit */}
              <a href="https://www.reddit.com/user/ViaSeg/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#FF4500] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .883.175 1.195.467 1.21-.868 2.895-1.444 4.75-1.503l.85-3.987a.34.34 0 0 1 .404-.265l2.812.593c.176-.464.623-.8 1.15-.8h.066zM8.347 13.06c-.663 0-1.201.538-1.201 1.201s.538 1.201 1.201 1.201c.662 0 1.201-.538 1.201-1.201s-.539-1.201-1.201-1.201zm7.29 0c-.663 0-1.201.538-1.201 1.201s.538 1.201 1.201 1.201c.662 0 1.201-.538 1.201-1.201s-.539-1.201-1.201-1.201zm-3.618 4.298a.512.512 0 0 1-.362.155.512.512 0 0 1-.362-.155c-.569-.569-1.791-.569-2.36 0a.512.512 0 0 1-.724-.724c.969-.969 3.037-.969 4.006 0a.512.512 0 0 1 0 .724z"/>
                </svg>
              </a>
              {/* X (Twitter) */}
              <a href="https://x.com/corretoraviaseg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-black hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/5521976844444" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#25D366] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Seguros</h4>
            <ul className="space-y-3">
              <li><Link href="/seguros/auto" className="text-gray-400 hover:text-primary transition-colors text-sm">Seguro Auto</Link></li>
              <li><Link href="/seguros/residencial" className="text-gray-400 hover:text-primary transition-colors text-sm">Seguro Residencial</Link></li>
              <li><Link href="/seguros/vida" className="text-gray-400 hover:text-primary transition-colors text-sm">Seguro de Vida</Link></li>
              <li><Link href="/seguros/empresarial" className="text-gray-400 hover:text-primary transition-colors text-sm">Seguro Empresarial</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Institucional</h4>
            <ul className="space-y-3">
              <li><Link href="/sobre" className="text-gray-400 hover:text-primary transition-colors text-sm">Sobre a ViaSeg</Link></li>
              <li><Link href="/#parceiros" className="text-gray-400 hover:text-primary transition-colors text-sm">Nossos Parceiros</Link></li>
              <li><Link href="/fale-conosco" className="text-gray-400 hover:text-primary transition-colors text-sm">Fale Conosco</Link></li>
              <li><Link href="/privacidade" className="text-gray-400 hover:text-primary transition-colors text-sm">Política de Privacidade</Link></li>
              <li><Link href="/termos" className="text-gray-400 hover:text-primary transition-colors text-sm">Termos de Uso</Link></li>
              <li><Link href="/cookies" className="text-gray-400 hover:text-primary transition-colors text-sm">Política de Cookies</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>Rua Dr Othon Machado, 150<br />Sala 406 - Inhaúma, RJ</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="https://wa.me/5521976844444" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  (21) 97684-4444
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:contato@viasegcorretora.com.br" className="hover:text-primary transition-colors">
                  contato@viasegcorretora.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center">
          <p className="text-gray-500 text-sm text-center">
            &copy; 2005&ndash;2026 {EMPRESA.nome}. Todos os direitos reservados.
            {EMPRESA.susep ? (
              <><br />Corretor de seguros registrado na SUSEP sob o n&ordm; {EMPRESA.susep} &mdash; atuando desde {EMPRESA.atuaDesde}.</>
            ) : (
              <><br />Corretor de seguros atuando desde {EMPRESA.atuaDesde}.</>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}

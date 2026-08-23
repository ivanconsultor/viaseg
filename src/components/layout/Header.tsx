"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  lightText?: boolean;
}

export default function Header({ lightText = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "/" },
    { 
      name: "Seguros", 
      href: "/#seguros",
      dropdown: [
        { name: "Seguro Auto", href: "/seguros/auto" },
        { name: "Seguro Residencial", href: "/seguros/residencial" },
        { name: "Seguro de Vida", href: "/seguros/vida" },
        { name: "Seguro Empresarial", href: "/seguros/empresarial" }
      ]
    },
    { name: "Sobre", href: "/sobre" },
    { name: "Parceiros", href: "/parceiros" },
    { name: "Fale Conosco", href: "/fale-conosco" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-3"
          : "bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100/50"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/images/Logo2.webp" alt="Logo ViaSeg Corretora" className="h-10 w-auto group-hover:scale-105 transition-transform" />
          <span className="font-heading font-bold text-2xl tracking-tight text-[#1A1A2E] group-hover:text-[#FF6B00] transition-colors">
            ViaSeg Corretora
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                {link.dropdown ? (
                  <>
                    <button className="flex items-center gap-1 text-sm font-semibold text-[#1A1A2E] hover:text-[#FF6B00] transition-colors py-2">
                      {link.name}
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 text-slate-500" />
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white shadow-xl rounded-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                      <div className="py-2">
                        {link.dropdown.map((drop) => (
                          <Link
                            key={drop.name}
                            href={drop.href}
                            className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-[#FF6B00] hover:bg-slate-50 transition-colors"
                          >
                            {drop.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-[#1A1A2E] hover:text-[#FF6B00] transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <Link
            href="/cotacao"
            className="bg-[#FF6B00] hover:bg-[#e05e00] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Cotar Agora
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#1A1A2E] hover:bg-slate-100"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-4 shadow-xl">
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.dropdown ? (
                  <div className="space-y-2">
                    <span className="block text-sm font-bold text-[#1A1A2E] px-2">
                      {link.name}
                    </span>
                    <ul className="pl-4 space-y-2 border-l-2 border-[#FF6B00]/30">
                      {link.dropdown.map((drop) => (
                        <li key={drop.name}>
                          <Link
                            href={drop.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-sm text-slate-700 hover:text-[#FF6B00] py-1 font-medium"
                          >
                            {drop.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-bold text-[#1A1A2E] hover:text-[#FF6B00] px-2 py-1"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/cotacao"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center bg-[#FF6B00] hover:bg-[#e05e00] text-white px-5 py-3 rounded-xl font-bold text-sm w-full shadow-md"
          >
            Cotar Agora
          </Link>
        </div>
      )}
    </header>
  );
}

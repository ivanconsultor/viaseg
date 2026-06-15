"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShieldCheck, ChevronDown } from "lucide-react";
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
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/images/Logo2.webp" alt="Logo ViaSeg Corretora" className="h-10 w-auto group-hover:scale-105 transition-transform" />
          <span className={cn(
            "font-heading font-bold text-2xl tracking-tight transition-colors",
            !isScrolled && lightText ? "text-white" : "text-foreground"
          )}>
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
                    <button className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-colors py-2",
                      !isScrolled && lightText ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary"
                    )}>
                      {link.name}
                      <ChevronDown size={14} className={cn("group-hover:rotate-180 transition-transform duration-300", !isScrolled && lightText ? "text-white/70" : "")} />
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                      <div className="py-2">
                        {link.dropdown.map((drop) => (
                          <Link
                            key={drop.name}
                            href={drop.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
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
                    className={cn(
                      "text-sm font-medium transition-colors",
                      !isScrolled && lightText ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          <Link
            href="/cotacao"
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,0,0.23)] hover:-translate-y-0.5"
          >
            Cotar Agora
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden transition-colors",
            !isScrolled && lightText ? "text-white" : "text-foreground"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name} className="flex flex-col">
                <Link
                  href={link.href}
                  className="block text-lg font-medium text-foreground/80 hover:text-primary py-2"
                  onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <ul className="pl-4 mt-2 flex flex-col gap-3 border-l-2 border-gray-100">
                    {link.dropdown.map(drop => (
                      <li key={drop.name}>
                        <Link
                          href={drop.href}
                          className="block text-base text-gray-500 hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {drop.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/cotacao"
            className="bg-primary text-white text-center px-6 py-3 rounded-xl font-medium mt-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Cotar Agora
          </Link>
        </div>
      )}
    </header>
  );
}

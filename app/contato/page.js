"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Linkedin,
  Github,
  Download,
  ArrowUpRight,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";

const ContactItem = ({ href, icon, text, onClick, isCopy = false }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!isCopy || !onClick) return;
    onClick();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); 
  };

  const ItemContent = () => (
    <div
      className="w-full flex items-center justify-between my-4 text-white/90 font-semibold p-4 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 cursor-pointer"
      onClick={handleCopy}
    >
      <div className="flex items-center gap-4">
        {icon}
        <span>{text}</span>
      </div>
      {isCopy ? (
        isCopied ? <Check size={20} /> : <Copy size={20} />
      ) : (
        <ArrowUpRight size={20} />
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <ItemContent />
      </a>
    );
  }

  return <ItemContent />;
};

export default function Contato() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Copiado para a área de transferência!");
    });
  };

  const contactLinks = [
    {
      href: "https://www.linkedin.com/in/bruno-aseff/",
      icon: <Linkedin size={24} />,
      text: "LinkedIn",
    },
    {
      href: "https://github.com/BrunoAseff",
      icon: <Github size={24} />,
      text: "GitHub",
    },
  ];

  const contactInfo = [
    {
      onClick: () => copyToClipboard("brunoaseff2@gmail.com"),
      icon: <Mail size={24} />,
      text: "brunoaseff2@gmail.com",
      isCopy: true,
    },
    {
      onClick: () => copyToClipboard("(47) 991031009"),
      icon: <Phone size={24} />,
      text: "(47) 99103-1009",
      isCopy: true,
    },
  ];

  const actions = [
     {
      href: "https://wa.me/5547991031009",
      icon: <MessageSquare size={24} />,
      text: "Chamar no WhatsApp",
    },
    {
      href: "/curriculo.pdf",
      icon: <Download size={24} />,
      text: "Baixar Currículo",
    },
  ]

  return (
    <div className="w-full h-screen flex mt-20 md:mt-16 items-center justify-center p-4 font-sans text-white">
      <div

        className="w-full max-w-md bg-black/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-8"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white text-center">Contato</h1>
          <p className="text-white/60 text-center mt-2">
            Entre em contato ou conecte-se comigo pelas redes.
          </p>
        </header>

        <main className="space-y-4">
          {contactLinks.map((item) => <ContactItem key={item.text} {...item} />)}
          
          
          {contactInfo.map((item) => <ContactItem key={item.text} {...item} />)}
          

          {actions.map((item) => <ContactItem key={item.text} {...item} />)}
        </main>
      </div>
    </div>
  );
}
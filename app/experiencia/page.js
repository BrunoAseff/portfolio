"use client";

import React, { useState, useMemo } from "react";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  CheckCircle,
  Award,
  Link as LinkIcon,
} from "lucide-react";

const professionalExperience = [
  {
    role: "Desenvolvedor Fullstack",
    company: "Access Global Logistics",
    period: "Fev 2025 - Presente",
    location: "Itajaí, SC",
    description:
      "Atuo no desenvolvimento de soluções internas e automações usando tecnologias modernas. Participo desde o backend até o frontend, com forte foco em otimizações cloud (AWS), inteligência artificial e scraping de dados.",
    highlights: [
      "Criação de funcionalidades para o portal interno da empresa.",
      "Desenvolvimento de rotas backend com Node.js, TypeScript e Adonis.",
      "Implementação de interfaces no frontend usando Vue.js.",
      "Web scraping e automações com Python e IA.",
      "Otimizações de performance e soluções utilizando serviços da AWS.",
    ],
  },
];

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Emitido em 29/06/2025",
    credentialUrl: "/aws.pdf",
    skills: [
      "Conceitos de Nuvem",
      "AWS",
      "Responsabilidade Compartilhada",
      "Modelos de Preço",
    ],
  },
  {
    name: "Web Security v2",
    issuer: "Frontend Masters",
    date: "Emitido em 15/08/2025",
    credentialUrl: "/web-security-v2.pdf",
    skills: ["Segurança", "CSRF", "XSS", "Cors", "Cookies e JWT"],
  },
  {
    name: "Bases Numéricas",
    issuer: "Curso em Vídeo",
    date: "Emitido em 03/09/2024",
    credentialUrl:
      "https://www.linkedin.com/in/bruno-aseff/details/certifications/1728333429207/single-media-viewer/?type=DOCUMENT&profileId=ACoAADSgZsgBmJ1zfWrk5RJbJD7u5DnJPpqQ1PE",
    skills: [
      "Sistemas Numéricos",
      "Conversões",
      "Matemática Base para Programação",
    ],
  },
  {
    name: "MySQL",
    issuer: "Curso em Vídeo",
    date: "Emitido em 03/09/2024",
    credentialUrl:
      "https://www.linkedin.com/in/bruno-aseff/details/certifications/1728333326902/single-media-viewer/?type=DOCUMENT&profileId=ACoAADSgZsgBmJ1zfWrk5RJbJD7u5DnJPpqQ1PE",
    skills: [
      "SQL",
      "MySQL",
      "Modelagem de Dados",
      "CRUD",
      "Consultas Relacionais",
    ],
  },
  {
    name: "Aprofundando em Hooks",
    issuer: "Rocketseat",
    date: "Emitido em 09/09/2024",
    credentialUrl:
      "https://app.rocketseat.com.br/certificates/52909b77-b4f5-4a4a-b143-da026f3d853a",
    skills: [
      "React Hooks",
      "Context API",
      "Reducers",
      "immer",
      "CSS-in-JS",
      "Formulários",
    ],
  },
  {
    name: "NLW Pocket: Javascript - Full-stack Intermediário",
    issuer: "Rocketseat",
    date: "Emitido em 13/09/2024",
    credentialUrl:
      "https://app.rocketseat.com.br/certificates/2ea9d57f-a91c-4a4c-883c-84d10ef7a84a",
    skills: [
      "Node.js",
      "Fastify",
      "DrizzleORM",
      "PostgreSQL",
      "Docker",
      "Zod",
      "ReactJS",
      "TanStack Query",
      "TypeScript",
      "TailwindCSS",
    ],
  },
  {
    name: "Fundamentos do React",
    issuer: "Rocketseat",
    date: "Emitido em 28/07/2024",
    credentialUrl:
      "https://app.rocketseat.com.br/certificates/d0f26c92-ccfa-4bc4-b0ab-ae10f523dd61",
    skills: ["React", "Hooks", "Componentes", "Estados", "Props", "TypeScript"],
  },
];

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-xl ${className}`}
  >
    {children}
  </div>
);

const SectionToggle = ({ activeView, setActiveView }) => (
  <div className="md:bg-white/10 md:backdrop-blur-lg md:border md:border-white/20 md:shadow-lg rounded-2xl p-2 mb-6">
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => setActiveView("experience")}
        className={`w-full text-center px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          activeView === "experience"
            ? "bg-white/30 text-white shadow-md"
            : "text-white/70 hover:bg-white/10"
        }`}
      >
        <Briefcase size={20} />
        Experiência
      </button>
      <button
        onClick={() => setActiveView("certifications")}
        className={`w-full text-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          activeView === "certifications"
            ? "bg-white/30 text-white shadow-md"
            : "text-white/70 hover:bg-white/10"
        }`}
      >
        <GraduationCap size={20} />
        Certificações
      </button>
    </div>
  </div>
);

const ExperienceCard = ({ experience }) => (
  <GlassCard className="mb-6 ">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-shrink-0 flex justify-center items-center w-16 h-16 bg-white/20 rounded-xl border border-white/30">
        <Briefcase className="text-white" size={32} />
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-white">{experience.role}</h3>
        <p className="text-lg font-semibold text-white/80">
          {experience.company}
        </p>
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-white/60 text-sm mt-1 mb-3">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{experience.period}</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span>{experience.location}</span>
        </div>
        <p className="text-white/90 mb-4">{experience.description}</p>
        <ul className="space-y-2">
          {experience.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle
                size={20}
                className="text-green-300 flex-shrink-0 mt-1"
              />
              <span className="text-white/80">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </GlassCard>
);

const CertificationCard = ({ certification }) => (
  <GlassCard className="mb-6">
    <div className="flex flex-col sm:flex-row items-start gap-6">
      <div className="flex-shrink-0 flex justify-center items-center w-16 h-16 bg-white/20 rounded-xl border border-white/30">
        <Award className="text-white" size={32} />
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-white">{certification.name}</h3>
        <p className="text-md font-semibold text-white/80">
          Emitido por: {certification.issuer}
        </p>
        <p className="text-sm text-white/60 mb-4">{certification.date}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {certification.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full border border-white/20"
            >
              {skill}
            </span>
          ))}
        </div>
        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sky-300 hover:text-sky-200 font-semibold transition-colors duration-300"
        >
          <LinkIcon size={16} />
          Ver Credencial
        </a>
      </div>
    </div>
  </GlassCard>
);

export default function ExperiencePage() {
  const [activeView, setActiveView] = useState("experience");

  const content = useMemo(() => {
    if (activeView === "experience") {
      return professionalExperience.map((exp, index) => (
        <ExperienceCard key={index} experience={exp} />
      ));
    }
    return certifications.map((cert, index) => (
      <CertificationCard key={index} certification={cert} />
    ));
  }, [activeView]);

  return (
    <div className="w-full h-full flex items-center mt-4 md:mt-0 justify-center p-4 md:p-6 text-white font-sans">
      <div className="bg-black/10 backdrop-blur-[100px] border border-white/20 shadow-2xl rounded-2xl w-full max-w-5xl mt-24 h-[80vh] flex flex-col p-4 sm:p-6">
        <div className="flex-shrink-0">
          <SectionToggle
            activeView={activeView}
            setActiveView={setActiveView}
          />
        </div>

        <main className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar pr-3">
          {content}
        </main>
      </div>
    </div>
  );
}

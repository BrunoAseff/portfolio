import type { Experience } from "./types";
export const experiences = [
  {
    id: "bussola",
    name: "Bússola Social · Wiidoo Labs",
    start: "2025-11-18",
    end: null,
    content: {
      pt: {
        period: "Nov. 2025 — atual",
        paragraphs: [
          "Desenvolvo e evoluo aplicações web para organizações sociais, cooperativas e instituições, criando interfaces, APIs e integrações. Participo das decisões técnicas e da definição das soluções, tanto em novos sistemas quanto na evolução de aplicações existentes.",
          "Também construo agentes e automações com IA, documento processos e aprimoro pipelines de CI/CD com Jenkins e ambientes de execução.",
        ],
      },
      en: {
        period: "Nov 2025 — present",
        paragraphs: [
          "I develop and improve web applications for social organisations, cooperatives and institutions, building interfaces, APIs and integrations. I contribute to technical decisions and solution design, both for new systems and for the evolution of existing applications.",
          "I also build AI agents and automations, document processes, and improve CI/CD pipelines with Jenkins and runtime environments.",
        ],
      },
    },
  },
  {
    id: "access",
    name: "Access Global Logistics",
    start: "2025-02-03",
    end: "2025-11-18",
    content: {
      pt: {
        period: "Fev. 2025 — Nov. 2025",
        paragraphs: [
          "Desenvolvi um sistema interno para gestão de informações financeiras, cadastrais e de funcionários em uma empresa de agenciamento de cargas.",
          "Criei automações de pesquisas de satisfação, com envio de e-mails, dashboards e ações baseadas nas respostas. Também desenvolvi um assistente com IA para atendimento via WhatsApp e rotinas de extração, atualização e análise de dados, utilizando scraping, OCR e IA.",
        ],
      },
      en: {
        period: "Feb 2025 — Nov 2025",
        paragraphs: [
          "I developed an internal system for financial, company and employee information at a freight forwarding company.",
          "I built satisfaction survey automations with email delivery, dashboards and actions based on responses. I also developed an AI assistant for customer service through WhatsApp and data extraction, update and analysis workflows using scraping, OCR and AI.",
        ],
      },
    },
  },
] satisfies Experience[];

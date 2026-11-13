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
          "Desenvolvo interfaces, APIs e integrações para organizações sociais, cooperativas e instituições, participando das decisões técnicas em sistemas novos e existentes.",
          "Também construo agentes e automações com IA, documento processos e aprimoro pipelines de CI/CD com Jenkins e ambientes de execução.",
        ],
      },
      en: {
        period: "Nov 2025 — present",
        paragraphs: [
          "I build interfaces, APIs and integrations for social organisations, cooperatives and institutions, contributing to technical decisions for new and existing systems.",
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
          "Desenvolvi um sistema interno de gestão financeira, cadastral e de funcionários para uma empresa de agenciamento de cargas.",
          "Criei pesquisas de satisfação com e-mails e dashboards, um assistente com IA para WhatsApp e rotinas de dados com scraping, OCR e IA.",
        ],
      },
      en: {
        period: "Feb 2025 — Nov 2025",
        paragraphs: [
          "I built an internal system for financial, company and employee information at a freight forwarding company.",
          "I created satisfaction surveys with emails, dashboards and actions based on responses, an AI assistant for WhatsApp, and data workflows using scraping, OCR and AI.",
        ],
      },
    },
  },
] satisfies Experience[];

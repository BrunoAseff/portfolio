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
          "Desenvolvo sistemas, interfaces, APIs e integrações para organizações sociais, cooperativas e instituições. Participo das decisões técnicas de sistemas novos e existentes.",
        ],
        topics: [
          {
            title: "IA e automações",
            text: "Construo agentes e automações com IA integrados a aplicações.",
          },
          {
            title: "Processos e infraestrutura",
            text: "Documento processos e aprimoro pipelines de CI/CD com Jenkins e ambientes de execução.",
          },
        ],
      },
      en: {
        period: "Nov 2025 — present",
        paragraphs: [
          "I build systems, interfaces, APIs and integrations for social organisations, cooperatives and institutions. I contribute to technical decisions for new and existing systems.",
        ],
        topics: [
          {
            title: "AI and automation",
            text: "I build AI agents and automations integrated into applications.",
          },
          {
            title: "Processes and infrastructure",
            text: "I document processes and improve CI/CD pipelines with Jenkins and runtime environments.",
          },
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
          "Desenvolvi o sistema interno da empresa de agenciamento de cargas, com dados financeiros, cadastros e informações de funcionários.",
        ],
        topics: [
          {
            title: "Automações e integrações",
            text: "Automatizei o envio de pesquisas de satisfação por e-mail e ações a partir das respostas, com criação de demandas, revisão de problemas e dashboards. Também criei rotinas de dados com scraping e OCR.",
          },
          {
            title: "Aplicações com IA integrada",
            text: "Desenvolvi um assistente para atendimento via WhatsApp e rotinas de transcrição e análise de chamadas com IA.",
          },
        ],
      },
      en: {
        period: "Feb 2025 — Nov 2025",
        paragraphs: [
          "I developed the freight forwarding company’s internal system, covering financial data, company records and employee information.",
        ],
        topics: [
          {
            title: "Automation and integrations",
            text: "I automated satisfaction survey emails and response-based workflows, including task creation, issue review and dashboards. I also built data workflows using scraping and OCR.",
          },
          {
            title: "Applications with integrated AI",
            text: "I developed a customer service assistant for WhatsApp and AI-powered call transcription and analysis workflows.",
          },
        ],
      },
    },
  },
] satisfies Experience[];

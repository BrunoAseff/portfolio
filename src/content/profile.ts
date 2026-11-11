import type { Localized, ProfileContent } from "./types";
export const profile = {
  pt: {
    role: "Engenheiro de software fullstack",
    intro:
      "Construo aplicações e participo das decisões que transformam uma necessidade em uma solução, com atenção às interfaces e à experiência de quem usa.",
    location: "Itajaí, SC — Brasil",
    deliveries: [
      ["Aplicações web", "Desenvolvi aplicações completas, das interfaces às APIs e integrações."],
      [
        "Aplicações com IA integrada",
        "Criei assistentes conversacionais e agentes com IA integrados a aplicações, além de rotinas de transcrição e análise de chamadas.",
      ],
      [
        "Automações e integrações",
        "Automatizei rotinas e conectei sistemas, com extração e atualização de dados usando scraping e OCR.",
      ],
    ],
  },
  en: {
    role: "Fullstack software engineer",
    intro:
      "I build applications and help make the decisions that turn a need into a working solution, with care for interfaces and the people using them.",
    location: "Itajaí, SC — Brazil",
    deliveries: [
      [
        "Web applications",
        "I built complete applications, from interfaces to APIs and integrations.",
      ],
      [
        "Applications with integrated AI",
        "I built conversational assistants and AI agents integrated into applications, as well as call transcription and analysis workflows.",
      ],
      [
        "Automation and integrations",
        "I automated routines and connected systems, extracting and updating data with scraping and OCR.",
      ],
    ],
  },
} satisfies Localized<ProfileContent>;
export const technologies = [
  "TypeScript",
  "React",
  "Vue.js",
  "PHP",
  "Laravel",
  "Go",
  "Docker",
  "Linux",
] as const;

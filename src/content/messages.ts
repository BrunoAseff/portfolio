import type { Localized, SectionId } from "./types";
type Messages = {
  resume: string;
  email: string;
  skip: string;
  language: string;
  navigation: string;
  soundOn: string;
  soundOff: string;
  resumePending: string;
  dismiss: string;
  visit: string;
  code: string;
  coursesHeading: string;
  lastCommit: string;
  viewGithub: string;
  back: string;
  technologiesHeading: string;
  activityUnavailable: string;
  copyError: string;
  description: string;
  sections: { id: SectionId; name: string }[];
};
export const messages = {
  pt: {
    resume: "Currículo",
    email: "E-mail",
    skip: "Pular para o conteúdo",
    language: "Idioma",
    navigation: "Seções do portfólio",
    soundOn: "Ativar sons",
    soundOff: "Desativar sons",
    resumePending: "Currículo em atualização.",
    dismiss: "Fechar aviso",
    visit: "Acessar projeto",
    code: "Ver código",
    coursesHeading: "Certificações e cursos",
    lastCommit: "Último commit",
    viewGithub: "Ver atividade no GitHub",
    back: "Voltar ao início",
    technologiesHeading: "Tecnologias que utilizo",
    activityUnavailable: "Atividade pública indisponível agora.",
    copyError: "Não foi possível copiar. Selecione o endereço de e-mail.",
    description:
      "Construo aplicações e participo das decisões que transformam uma necessidade em uma solução, com atenção às interfaces e à experiência de quem usa.",
    sections: [
      {
        id: "conhecimentos",
        name: "O que já desenvolvi",
      },
      {
        id: "experiencia",
        name: "Experiência",
      },
      {
        id: "projetos",
        name: "Projetos",
      },
      {
        id: "formacao",
        name: "Formação",
      },
      {
        id: "contato",
        name: "Contato",
      },
    ],
  },
  en: {
    resume: "Résumé",
    email: "Email",
    skip: "Skip to content",
    language: "Language",
    navigation: "Portfolio sections",
    soundOn: "Enable sounds",
    soundOff: "Disable sounds",
    resumePending: "Résumé being updated.",
    dismiss: "Dismiss notice",
    visit: "Visit project",
    code: "View code",
    coursesHeading: "Certifications and courses",
    lastCommit: "Latest commit",
    viewGithub: "View activity on GitHub",
    back: "Back to top",
    technologiesHeading: "Technologies I use",
    activityUnavailable: "Public activity is currently unavailable.",
    copyError: "Could not copy. Select the email address.",
    description:
      "I build applications and help make the decisions that turn a need into a working solution, with care for interfaces and the people using them.",
    sections: [
      {
        id: "conhecimentos",
        name: "What I’ve built",
      },
      {
        id: "experiencia",
        name: "Experience",
      },
      {
        id: "projetos",
        name: "Projects",
      },
      {
        id: "formacao",
        name: "Education",
      },
      {
        id: "contato",
        name: "Contact",
      },
    ],
  },
} satisfies Localized<Messages>;

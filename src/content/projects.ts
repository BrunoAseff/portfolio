import type { Project } from "./types";
export const projects = [
  {
    id: "lazuli",
    name: "Lazúli",
    links: {
      website: "https://lazuli.brunoaseff.com.br/",
      repository: "https://github.com/BrunoAseff/lazuli",
    },
    content: {
      pt: {
        pitch:
          "Plataforma de estudos com documentos, flashcards e quizzes, combinando recuperação ativa e revisão espaçada.",
        paragraphs: [
          "Desenvolvi a aplicação fullstack, da edição de conteúdo e processamento de arquivos à criação de exercícios com IA e ao acompanhamento do estudo. O conteúdo gerado por IA pode ser revisado antes de entrar na prática.",
        ],
      },
      en: {
        pitch:
          "A study platform with documents, flashcards and quizzes, combining active recall and spaced repetition.",
        paragraphs: [
          "I developed the fullstack application, from content editing and file processing to AI-generated exercises and study progress tracking. AI-generated content can be reviewed before being added to a study session.",
        ],
      },
    },
  },
  {
    id: "nova",
    name: "Nova",
    links: {
      website: "https://nova-pied-omega.vercel.app",
      repository: "https://github.com/BrunoAseff/nova",
    },
    content: {
      pt: {
        pitch:
          "Plataforma de foco e relaxamento que permite criar ambientes personalizados, combinando sons, sessões de Pomodoro e exercícios de respiração para acompanhar momentos de concentração e pausa.",
        paragraphs: [],
      },
      en: {
        pitch:
          "A focus and relaxation platform for creating personalised environments, combining sounds, Pomodoro sessions and breathing exercises for moments of concentration and rest.",
        paragraphs: [],
      },
    },
  },
  {
    id: "bolhas",
    name: "Bolhas",
    links: {
      website: "https://bolhas.org",
      repository: "https://github.com/Bolhas-na-mao/bolhas.org",
    },
    content: {
      pt: {
        paragraphs: [
          "Laboratório de experiências interativas para explorar conceitos de matemática, computação e simulação, transformando ideias abstratas em experiências que podem ser observadas e manipuladas no navegador.",
        ],
      },
      en: {
        paragraphs: [
          "A lab of interactive experiments exploring mathematics, computing and simulation, turning abstract ideas into experiences people can observe and manipulate in the browser.",
        ],
      },
    },
  },
  {
    id: "eye-patch",
    name: "Eye Patch",
    links: {
      repository: "https://github.com/BrunoAseff/eye-patch",
    },
    content: {
      pt: {
        paragraphs: [
          "Ferramenta de monitoramento de disponibilidade de aplicações web, com verificações periódicas e alertas por e-mail. Utiliza AWS Lambda para executar as verificações e AWS CDK para definir a infraestrutura como código.",
        ],
      },
      en: {
        paragraphs: [
          "A web application availability monitoring tool with periodic checks and email alerts. It uses AWS Lambda to run checks and AWS CDK to define infrastructure as code.",
        ],
      },
    },
  },
] satisfies Project[];

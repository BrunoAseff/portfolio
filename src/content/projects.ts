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
        paragraphs: [
          "Plataforma de estudos que reúne documentos, flashcards e quizzes, conectando a organização dos materiais à prática de recuperação ativa e às revisões espaçadas. A IA auxilia na criação e no aprimoramento dos conteúdos, que podem ser revisados antes de entrar no estudo.",
          "Construí uma aplicação fullstack que integra edição de conteúdo, processamento de arquivos e IA ao ciclo de estudo, com agendamento de revisões e acompanhamento de resultados.",
        ],
      },
      en: {
        paragraphs: [
          "A study platform bringing documents, flashcards and quizzes together, connecting study materials with active recall and spaced reviews. AI helps create and refine content, which can be reviewed before being added to a study session.",
          "I built a fullstack application connecting content editing, file processing and AI with the study cycle, including review scheduling and progress tracking.",
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
        paragraphs: [
          "Plataforma de foco e relaxamento que permite criar ambientes personalizados, combinando sons, sessões de Pomodoro e exercícios de respiração para acompanhar momentos de concentração e pausa.",
        ],
      },
      en: {
        paragraphs: [
          "A focus and relaxation platform for creating personalised environments, combining sounds, Pomodoro sessions and breathing exercises for moments of concentration and rest.",
        ],
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

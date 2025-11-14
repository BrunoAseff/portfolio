import { projectsEn } from "./projects-en";

export const getProjects = (locale = "pt") => {
  return locale === "en" ? projectsEn : projects;
};

export const projects = [
  {
    title: "Nova",
    shortDescription: "Plataforma para ajudar no foco e relaxamento.",
    longDescription: "Plataforma para ajudar no foco e relaxamento.",
    features: [
      "Múltiplos espaços totalmente personalizáveis",
      "Criação de contas com fluxo de e-mails",
      "Sons ambientes",
      "Lembretes personalizáveis",
      "Imagem de fundo personalizada",
      "Pomodoro com tempo, sons e comportamento personalizáveis",
      "Temas de cores diferentes",
      "Diferentes exercícios de respiração",
    ],

    gitHubLink: "https://github.com/BrunoAseff/nova",
    webLink: "https://www.novaspaces.io/spaces",
    technologies: [
      "/svgs/nextjs.svg",
      "/svgs/react.svg",
      "/svgs/typescript.svg",
      "/svgs/git.svg",
      "/svgs/prisma.svg",
      "/svgs/postgresql.svg",
      "/svgs/Vercel_light.svg",
      "/svgs/zod.svg",
      "/svgs/tailwindcss.svg",
    ],
    images: [
      "/nova1.webp",
      "/nova2.webp",
      "/nova3.webp",
      "/nova4.webp",
      "/nova5.webp",
      "/nova6.webp",
    ],
    imagesAlt: [
      "Pomodoro",
      "Exercícios de respiração",
      "Imagens de fundo",
      "Perfil do usuário",
      "Temas personalizados",
      "Lembretes",
    ],
  },

  {
    title: "Eye Patch",
    shortDescription:
      "Monitoramento pessoal de uptime e segurança para aplicações web.",
    longDescription:
      "Eye Patch é uma ferramenta pessoal para monitorar a saúde de aplicações web. A cada 15 minutos, verifica se os serviços estão online e dispara alertas por e-mail se houver falhas. Todo o fluxo roda em cima de serviços serverless da AWS e é definido via infraestrutura como código com CDK.",
    features: [
      "Verificação periódica de serviços com AWS Lambda",
      "Agendamento com EventBridge",
      "Envio de alertas por e-mail com SNS",
      "Configuração e deploy via AWS CDK",
    ],

    gitHubLink: "https://github.com/BrunoAseff/eye-patch",
    technologies: ["/svgs/typescript.svg", "/svgs/nodejs.svg", "/svgs/git.svg"],
    images: ["/eyepatch.webp"],
    imagesAlt: ["Diagrama de serviços da AWS"],
  },

  {
    title: "Theatre Updates",
    shortDescription:
      "Sistema automatizado de notificações sobre atualizações nos cinemas locais.",
    longDescription:
      "Sistema que monitora e notifica por email sobre novos filmes e alterações na programação dos cinemas do Balneário Shopping e Shopping Itajaí, utilizando web scraping e automação.",
    features: [
      "Web scraping com Puppeteer",
      "Emails responsivos com React Email",
      "Automação com GitHub Actions",
      "Armazenamento em Gist",
      "Notificações automáticas semanais",
      "Indicador visual de novos filmes",
    ],
    gitHubLink: "https://github.com/BrunoAseff/theatre-updates",
    technologies: [
      "/svgs/typescript.svg",
      "/svgs/react.svg",
      "/svgs/git.svg",
      "/svgs/nodejs.svg",
      "/svgs/resend.svg",
    ],
    images: ["/theatre-updates.webp"],
    imagesAlt: ["Email de atualização dos filmes"],
  },

  {
    title: "RPG no Terminal",
    shortDescription:
      "Um jogo de RPG desenvolvido em C++ para rodar no terminal, criado como parte do curso de graduação.",
    longDescription:
      "Um jogo de RPG desenvolvido em C++ para rodar no terminal, criado como parte do curso de graduação.",
    CTA: "Ver no onlineGBD",
    features: [
      "RPG baseado em texto no terminal",
      "Desenvolvido em C++",
      "Jogabilidade simples e direta",
    ],

    gitHubLink: "https://www.onlinegdb.com/YCYpLmmMM",
    technologies: ["/svgs/cpp.svg"],
    images: ["/rpg.webp"],
    imagesAlt: ["RPG no terminal"],
    ExternalLink: "OnlineGDB",
  },
];

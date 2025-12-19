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
    webLink: "https://nova-pied-omega.vercel.app",
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
    title: "Simulador de Ecossistema",
    shortDescription:
      "Um jogo de simulação onde você gerencia um ecossistema com grama, coelhos e raposas.",
    longDescription:
      "Um jogo de simulação onde você gerencia um ecossistema com grama, coelhos e raposas.",
    features: [
      "Simulação de ecossistema em tempo real",
      "Gestão de população de coelhos e raposas",
      "Sistema de crescimento de grama",
      "Visualização interativa do ecossistema",
    ],
    gitHubLink: "https://github.com/Bolhas-na-mao/ecosystem-simulator",
    webLink: "https://ecosystem.bolhas.org",
    technologies: ["/svgs/cpp.svg"],
    images: ["/ecosystem.png"],
    imagesAlt: ["Simulador de Ecossistema"],
  },

  {
    title: "Jogo da vida",
    shortDescription: "Conway's Game of Life no browser feito com PixiJS.",
    longDescription: "Conway's Game of Life no browser feito com PixiJS.",
    features: [
      "Implementação completa do Game of Life",
      "Interface interativa no browser",
      "Renderização otimizada com PixiJS",
      "Controles de play/pause e reset",
    ],
    gitHubLink: "https://github.com/Bolhas-na-mao/game-of-life",
    webLink: "https://gameoflife.bolhas.org",
    technologies: ["/svgs/typescript.svg"],
    images: ["/gameoflife.png"],
    imagesAlt: ["Jogo da vida"],
  },

  {
    title: "bolhas.org",
    shortDescription:
      "Bolhas na Mão é um laboratório de projetos educacionais interativos sobre algoritmos, matemática e computação.",
    longDescription:
      "Bolhas na Mão é um laboratório de projetos educacionais interativos sobre algoritmos, matemática e computação.",
    features: [
      "Projetos educacionais interativos",
      "Conteúdo sobre algoritmos e matemática",
      "Interface educativa e acessível",
      "Recursos de aprendizado interativo",
    ],
    gitHubLink: "https://github.com/Bolhas-na-mao/bolhas.org",
    webLink: "https://bolhas.org",
    technologies: ["/svgs/typescript.svg"],
    images: ["/bolhas.png"],
    imagesAlt: ["Bolhas na Mão"],
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
    CTA: "Ver no onlineGDB",
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

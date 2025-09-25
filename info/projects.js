import { projectsEn } from './projects-en';

export const getProjects = (locale = 'pt') => {
  return locale === 'en' ? projectsEn : projects;
};

export const projects = [
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
    title: "Forms Creator",
    shortDescription: "Uma ferramenta de criação de formulários intuitiva.",
    longDescription:
      "Ferramenta simples e eficiente para criar, gerenciar e compartilhar formulários de forma rápida e prática, sem complicação.",
    features: [
      "Criação e personalização de formulários com drag-and-drop",
      "Gerenciamento de múltiplos formulários",
      "Compartilhamento de links para respostas",
      "Visualização e organização das respostas",
      "Modo claro e escuro",
    ],

    gitHubLink: "https://github.com/BrunoAseff/menuscore",
    webLink: "https://forms-creator.vercel.app",
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
      "/forms_1.webp",
      "/forms_2.webp",
      "/forms_3.webp",
      "/forms_4.webp",
      "/forms_5.webp",
      "/forms_6.webp",
    ],
    imagesAlt: [
      "Dashboard",
      "Editor do formulário",
      "Tela de respostas e dados",
      "Tela de formulário criado",
      "Configurações da conta",
      "Tema branco",
    ],
  },

  {
    title: "Guia Quântico",
    shortDescription:
      "Um curso para explicar física quântica de uma maneira prática e acessível.",
    longDescription:
      "Um site que oferece um curso de física quântica com explicações claras e acessíveis para quem quer entender os conceitos de maneira prática.",
    features: [
      "Animações interativas com anime.js",
      "Autenticação de usuários",
      "Envio de emails com confirmação de conta e recuperação de senha",
      "Progresso de curso controlado",
    ],
    technologies: [
      "/svgs/nextjs.svg",
      "/svgs/react.svg",
      "svgs/typescript.svg",
      "/svgs/git.svg",
      "/svgs/supabase.svg",
      "/svgs/javascript.svg",
      "/svgs/postgresql.svg",
      "/svgs/Vercel_light.svg",
      "/svgs/tailwindcss.svg",
      "/svgs/radix.svg",
      "/svgs/resend.svg",
    ],

    gitHubLink: "https://github.com/BrunoAseff/quantum-guide",
    webLink: "https://guiaquantico.com.br",

    images: [
      "/quantum1.webp",
      "/quantum2.webp",
      "/quantum3.webp",
      "/quantum4.webp",
      "/quantum5.webp",
      "/quantum6.webp",
    ],
    imagesAlt: [
      "Tela inicial",
      "Tela de cadastro",
      "Trilhas de aprendizado",
      "Aula sobre Neutrôns",
      "Atualização de progresso",
      "Finalização do curso",
    ],
  },

  {
    title: "Univali Intranet",
    shortDescription:
      "Reimaginação da interface da intranet da Universidade do Vale do Itajaí (Univali).",
    longDescription:
      "Um projeto que recria a interface da intranet da Univali, focado apenas no frontend e na experiência visual.",
    features: [
      "Recriação da interface da intranet",
      "Design simples e funcional",
      "Frontend responsivo",
    ],

    gitHubLink: "https://github.com/BrunoAseff/univali-intranet",
    webLink: "https://univali-intranet.vercel.app",
    technologies: [
      "/svgs/nextjs.svg",
      "/svgs/react.svg",
      "/svgs/git.svg",
      "/svgs/tailwindcss.svg",
    ],
    images: [
      "/univali_1.webp",
      "/univali_2.webp",
      "/univali_3.webp",
      "/univali_4.webp",
      "/univali_5.webp",
      "/univali_6.webp",
    ],
    imagesAlt: [
      "Tela de login",
      "Início",
      "Portal do aluno",
      "Dados do aluno",
      "Configurações da conta",
      "Serviços intranet",
    ],
  },

  {
    title: "random-password-typescript",
    shortDescription:
      "Uma biblioteca no npm que gera senhas de forma personalizável, segura e de fortemente tipada. ",
    longDescription:
      "Uma biblioteca no npm que gera senhas de forma personalizável, segura e de fortemente tipada. ",
    features: [
      "Tipagem forte com TypeScript",
      "Senhas seguras com CSPRNG",
      "Personalização de senhas",
    ],
    CTA: "Ver no npm",
    gitHubLink: "https://www.npmjs.com/package/random-password-typescript",
    technologies: ["/svgs/git.svg", "/svgs/typescript.svg", "/svgs/nodejs.svg"],
    images: ["/random.png"],
    imagesAlt: ["Random password"],
    ExternalLink: "NPM",
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

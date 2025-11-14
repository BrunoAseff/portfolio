export const projectsEn = [
  {
    title: "Nova",
    shortDescription: "Platform to help with focus and relaxation.",
    longDescription: "Platform to help with focus and relaxation.",
    features: [
      "Multiple fully customizable spaces",
      "Account creation with email flow",
      "Ambient sounds",
      "Customizable reminders",
      "Custom background image",
      "Pomodoro with customizable time, sounds and behavior",
      "Different color themes",
      "Different breathing exercises",
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
      "Breathing exercises",
      "Background images",
      "User profile",
      "Custom themes",
      "Reminders",
    ],
  },
  {
    title: "Eye Patch",
    shortDescription:
      "Personal uptime and security monitoring for web applications.",
    longDescription:
      "Eye Patch is a personal tool for monitoring web application health. Every 15 minutes, it checks if services are online and triggers email alerts if there are failures. The entire flow runs on AWS serverless services and is defined via infrastructure as code with CDK.",
    features: [
      "Periodic service verification with AWS Lambda",
      "Scheduling with EventBridge",
      "Email alert sending with SNS",
      "Configuration and deployment via AWS CDK",
    ],
    gitHubLink: "https://github.com/BrunoAseff/eye-patch",
    technologies: ["/svgs/typescript.svg", "/svgs/nodejs.svg", "svgs/git.svg"],
    images: ["/eyepatch.webp"],
    imagesAlt: ["AWS services diagram"],
  },
  {
    title: "Ecosystem Simulator",
    shortDescription:
      "A simulation game where you manage an ecosystem with grass, rabbits and foxes.",
    longDescription:
      "A simulation game where you manage an ecosystem with grass, rabbits and foxes.",
    features: [
      "Real-time ecosystem simulation",
      "Rabbit and fox population management",
      "Grass growth system",
      "Interactive ecosystem visualization",
    ],
    gitHubLink: "https://github.com/Bolhas-na-mao/ecosystem-simulator",
    webLink: "https://ecosystem.bolhas.org",
    technologies: ["/svgs/cpp.svg"],
    images: ["/ecosystem.png"],
    imagesAlt: ["Ecosystem Simulator"],
  },
  {
    title: "Game of Life",
    shortDescription: "Conway's Game of Life in the browser made with PixiJS.",
    longDescription: "Conway's Game of Life in the browser made with PixiJS.",
    features: [
      "Complete Game of Life implementation",
      "Interactive browser interface",
      "Optimized rendering with PixiJS",
      "Play/pause and reset controls",
    ],
    gitHubLink: "https://github.com/Bolhas-na-mao/game-of-life",
    webLink: "https://gameoflife.bolhas.org",
    technologies: ["/svgs/typescript.svg"],
    images: ["/gameoflife.png"],
    imagesAlt: ["Game of Life"],
  },
  {
    title: "bolhas.org",
    shortDescription:
      "Bolhas na Mão is a laboratory of interactive educational projects about algorithms, mathematics and computing.",
    longDescription:
      "Bolhas na Mão is a laboratory of interactive educational projects about algorithms, mathematics and computing.",
    features: [
      "Interactive educational projects",
      "Content about algorithms and mathematics",
      "Educational and accessible interface",
      "Interactive learning resources",
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
      "Automated notification system about updates in local cinemas.",
    longDescription:
      "System that monitors and notifies by email about new movies and schedule changes in Balneário Shopping and Shopping Itajaí cinemas, using web scraping and automation.",
    features: [
      "Web scraping with Puppeteer",
      "Responsive emails with React Email",
      "Automation with GitHub Actions",
      "Storage in Gist",
      "Automatic weekly notifications",
      "Visual indicator of new movies",
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
    imagesAlt: ["Movie update email"],
  },

  {
    title: "Terminal RPG",
    shortDescription:
      "An RPG game developed in C++ to run in terminal, created as part of the graduation course.",
    longDescription:
      "An RPG game developed in C++ to run in terminal, created as part of the graduation course.",
    CTA: "View on OnlineGDB",
    features: [
      "Text-based RPG in terminal",
      "Developed in C++",
      "Simple and direct gameplay",
    ],
    gitHubLink: "https://www.onlinegdb.com/YCYpLmmMM",
    technologies: ["/svgs/cpp.svg"],
    images: ["/rpg.webp"],
    imagesAlt: ["Terminal RPG"],
    ExternalLink: "OnlineGDB",
  },
];

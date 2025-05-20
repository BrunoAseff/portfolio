import {
  SiCplusplus,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPrisma,
  SiFramer,
  SiStyledcomponents,
  SiLinux,
  SiDocker,
  SiPostgresql
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

export const technologies = [
  {
    title: "JavaScript",
    color: "hover:text-yellow-500",
    icon: <SiJavascript size="2rem" />,
  },
    {
    title: "TypeScript",
    color: "hover:text-blue-600",
    icon: <SiTypescript size="2rem" />,
  },
    {
    title: "AWS",
    color: "hover:text-orange-600",
    icon: <FaAws size="2rem" />,
  },
  {
    title: "Linux",
    color: "hover:text-amber-600",
    icon: <SiLinux size="2rem" />,
  },
  {
    title: "Docker",
    color: "hover:text-blue-500",
    icon: <SiDocker size="2rem" />,
  },
   {
    title: "Postgres",
    color: "hover:text-blue-700",
    icon: <SiPostgresql size="2rem" />,
  },
  { title: "Git", color: "hover:text-orange-600", icon: <SiGit size="2rem" /> },
  {
    title: "Node.js",
    color: "hover:text-green-600",
    icon: <SiNodedotjs size="2rem" />,
  },
  {
    title: "React.js",
    color: "hover:text-cyan-600",
    icon: <SiReact size="2rem" />,
  },
  {
    title: "Next.js",
    color: "hover:text-slate-600",
    icon: <SiNextdotjs size="2rem" />,
  },

  {
    title: "Tailwind CSS",
    color: "hover:text-sky-600",
    icon: <SiTailwindcss size="2rem" />,
  },
  {
    title: "Motion",
    color: "hover:text-slate-600",
    icon: <SiFramer size="2rem" />,
  },
  {
    title: "Styled Components",
    color: "hover:text-pink-600",
    icon: <SiStyledcomponents size="2rem" />,
  },

  {
    title: "Prisma ORM",
    color: "hover:text-slate-600",
    icon: <SiPrisma size="2rem" />,
  },
];

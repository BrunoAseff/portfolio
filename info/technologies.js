import {
  SiGooglecloud,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiLinux,
  SiDocker,
  SiGo,
  SiPhp,
  SiGithubactions,
  SiVuedotjs
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

export const focusTechnologies = [
  {
    title: "Go",
    color: "hover:text-cyan-400",
    icon: <SiGo size="3rem" />,
  },
  {
    title: "AWS",
    color: "hover:text-orange-400",
    icon: <FaAws size="3rem" />,
  },
  {
    title: "Google Cloud",
    color: "hover:text-blue-400",
    icon: <SiGooglecloud size="3rem" />,
  },
  {
    title: "Docker",
    color: "hover:text-blue-400",
    icon: <SiDocker size="3rem" />,
  },
  {
    title: "Linux",
    color: "hover:text-amber-400",
    icon: <SiLinux size="3rem" />,
  },
  {
    title: "CI/CD",
    color: "hover:text-purple-400",
    icon: <SiGithubactions size="3rem" />,
  },
];

export const otherTechnologies = [
  {
    title: "PHP",
    color: "hover:text-indigo-400",
    icon: <SiPhp size="2rem" />,
  },
  {
    title: "Vue.js",
    color: "hover:text-green-400",
    icon: <SiVuedotjs size="2rem" />,
  },
  {
    title: "TypeScript",
    color: "hover:text-blue-400",
    icon: <SiTypescript size="2rem" />,
  },
  {
    title: "Node.js",
    color: "hover:text-green-400",
    icon: <SiNodedotjs size="2rem" />,
  },
  {
    title: "React.js",
    color: "hover:text-cyan-400",
    icon: <SiReact size="2rem" />,
  },
  {
    title: "Next.js",
    color: "hover:text-white",
    icon: <SiNextdotjs size="2rem" />,
  },
  {
    title: "Tailwind CSS",
    color: "hover:text-sky-400",
    icon: <SiTailwindcss size="2rem" />,
  }
];

export const technologies = [...focusTechnologies, ...otherTechnologies];

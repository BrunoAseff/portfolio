import type { Credential, Localized } from "./types";
export const credentials = [
  {
    id: "aws",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issued: "2025-06-29",
    href: "/documents/certificates/aws-cloud-practitioner.pdf",
  },
  {
    id: "web-security",
    name: "Web Security v2",
    issuer: "Frontend Masters",
    issued: "2025-08-15",
    href: "/documents/certificates/web-security-v2.pdf",
  },
  {
    id: "algorithms",
    name: "The Last Algorithms Course You’ll Need",
    issuer: "Frontend Masters",
    issued: "2025-12-03",
    href: "/documents/certificates/last-algorithms-course.pdf",
  },
] satisfies Credential[];
export const degree = {
  pt: {
    name: "Sistemas para Internet — Univali",
    status: "Em andamento. Conclusão prevista para o 1º semestre de 2027.",
  },
  en: {
    name: "Internet Systems — Univali",
    status: "In progress. Expected graduation in the first half of 2027.",
  },
} satisfies Localized<{ name: string; status: string }>;

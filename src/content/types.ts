export type Locale = "pt" | "en";
export type Localized<T> = Record<Locale, T>;
export type SectionId = "conhecimentos" | "experiencia" | "projetos" | "formacao" | "contato";
export type Experience = {
  id: string;
  name: string;
  start: string;
  end: string | null;
  content: Localized<{ period: string; paragraphs: string[] }>;
};
export type Project = {
  id: string;
  name: string;
  links: { website?: string; repository?: string };
  content: Localized<{ pitch?: string; paragraphs: string[] }>;
};
export type Credential = { id: string; name: string; issuer: string; issued: string; href: string };
export type ProfileContent = {
  role: string;
  intro: string;
  location: string;
  deliveries: [string, string][];
};

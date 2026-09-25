export type Project = {
  slug: string;
  name: string;
  category: "Websites" | "Sistemas" | "SaaS";
  segment: string;
  summary: string;
  color: string;
  image?: string;
  url?: string;
  demo: boolean;
  features: string[];
  challenge: string;
  solution: string;
  technologies: string[];
};
export type ContactSettings = {
  whatsapp: string;
  email: string;
  instagram: string;
};

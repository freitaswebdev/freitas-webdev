import { z } from "zod";
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100),
  company: z.string().trim().max(140).default(""),
  email: z.email("Informe um e-mail válido.").max(254),
  phone: z
    .string()
    .trim()
    .min(8, "Informe um telefone válido.")
    .max(30)
    .regex(/^[+\d\s().-]+$/, "Confira o telefone."),
  type: z.string().min(2, "Selecione o tipo de projeto.").max(80),
  budget: z.string().max(80).default("A definir"),
  deadline: z.string().max(80).default("A definir"),
  message: z
    .string()
    .trim()
    .min(20, "Descreva seu projeto em pelo menos 20 caracteres.")
    .max(5000),
  consent: z.literal(true, {
    error: "É necessário aceitar o uso dos dados para contato.",
  }),
  website: z.string().max(300).default(""),
});
export const settingsSchema = z.object({
  whatsapp: z
    .string()
    .regex(/^\d{10,15}$/, "Use de 10 a 15 dígitos, com código do país."),
  email: z.email("Informe um e-mail válido."),
  instagram: z.union([
    z.literal(""),
    z.url().refine((v) => {
      const u = new URL(v);
      return (
        u.protocol === "https:" &&
        ["instagram.com", "www.instagram.com"].includes(u.hostname) &&
        u.pathname !== "/"
      );
    }, "Informe uma URL https de perfil do Instagram."),
  ]),
});
export type LeadInput = z.infer<typeof leadSchema>;

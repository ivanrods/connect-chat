import { z } from "zod";

export const chatSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "A mensagem deve ter pelo menos 1 caractere")
    .max(300, "A mensagem pode ter no máximo 300 caracteres"),

  file: z.string().optional(),
});

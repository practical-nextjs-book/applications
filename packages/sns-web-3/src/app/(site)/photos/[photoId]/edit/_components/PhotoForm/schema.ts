import { z } from "zod";

export const validationSchema = z.object({
  photoId: z.string(),
  title: z
    .string()
    .min(1, "入力してください")
    .max(32, "32文字以内で入力してください"),
  description: z.string().max(128, "128文字以内で入力してください"),
  categoryId: z.string(),
  imageUrl: z.string(),
});

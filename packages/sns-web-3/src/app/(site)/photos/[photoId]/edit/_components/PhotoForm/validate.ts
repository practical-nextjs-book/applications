import { validationSchema } from "./schema";
import type { ZodError } from "zod";

// Zod によるバリデーション
export function validateFormData(formData: FormData) {
  return validationSchema.parse(Object.fromEntries(formData));
}

// 各項目のエラーをマッピング
export function transformFiledErrors(err: ZodError) {
  return Object.fromEntries(
    err.errors.map(({ path, message }) => [path[0], { message }]),
  );
}

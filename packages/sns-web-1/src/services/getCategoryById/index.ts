import { handleFailed, handleSucceed, path } from "../";
import type { Category } from "../type";

export async function getCategoryById(
  categoryId: string,
): Promise<{ category: Category }> {
  return fetch(path(`/api/categories/id/${categoryId}`))
    .then(handleSucceed)
    .catch(handleFailed);
}

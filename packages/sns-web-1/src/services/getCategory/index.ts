import { handleFailed, handleSucceed, path } from "../";
import type { Category } from "../type";

export async function getCategory({
  categoryName,
}: {
  categoryName: string;
}): Promise<{ category: Category }> {
  return fetch(path(`/api/categories/${categoryName}`))
    .then(handleSucceed)
    .catch(handleFailed);
}

import { handleFailed, handleSucceed, path } from "../";
import type { Category } from "../type";

export type GetCategoriesResponse = {
  categories: (Omit<Category, "photos"> & { totalPhotoCount: number })[];
};

export async function getCategories(): Promise<GetCategoriesResponse> {
  return fetch(path(`/api/categories`), { next: { tags: ["categories"] } })
    .then(handleSucceed)
    .catch(handleFailed);
}

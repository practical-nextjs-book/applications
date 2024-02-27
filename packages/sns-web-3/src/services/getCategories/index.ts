import { handleFailed, handleSucceed, path } from "../";
import type { Category } from "../type";

export type GetCategoriesResponse = {
  categories: (Omit<Category, "photos"> & { totalPhotoCount: number })[];
};

export async function getCategories(): Promise<GetCategoriesResponse> {
  // ★: 手前の動的関数の影響で動的取得になってしまっているため、cache 指定が必要
  return fetch(path(`/api/categories`), {
    cache: "force-cache",
    next: { tags: ["categories"] },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}

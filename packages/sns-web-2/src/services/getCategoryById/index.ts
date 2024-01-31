import { handleFailed, handleSucceed, path } from "../";
import type { Category } from "../type";
import type { PaginationProps } from "sns-shared-ui/src/components/Pagination";

export async function getCategoryById(
  categoryId: string,
): Promise<{ category: Category; pagination: PaginationProps }> {
  // ❌: fetchCache auto と 手前の動的関数の影響で、動的取得になっている。
  return fetch(path(`/api/categories/id/${categoryId}`))
    .then(handleSucceed)
    .catch(handleFailed);
}

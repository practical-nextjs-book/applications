import { handleFailed, handleSucceed, path } from "../";
import type { Category } from "../type";
import type { PaginationProps } from "sns-shared-ui/src/components/Pagination";

export async function getCategory({
  categoryName,
  page = "1",
  take = "10",
}: {
  categoryName: string;
  page?: string;
  take?: string;
}): Promise<{ category: Category; pagination: PaginationProps }> {
  const searchParams = new URLSearchParams({ page, take });
  return fetch(path(`/api/categories/${categoryName}?${searchParams}`), {
    cache: "no-store",
    next: { tags: ["categories"] }, // 📌: 抽象的な tag
  })
    .then(handleSucceed)
    .catch(handleFailed);
}

import { handleFailed, handleSucceed, path } from "../";
import type { Category } from "../type";
import type { PaginationProps } from "sns-shared-ui/src/components/Pagination";

type Props = {
  categoryName: string;
  page?: string;
  take?: string;
  revalidate?: number;
};

export async function getCategory({
  categoryName,
  page = "1",
  take = "10",
  revalidate,
}: Props): Promise<{ category: Category; pagination: PaginationProps }> {
  const searchParams = new URLSearchParams({ page, take });
  return fetch(path(`/api/categories/${categoryName}?${searchParams}`), {
    next: {
      tags: [`categories/${categoryName}`], // 📌: 具体的な tag
      ...(revalidate !== undefined && { revalidate }),
    },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}

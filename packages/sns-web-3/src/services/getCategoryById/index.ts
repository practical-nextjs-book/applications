import { handleFailed, handleSucceed, path } from "../";
import type { Category } from "../type";
import type { PaginationProps } from "sns-shared-ui/src/components/Pagination";

type Props = {
  id: string;
  revalidate?: number;
};

export async function getCategoryById({
  id,
  revalidate,
}: Props): Promise<{ category: Category; pagination: PaginationProps }> {
  return fetch(path(`/api/categories/id/${id}`), {
    next: {
      tags: [`categories/id/${id}`],
      ...(revalidate !== undefined && { revalidate }),
    },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}

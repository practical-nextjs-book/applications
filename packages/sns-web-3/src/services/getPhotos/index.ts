import { handleFailed, handleSucceed, path } from "../";
import type { Photo } from "../type";
import type { PaginationProps } from "sns-shared-ui/src/components/Pagination";

type Props = {
  page?: string;
  take?: string;
  authorId?: string;
  revalidate?: number;
};

export function getPhotos({
  page = "1",
  take = "10",
  authorId,
  revalidate,
}: Props): Promise<{ photos: Photo[]; pagination: PaginationProps }> {
  const searchParams = new URLSearchParams({
    page,
    take,
    ...(authorId && { authorId }),
  });
  // ✅ 手前に動的関数があっても、静的取得になる
  return fetch(path(`/api/photos?${searchParams}`), {
    cache: "force-cache", // ★
    next: {
      ...(authorId && { tags: [`photos?authorId=${authorId}`] }),
      ...(revalidate !== undefined && { revalidate }),
    },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}

import { handleFailed, handleSucceed, path } from "../";
import type { Photo } from "../type";

export function getPhotos({
  authorId,
}: {
  authorId?: string;
}): Promise<{ photos: Photo[] }> {
  const searchParams = new URLSearchParams({
    ...(authorId && { authorId }),
  });
  return fetch(path(`/api/photos?${searchParams}`))
    .then(handleSucceed)
    .catch(handleFailed);
}

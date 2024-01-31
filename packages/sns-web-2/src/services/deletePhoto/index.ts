import { handleFailed, handleSucceed, path } from "../";
import type { Photo } from "../type";

export function deletePhoto({
  photoId,
  userId,
}: {
  photoId: string;
  userId: string;
}): Promise<{ photo: Photo }> {
  return fetch(path(`/api/photos/${photoId}?userId=${userId}`), {
    method: "DELETE",
    next: { revalidate: 0 },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}

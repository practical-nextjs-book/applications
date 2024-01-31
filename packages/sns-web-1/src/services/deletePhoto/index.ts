import { handleFailed, handleSucceed, path } from "../";
import type { Photo } from "../type";

export function deletePhoto({
  photoId,
}: {
  photoId: string;
}): Promise<{ photo: Photo }> {
  return fetch(path(`/api/photos/${photoId}`), {
    method: "DELETE",
  })
    .then(handleSucceed)
    .catch(handleFailed);
}

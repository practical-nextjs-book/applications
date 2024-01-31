import { handleFailed, handleSucceed, path } from "../";
import type { Photo } from "../type";

export function postPhotoEdit({
  photoId,
  ...payload
}: {
  photoId: string;
  userId: string;
  title: string;
  description: string;
  categoryId: string;
  imageUrl: string;
}): Promise<{ photo: Photo }> {
  return fetch(path(`/api/photos/${photoId}/edit`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}

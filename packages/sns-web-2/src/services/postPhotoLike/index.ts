import { handleFailed, handleSucceed, path } from "../";

export function postPhotoLike({
  userId,
  photoId,
}: {
  userId: string;
  photoId: string;
}): Promise<{ liked: boolean }> {
  return fetch(path(`/api/photos/${photoId}/like`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}

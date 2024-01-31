import { handleFailed, handleSucceed, path } from "../";

export function postPhotoComment(payload: {
  photoId: string;
  comment: string;
  commentatorId: string;
}): Promise<{ message: string }> {
  return fetch(path(`/api/photos/${payload.photoId}/comments`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}

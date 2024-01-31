import { handleFailed, handleSucceed, path } from "../";
import type { Comment } from "../type";

export function getPhotoComments(
  photoId: string,
): Promise<{ comments: Comment[] }> {
  return fetch(path(`/api/photos/${photoId}/comments`))
    .then(handleSucceed)
    .catch(handleFailed);
}

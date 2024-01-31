import { handleFailed, handleSucceed, path } from "../";
import type { Photo } from "../type";

export async function getPhoto(id: string): Promise<{ photo: Photo }> {
  return fetch(path(`/api/photos/${id}`))
    .then(handleSucceed)
    .catch(handleFailed);
}

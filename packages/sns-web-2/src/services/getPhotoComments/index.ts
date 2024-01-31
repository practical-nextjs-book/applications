import { handleFailed, handleSucceed, path } from "../";
import type { Comment } from "../type";

type Props = {
  id: string;
};

export function getPhotoComments({
  id,
}: Props): Promise<{ comments: Comment[] }> {
  return fetch(path(`/api/photos/${id}/comments`), {
    cache: "no-store"
  })
    .then(handleSucceed)
    .catch(handleFailed);
}


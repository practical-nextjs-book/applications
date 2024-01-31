import { handleFailed, handleSucceed, path } from "../";
import type { Photo } from "../type";

type Props = {
  id: string;
  revalidate?: number;
};

export async function getPhoto({
  id,
  revalidate,
}: Props): Promise<{ photo: Photo }> {
  return fetch(path(`/api/photos/${id}`), {
    next: {
      tags: [`photos/${id}`],
      ...(revalidate !== undefined && { revalidate }),
    },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}

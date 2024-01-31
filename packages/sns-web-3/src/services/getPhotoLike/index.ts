import { handleFailed, handleSucceed, path } from "../";

type Props = {
  userId: string;
  photoId: string;
  revalidate?: number;
};

export function getPhotoLike({
  userId,
  photoId,
  revalidate,
}: Props): Promise<{ liked: boolean }> {
  const searchParams = new URLSearchParams({ userId });
  return fetch(path(`/api/photos/${photoId}/like?${searchParams}`), {
    next: {
      tags: [`photos/${photoId}`],
      ...(revalidate !== undefined && { revalidate }),
    },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}

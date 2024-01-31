import { handleFailed, handleSucceed, path } from "../";

export function getPhotoLike({
  userId,
  photoId,
}: {
  userId: string;
  photoId: string;
}): Promise<{ liked: boolean }> {
  const searchParams = new URLSearchParams({ userId });
  return fetch(path(`/api/photos/${photoId}/like?${searchParams}`))
    .then(handleSucceed)
    .catch(handleFailed);
}

import { handleFailed, handleSucceed, path } from "../";
import type { Photo } from "../type";

export async function getPhoto(id: string): Promise<{ photo: Photo }> {
  // ❌: fetchCache auto と 手前の動的関数の影響で、動的取得になっている。
  return fetch(path(`/api/photos/${id}`), {
    next: { tags: [`photos/${id}`] },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}

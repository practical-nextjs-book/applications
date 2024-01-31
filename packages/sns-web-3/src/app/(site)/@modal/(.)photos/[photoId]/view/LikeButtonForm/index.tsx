"use client";

import { useFormState } from "react-dom";
import { LikeButton } from "sns-shared-ui/src/components/LikeButton";
import type { Photo } from "@/services/type";
import { postLike } from "./actions";
import { initialFormState } from "./state";
import styles from "./style.module.css";

export function LikeButtonForm({
  photo,
  liked,
}: {
  photo: Photo;
  liked: boolean;
}) {
  const [state, dispatch] = useFormState(postLike,  initialFormState({ liked, likedCount: photo.likedCount }));
  return (
    // MEMO: 執筆時点現在、Intercepting Routes における Server Action では不具合が発生する
    <form action={dispatch}>
      <input type="hidden" name="photoId" value={photo.id} />
      <LikeButton
        count={state.likedCount}
        className={styles.likeButton}
        disabled={Boolean(state.liked)}
        type="submit"
      />
    </form>
  );
}

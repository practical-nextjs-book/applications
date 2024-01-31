"use client";

import { useFormState, useFormStatus } from "react-dom";
import { CommentBox } from "sns-shared-ui/src/components/CommentBox";
import type { Photo } from "@/services/type";
import { postComment } from "./action";

function Comment() {
  const { pending } = useFormStatus();
  return (
    <CommentBox
      inputProps={{
        name: "comment",
        placeholder: "この写真へコメントを入力...",
        disabled: pending,
      }}
      buttonProps={{
        disabled: pending,
      }}
    />
  );
}

export function CommentForm({ photo }: { photo: Photo }) {
  const [state, dispatch] = useFormState(postComment, null);
  return (
    <form action={dispatch}>
      {state?.error?.message && <p>{state.error.message}</p>}
      <input type="hidden" name="photoId" value={photo.id} />
      <Comment key={state?.id} />
    </form>
  );
}

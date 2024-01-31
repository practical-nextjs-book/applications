"use client";

import type { RefObject } from "react";
import { CommentBox } from "sns-shared-ui/src/components/CommentBox";

type Props = {
  photoId: string;
  formRef: RefObject<HTMLFormElement>;
  formAction: (formData: FormData) => Promise<void>;
};

export function CommentForm({ photoId, formRef, formAction }: Props) {
  return (
    <form ref={formRef} action={formAction}>
      <input type="hidden" name="photoId" value={photoId} />
      <CommentBox
        inputProps={{
          name: "comment",
          placeholder: "この写真へコメントを入力...",
        }}
      />
    </form>
  );
}

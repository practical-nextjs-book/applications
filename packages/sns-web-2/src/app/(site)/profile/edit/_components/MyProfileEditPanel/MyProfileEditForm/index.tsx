"use client";

import { useFormState } from "react-dom";
import { AlertLabel } from "sns-shared-ui/src/components/AlertLabel";
import { EditAvatar } from "./EditAvatar";
import { EditMeta } from "./EditMeta";
import { updateUser } from "./action";
import { initialFormState } from "./state";
import styles from "./style.module.css";

type Props = {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  profile: {
    id: string;
    bio: string | null;
    screenName: string | null;
    userId: string;
  };
};

export function MyProfileEditForm({ user, profile }: Props) {
  // ★ 第 1 引数には Server Action、第 2 引数には初期状態を渡す
  const [formState, formDispatch] = useFormState(updateUser, initialFormState);
  return (
    <form action={formDispatch}>
      {formState?.message && <AlertLabel>{formState.message}</AlertLabel>}
      <div className={styles.module}>
        <EditAvatar imageUrl={user.image} />
        <EditMeta user={user} profile={profile} />
      </div>
    </form>
  );
}

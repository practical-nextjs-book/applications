import { Button } from "sns-shared-ui/src/components/Button";
import { Label } from "sns-shared-ui/src/components/Label";
import { TextArea } from "sns-shared-ui/src/components/TextArea";
import { TextField } from "sns-shared-ui/src/components/TextField";
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

export function EditMeta({ user, profile }: Props) {
  const name = user.name || "";
  const componentId = "MyProfileEditPanelEditMeta";
  const nameId = `${componentId}-name`;
  const screenNameId = `${componentId}-screenNameId`;
  const bioId = `${componentId}-bio`;
  return (
    <div className={styles.meta}>
      <div className={styles.names}>
        <div>
          <Label htmlFor={nameId} size="small">
            ユーザー名
          </Label>
          <TextField
            id={nameId}
            name="name"
            defaultValue={name || ""}
            required
          />
        </div>
        <div>
          <Label htmlFor={screenNameId} size="small">
            表示名
          </Label>
          <TextField
            id={screenNameId}
            name="screenName"
            defaultValue={profile.screenName || ""}
            required
          />
        </div>
      </div>
      <div className={styles.profile}>
        <Label htmlFor={bioId} size="small">
          プロフィール
        </Label>
        <TextArea id={bioId} name="bio" defaultValue={profile.bio || ""} />
      </div>
      <div className={styles.button}>
        <Button>編集内容を保存する</Button>
      </div>
    </div>
  );
}

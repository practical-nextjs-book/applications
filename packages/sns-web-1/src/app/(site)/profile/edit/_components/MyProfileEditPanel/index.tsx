"use client";

import { useCallback, useState } from "react";
import { clsx } from "clsx";
import { useDropzone } from "react-dropzone";
import { Button } from "sns-shared-ui/src/components/Button";
import { Icon } from "sns-shared-ui/src/components/Icon";
import { Label } from "sns-shared-ui/src/components/Label";
import { TextArea } from "sns-shared-ui/src/components/TextArea";
import { TextField } from "sns-shared-ui/src/components/TextField";
import { MAX_UPLOAD_PHOTO_SIZE } from "@/constants";
import type { Profile, User } from "@/services/type";
import { updateUser } from "./action";
import { getImageElementFromFile } from "./fns";
import styles from "./style.module.css";

type Props = {
  user: User;
  profile: Profile;
};

export function MyProfileEditPanel({ user, profile }: Props) {
  const name = user.name || "";
  const componentId = "MyProfileEditPanel";
  const nameId = `${componentId}-name`;
  const screenNameId = `${componentId}-screenNameId`;
  const bioId = `${componentId}-bio`;

  const [imgSrc, setImgSrc] = useState(user.image || "/images/account.svg");
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const image = await getImageElementFromFile(file);
    setImgSrc(image.src);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpeg", ".jpg"] },
    maxSize: MAX_UPLOAD_PHOTO_SIZE,
    maxFiles: 1,
  });

  return (
    <form action={updateUser}>
      <div className={styles.module}>
        <div className={styles.photo}>
          <div
            {...getRootProps()}
            className={clsx(styles.upload, isDragActive && styles.isDragActive)}
            {...(imgSrc && { style: { backgroundImage: `url(${imgSrc})` } })}
          >
            <input {...getInputProps()} />
            <input type="hidden" name="imageUrl" value={imgSrc} />
            {!imgSrc && (
              <Icon
                type="upload"
                size="large"
                color={isDragActive ? "orange" : "gray"}
              />
            )}
          </div>
        </div>
        <div className={styles.meta}>
          <div className={styles.names}>
            <div>
              <Label htmlFor={nameId} size="small">
                ユーザー名
              </Label>
              <TextField id={nameId} name="name" defaultValue={name || ""} />
            </div>
            <div>
              <Label htmlFor={screenNameId} size="small">
                表示名
              </Label>
              <TextField
                id={screenNameId}
                name="screenName"
                defaultValue={profile?.screenName || ""}
                required
              />
            </div>
          </div>
          <div className={styles.profile}>
            <Label htmlFor={bioId} size="small">
              プロフィール
            </Label>
            <TextArea id={bioId} name="bio" defaultValue={profile?.bio || ""} />
          </div>
          <div className={styles.button}>
            <Button>編集内容を保存する</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "sns-shared-ui/src/components/Icon";
import { PhotoDndUploader } from "sns-shared-ui/src/components/PhotoDndUploader";
import { Typography } from "sns-shared-ui/src/components/Typography";
import { MAX_UPLOAD_PHOTO_SIZE, MAX_UPLOAD_PHOTO_WIDTH } from "@/constants";
import type { GetCategoriesResponse } from "@/services/getCategories";
import { PhotoMeta } from "./PhotoMeta";
import styles from "./style.module.css";

type Props = GetCategoriesResponse;
type State = {
  title: string;
  categoryId: string;
  description: string;
};

function PhotoUploader({ onChange }: { onChange: (file: Blob) => void }) {
  return (
    <PhotoDndUploader
      className={styles.photo}
      areaClassName={styles.area}
      dragActiveClassName={styles.dragActive}
      maxUploadFileSize={MAX_UPLOAD_PHOTO_SIZE}
      maxUploadRectSize={MAX_UPLOAD_PHOTO_WIDTH}
      onChange={onChange}
    >
      {(isDragActive) => (
        <>
          <Icon
            type="upload"
            size="large"
            color={isDragActive ? "orange" : "gray"}
          />
          <Typography>
            ここに写真をドロップするか
            <br />
            クリックしてファイルを選択
          </Typography>
        </>
      )}
    </PhotoDndUploader>
  );
}

export function PhotoCreateForm({ categories }: Props) {
  const [{ title, categoryId, description }, setState] = useState<State>({
    title: "",
    categoryId: "",
    description: "",
  });
  const handleChangeMeta = (state: State) => {
    setState(state);
  };
  const [photoData, setPhotoData] = useState<Blob>();
  const handleChangeFile = (file: Blob) => {
    setPhotoData(file);
  };
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!photoData) return;
    await fetch("/api/photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl: "/images/placeholder.png",
        title,
        categoryId,
        description,
      }),
    }).then((res) => res.json());
    router.refresh();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <PhotoUploader onChange={handleChangeFile} />
      <PhotoMeta categories={categories} onChange={handleChangeMeta} />
    </form>
  );
}

"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "sns-shared-ui/src/components/Icon";
import { PhotoDndUploader } from "sns-shared-ui/src/components/PhotoDndUploader";
import { Typography } from "sns-shared-ui/src/components/Typography";
import { MAX_UPLOAD_PHOTO_SIZE, MAX_UPLOAD_PHOTO_WIDTH } from "@/constants";
import { uploadPhoto } from "@/lib/s3";
import type { GetCategoriesResponse } from "@/services/getCategories";
import { PhotoMeta } from "./PhotoMeta";
import styles from "./style.module.css";

type Props = {
  categories: GetCategoriesResponse["categories"];
  close: () => void;
};

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

export function PhotoCreateForm({ categories, close }: Props) {
  // 【1】投稿情報を入力する
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
  // 【2】「写真を投稿する」ボタンをクリックして、投稿処理開始
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!photoData) return;
    try {
      // 【3】アップロードした「写真 URL」を取得（A）
      const imageUrl = await uploadPhoto({ photoData });
      // 【4】投稿内容と「写真 URL」をまとめて Route Handler に送る
      const { photo } = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          title,
          categoryId,
          description,
        }),
      }).then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      });
      router.refresh();
      router.push(`/photos/${photo.id}`);
    } catch (err) {
      window.alert("写真のアップロードに失敗しました");
    }
    close();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <PhotoUploader onChange={handleChangeFile} />
      <PhotoMeta categories={categories} onChange={handleChangeMeta} />
    </form>
  );
}

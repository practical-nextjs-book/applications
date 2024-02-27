"use client";

import { useState } from "react";
import { Icon } from "sns-shared-ui/src/components/Icon";
import { PhotoDndUploader } from "sns-shared-ui/src/components/PhotoDndUploader";
import { Typography } from "sns-shared-ui/src/components/Typography";
import { MAX_UPLOAD_PHOTO_SIZE, MAX_UPLOAD_PHOTO_WIDTH } from "@/constants";
import { uploadPhoto } from "@/lib/s3";
import type { GetCategoriesResponse } from "@/services/getCategories";
import { PhotoMeta } from "./PhotoMeta";
import { postPhotoAction } from "./actions";
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
  // 【2】★:A イベントハンドラーは action 属性向けの関数に変更
  const handleSubmit = async () => {
    if (!photoData) return;
    try {
      // 【3】アップロードした「写真 URL」を取得（A）
      const imageUrl = await uploadPhoto({ photoData });
      // 【4】★: Server Action を呼び出し、router.refresh(); と router.push(); を削除
      await postPhotoAction({ imageUrl, title, categoryId, description });
    } catch (err) {
      window.alert("写真のアップロードに失敗しました");
    }
    close();
  };
  return (
    <form className={styles.form} action={handleSubmit}>
      <PhotoUploader onChange={handleChangeFile} />
      <PhotoMeta categories={categories} onChange={handleChangeMeta} />
    </form>
  );
}

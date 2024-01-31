"use client";
import { useCallback, useState } from "react";
import { clsx } from "clsx";
import { useDropzone } from "react-dropzone";
import { Icon } from "sns-shared-ui/src/components/Icon";
import { MAX_UPLOAD_PHOTO_SIZE } from "@/constants";
import { uploadPhoto } from "@/lib/s3";
import { getImageElementFromFile, resizePhoto } from "./fns";
import styles from "./style.module.css";

type Props = {
  imageUrl?: string | null;
};

export function EditAvatar({ imageUrl }: Props) {
  const [imgSrc, setImgSrc] = useState(imageUrl || "/images/account.svg");
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const image = await getImageElementFromFile(file);
    const photoData = await resizePhoto({ image, size: 640 });
    const imageUrl = await uploadPhoto({ photoData });
    setImgSrc(imageUrl);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpeg", ".jpg"] },
    maxSize: MAX_UPLOAD_PHOTO_SIZE,
    maxFiles: 1,
  });
  return (
    <div className={styles.photo}>
      <input type="hidden" name="imageUrl" value={imgSrc} />
      <div
        {...getRootProps()}
        className={clsx(styles.upload, isDragActive && styles.isDragActive)}
        {...(imgSrc && { style: { backgroundImage: `url(${imgSrc})` } })}
      >
        <input {...getInputProps()} />
      </div>
      <Icon
        type="upload"
        size="large"
        color={"white"}
        className={styles.icon}
      />
    </div>
  );
}

import mime from "mime-types";
import { v4 as uuid } from "uuid";

type Props = {
  photoData: Blob;
};

export async function uploadPhoto({ photoData }: Props) {
  const name = uuid();
  const ext = mime.extension(photoData.type);
  const filename = encodeURIComponent(`${name}.${ext}`);
  const fileType = encodeURIComponent(photoData.type);

  // Get presigned URL
  const {
    presignedPost: { url, fields },
  } = await fetch("/api/photos/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, fileType }),
  }).then((res) => res.json());

  // Upload to S3
  const formData = new FormData();
  Object.entries({ ...fields, file: photoData }).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  await fetch(url, {
    method: "POST",
    body: formData,
  }).then(() => ({ url, filename, fields }));
  return `${url}/${filename}`;
}

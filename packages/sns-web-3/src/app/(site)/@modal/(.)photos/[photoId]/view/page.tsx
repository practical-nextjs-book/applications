import Link from "next/link";
import { notFound } from "next/navigation";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { Typography } from "sns-shared-ui/src/components/Typography";
import { ModalOverlay } from "@/app/(site)/@modal/_components/ModalOverlay";
import { PhotoViewNavigator } from "@/app/_components/PhotoViewNavigator";
import { getServerSession } from "@/lib/auth";
import { getPhoto } from "@/services/getPhoto";
import { getPhotoLike } from "@/services/getPhotoLike";
import { LikeButtonForm } from "./LikeButtonForm";
import styles from "./style.module.css";

type Props = {
  params: { photoId: string };
};
// 【1】Dynamic Segment の [photoId] を参照する
export default async function Page({ params }: Props) {
  const modalId = "modalId";
  const titleId = modalId + "-title";
  const descriptionId = modalId + "-description";
  // 【2】Server Component としてデータ取得する
  const [{ photo }, session] = await Promise.all([
    getPhoto({ id: params.photoId }),
    getServerSession(),
  ]);
  if (!photo) {
    notFound();
  }
  // 【3】ログインユーザーの場合、いいね済みかどうかを取得する
  const { liked } = session?.user.id
    ? await getPhotoLike({ userId: session.user.id, photoId: photo.id })
    : { liked: false };
  return (
    <div className={styles.modal}>
      <ModalOverlay />
      {/* 【4】キーボード操作のためのコンポーネント */}
      <PhotoViewNavigator photoId={photo.id} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={styles.dialog}
      >
        <div
          className={styles.photo}
          style={{ backgroundImage: `url(${photo.imageUrl})` }}
        >
          <LikeButtonForm photo={photo} liked={liked} />
        </div>
        <footer className={styles.footer}>
          <Heading level={2} id={titleId} className={styles.title}>
            {/* 📌: Link を増やすことで prefetch を促す */}
            <Link href={`/photos/${params.photoId}`} prefetch>
              {photo.title}
            </Link>
          </Heading>
          <Typography id={descriptionId} className={styles.description}>
            {photo.description}
          </Typography>
        </footer>
      </div>
    </div>
  );
}

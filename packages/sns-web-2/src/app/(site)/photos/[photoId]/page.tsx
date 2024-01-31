import { notFound } from "next/navigation";
import { SITE_NAME } from "@/constants";
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCategoryById } from "@/services/getCategoryById";
import { getPhoto } from "@/services/getPhoto";
import { getPhotoLike } from "@/services/getPhotoLike";
import { PhotoComment } from "./_components/PhotoComment";
import { PhotoHero } from "./_components/PhotoHero";
import { PhotoMeta } from "./_components/PhotoMeta";
import styles from "./style.module.css";
import type { Metadata } from "next";

type Props = {
  params: { photoId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { photo } = await getPhoto(params.photoId);
  if (!photo) {
    notFound();
  }
  return {
    title: `${photo.title} | ${SITE_NAME}`,
    description: photo.description,
  };
}

export default async function Page({ params }: Props) {
  // 【1】ログインしているか否か
  const session = await getServerSession();
  // 【2】Dynamic Segment の photoId を参照して、一意の投稿写真を特定
  const { photo } = await getPhoto(params.photoId);
  if (!photo) {
    notFound();
  }
  // 【3】写真の投稿者を特定し、プロフィールを取得
  const author = await prisma.user.findUnique({
    where: { id: photo.authorId },
    select: {
      id: true,
      name: true,
      image: true,
      profile: { select: { screenName: true } },
    },
  });
  if (!author) {
    notFound();
  }
  // 【4】カテゴリー情報を取得
  const { category } = await getCategoryById(photo.categoryId);
  // 【5】いいね済みか否かを取得
  const { liked } = session?.user.id
    ? await getPhotoLike({ userId: session.user.id, photoId: photo.id })
    : { liked: false };
  // 【6】ログインユーザー自身の投稿か否か
  const userId = session?.user.id;
  const isOwner = userId === author.id;
  return (
    <>
      {/* 画面上部の大きな写真 */}
      <PhotoHero photo={photo} isOwner={isOwner} liked={liked} />
      <div className={styles.content}>
        {/* 画面下左の投稿概要 */}
        <PhotoMeta
          photo={photo}
          author={author}
          isOwner={isOwner}
          category={category}
        />
        {/* 画面右下のコメント機能 */}
        <PhotoComment photo={photo} userId={userId} />
      </div>
    </>
  );
}

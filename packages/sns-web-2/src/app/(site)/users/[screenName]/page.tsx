import { CardContainer } from "sns-shared-ui/src/components/CardContainer";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { ProfilePanel } from "sns-shared-ui/src/components/ProfilePanel";
import { Section } from "sns-shared-ui/src/components/Section";
import { Typography } from "sns-shared-ui/src/components/Typography";
import { PhotoViewModalContainer } from "@/app/_components/PhotoViewModalContainer";
import { SITE_NAME } from "@/constants";
import { getPhotos } from "@/services/getPhotos";
import { getProfileFromScreenName } from "./dataFetch";
import type { Metadata } from "next";

type Props = {
  params: { screenName: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await getProfileFromScreenName(params);
  return { title: `${profile.user.name}さんの投稿一覧 | ${SITE_NAME}` };
}

export default async function Page({ params }: Props) {
  // 【1】params.screenName から、プロフィールを取得
  const profile = await getProfileFromScreenName(params);
  // 【2】特定したユーザーのIDで、投稿写真一覧を取得
  const { photos } = await getPhotos({
    page: "1",
    take: "15",
    authorId: profile.user.id,
    revalidate: 60 * 60, // 📌: 1時間キャッシュする
  });
  return (
    <>
      <ProfilePanel
        imageUrl={profile.user.image}
        name={profile.user.name || ""}
        screenName={profile.screenName || ""}
        bio={profile.bio || ""}
      />
      <Section>
        <HeadGroup>
          <Heading level={2} size="medium">
            投稿写真一覧
          </Heading>
        </HeadGroup>
        {photos.length > 0 ? (
          <CardContainer>
            {photos.map((photo) => (
              <PhotoViewModalContainer key={photo.id} photo={photo}>
                <PhotoCard {...photo} />
              </PhotoViewModalContainer>
            ))}
          </CardContainer>
        ) : (
          <Typography>投稿がありません</Typography>
        )}
      </Section>
    </>
  );
}

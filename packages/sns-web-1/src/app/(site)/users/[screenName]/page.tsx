import { notFound } from "next/navigation";
import { CardContainer } from "sns-shared-ui/src/components/CardContainer";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { ProfilePanel } from "sns-shared-ui/src/components/ProfilePanel";
import { Section } from "sns-shared-ui/src/components/Section";
import { Typography } from "sns-shared-ui/src/components/Typography";
import { profiles } from "@/_mock";
import { PhotoViewModalContainer } from "@/app/_components/PhotoViewModalContainer";
import { getPhotos } from "@/services/getPhotos";

type Props = {
  params: { screenName: string };
};

export default async function Page({ params }: Props) {
  // 🚧: ここでプロフィールを取得する
  const profile = profiles.find(
    (profile) => profile.screenName === params.screenName
  );
  if (!profile) {
    notFound();
  }
  // 🚧: 該当ユーザーの投稿写真を取得する
  const { photos } = await getPhotos({ authorId: profile.userId });
  return (
    <>
      <ProfilePanel
        imageUrl={""}
        name={""}
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

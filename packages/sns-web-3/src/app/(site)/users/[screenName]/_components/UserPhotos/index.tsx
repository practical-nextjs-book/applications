import Link from "next/link";
import { CardContainer } from "sns-shared-ui/src/components/CardContainer";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { Section } from "sns-shared-ui/src/components/Section";
import { Typography } from "sns-shared-ui/src/components/Typography";
import { getPhotos } from "@/services/getPhotos";
import { getProfileFromScreenName } from "../../dataFetch";

type Props = {
  screenName: string;
};

export async function UserPhotos({ screenName }: Props) {
  const profile = await getProfileFromScreenName(screenName);
  const { photos } = await getPhotos({
    page: "1",
    take: "15",
    authorId: profile.user.id,
    revalidate: 60 * 60, // 📌: 1時間キャッシュする
  });
  return (
    <>
      <Section>
        <HeadGroup>
          <Heading level={2} size="medium">
            投稿写真一覧
          </Heading>
        </HeadGroup>
        {photos.length > 0 ? (
          <CardContainer>
            {photos.map((photo) => (
              <Link href={`/photos/${photo.id}`} key={photo.id}>
                <PhotoCard {...photo} />
              </Link>
            ))}
          </CardContainer>
        ) : (
          <Typography>投稿がありません</Typography>
        )}
      </Section>
    </>
  );
}

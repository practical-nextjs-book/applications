import Link from "next/link";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { Section } from "sns-shared-ui/src/components/Section";
import type { Photo } from "@/services/type";
import { LikeButtonForm } from "./LikeButtonForm";

type Props = {
  photo: Photo;
  isOwner: boolean;
  liked: boolean;
};

export function PhotoHero({ photo, isOwner, liked }: Props) {
  return (
    <Section>
      <HeadGroup>
        <Heading level={2} size="medium">
          {photo.title}
        </Heading>
        <LikeButtonForm photo={photo} isOwner={isOwner} liked={liked} />
      </HeadGroup>
      <Link href={`/photos/${photo.id}/view`}>
        <PhotoCard
          {...photo}
          size="large"
          showMeta={false}
          actionIcon={{
            iconProps: { type: "zoom", color: "gray" },
          }}
          priority
        />
      </Link>
    </Section>
  );
}

"use client";
// ❌: 不要な use client
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { Section } from "sns-shared-ui/src/components/Section";
import { LikeButtonContainer } from "@/app/_components/LikeButtonContainer";
import { PhotoViewModalContainer } from "@/app/_components/PhotoViewModalContainer";
import type { Photo } from "@/services/type";

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
        <LikeButtonContainer
          id={photo.id}
          count={photo.likedCount}
          disabled={isOwner || liked}
        />
      </HeadGroup>
      <PhotoViewModalContainer photo={photo}>
        <PhotoCard
          {...photo}
          size="large"
          showMeta={false}
          actionIcon={{
            iconProps: { type: "zoom", color: "gray" },
          }}
        />
      </PhotoViewModalContainer>
    </Section>
  );
}

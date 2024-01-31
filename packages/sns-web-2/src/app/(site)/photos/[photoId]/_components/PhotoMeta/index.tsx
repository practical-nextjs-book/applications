import Link from "next/link";
import { Account } from "sns-shared-ui/src/components/Account";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { LinkButton } from "sns-shared-ui/src/components/LinkButton";
import { LinkTag } from "sns-shared-ui/src/components/LinkTag";
import { Section } from "sns-shared-ui/src/components/Section";
import { Typography } from "sns-shared-ui/src/components/Typography";
import type { Category, Photo } from "@/services/type";
import { DeleteButtonContainer } from "./DeleteButtonContainer";
import styles from "./style.module.css";

type Props = {
  photo: Photo;
  category: Category;
  author: {
    id: string;
    name: string | null;
    image: string | null;
    profile: {
      screenName: string | null;
    } | null;
  };
  isOwner: boolean;
};

export function PhotoMeta({ photo, category, author, isOwner }: Props) {
  return (
    <div className={styles.meta}>
      <Section>
        <HeadGroup>
          <Heading level={3} size="small">
            写真の概要
          </Heading>
        </HeadGroup>
        <Typography>{photo.description}</Typography>
      </Section>
      <Section>
        <HeadGroup>
          <Heading level={3} size="small">
            カテゴリー
          </Heading>
        </HeadGroup>
        <LinkTag
          size="large"
          color="white"
          linkProps={{ href: `/categories/${category.name}` }}
        >
          {category.label}
        </LinkTag>
      </Section>
      {!isOwner && author.profile && (
        <Section>
          <HeadGroup>
            <Heading level={3} size="small">
              投稿者
            </Heading>
          </HeadGroup>
          <Link
            className={styles.user}
            href={`/users/${author.profile.screenName}`}
          >
            <Account
              name={author.name}
              screenName={author.profile.screenName}
              imageUrl={author.image}
            />
          </Link>
        </Section>
      )}
      {isOwner && (
        <Section className={styles.ownerActions}>
          <LinkButton href={`/photos/${photo.id}/edit`}>
            投稿を編集する
          </LinkButton>
          <DeleteButtonContainer id={photo.id}>
            写真を削除する
          </DeleteButtonContainer>
        </Section>
      )}
    </div>
  );
}

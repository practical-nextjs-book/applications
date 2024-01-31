import Link from "next/link";
import { Account } from "sns-shared-ui/src/components/Account";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { LinkButton } from "sns-shared-ui/src/components/LinkButton";
import { LinkTag } from "sns-shared-ui/src/components/LinkTag";
import { Section } from "sns-shared-ui/src/components/Section";
import { Typography } from "sns-shared-ui/src/components/Typography";
import { profiles, users } from "@/_mock";
import { getPhotoComments } from "@/services/getPhotoComments";
import type { Author, Category, Photo } from "@/services/type";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { DeleteButtonContainer } from "./DeleteButtonContainer";
import styles from "./style.module.css";

type Props = {
  photo: Photo;
  category: Category;
  author: Author;
  isOwner: boolean;
  isLoggedIn: boolean;
};

export async function PhotoMain({
  photo,
  category,
  author,
  isOwner,
  isLoggedIn,
}: Props) {
  const { comments } = await getPhotoComments(photo.id);
  const authors = users;
  const authorProfile = profiles.find(
    (profile) => profile.userId === author.id,
  );
  return (
    <div className={styles.content}>
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
        {!isOwner && authorProfile && (
          <Section>
            <HeadGroup>
              <Heading level={3} size="small">
                投稿者
              </Heading>
            </HeadGroup>
            <Link
              className={styles.user}
              href={`/users/${authorProfile.screenName}`}
            >
              <Account
                name={author.name}
                screenName={authorProfile.screenName}
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
      <div className={styles.comment}>
        {isLoggedIn && (
          <Section>
            <HeadGroup>
              <Heading level={3} size="small">
                コメント投稿
              </Heading>
            </HeadGroup>
            <CommentForm photo={photo} />
          </Section>
        )}
        <Section>
          <HeadGroup>
            <Heading level={3} size="small">
              コメント一覧
            </Heading>
          </HeadGroup>
          <CommentList comments={comments} authors={authors} />
        </Section>
      </div>
    </div>
  );
}

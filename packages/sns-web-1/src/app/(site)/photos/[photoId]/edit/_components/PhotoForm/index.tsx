"use client";

import { Button } from "sns-shared-ui/src/components/Button";
import { Label } from "sns-shared-ui/src/components/Label";
import { LinkButton } from "sns-shared-ui/src/components/LinkButton";
import { Section } from "sns-shared-ui/src/components/Section";
import { Select } from "sns-shared-ui/src/components/Select";
import { TextArea } from "sns-shared-ui/src/components/TextArea";
import { TextField } from "sns-shared-ui/src/components/TextField";
import type { GetCategoriesResponse } from "@/services/getCategories";
import type { Photo } from "@/services/type";
import { updatePhoto } from "./action";
import styles from "./style.module.css";

type Props = {
  photo: Photo;
  categories: GetCategoriesResponse["categories"];
};

export function PhotoForm({ photo, categories }: Props) {
  const componentId = "PhotoForm";
  const titleId = `${componentId}-title`;
  const categoryId = `${componentId}-categoryId`;
  const descriptionId = `${componentId}-description`;
  return (
    <form action={updatePhoto}>
      <input type="hidden" name="photoId" value={photo.id} />
      <input type="hidden" name="imageUrl" value={photo.imageUrl} />
      <div className={styles.content}>
        <div>
          <Section>
            <Label htmlFor={titleId} size="small" className={styles.heading}>
              タイトル
            </Label>
            <TextField
              id={titleId}
              name="title"
              defaultValue={photo.title}
              className={styles.title}
            />
          </Section>
          <Section>
            <Label htmlFor={categoryId} size="small" className={styles.heading}>
              カテゴリー
            </Label>
            <Select
              id={categoryId}
              name="categoryId"
              defaultValue={photo.categoryId}
              className={styles.category}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </Select>
          </Section>
        </div>
        <div>
          <Section>
            <Label
              size="small"
              className={styles.heading}
              htmlFor={descriptionId}
            >
              写真の概要
            </Label>
            <TextArea
              id={descriptionId}
              name="description"
              defaultValue={photo.description}
              className={styles.description}
            />
          </Section>
        </div>
      </div>
      <Section className={styles.action}>
        <LinkButton href={`/photos/${photo.id}`} color="white">
          写真ページに戻る
        </LinkButton>
        <Button type="submit">写真を更新する</Button>
      </Section>
    </form>
  );
}

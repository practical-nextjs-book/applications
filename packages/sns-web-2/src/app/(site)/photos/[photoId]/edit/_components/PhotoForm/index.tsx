"use client";
import { useFormState } from "react-dom";
import { AlertText } from "sns-shared-ui/src/components/AlertText";
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
import { initialFormState } from "./state";
import styles from "./style.module.css";

const componentId = "PhotoForm";

function PhotoFormTitle({ title, error }: { title: string; error?: string }) {
  const id = `${componentId}-title`;
  return (
    <Section>
      <Label htmlFor={id} size="small" className={styles.heading}>
        タイトル
      </Label>
      <TextField
        id={id}
        className={styles.title}
        name="title"
        defaultValue={title}
      />
      {error && <AlertText>{error}</AlertText>}
    </Section>
  );
}

function PhotoCategory({
  categoryId,
  categories,
}: {
  categoryId: string;
  categories: GetCategoriesResponse["categories"];
}) {
  const id = `${componentId}-categoryId`;
  return (
    <Section>
      <Label htmlFor={id} size="small" className={styles.heading}>
        カテゴリー
      </Label>
      <Select
        id={id}
        className={styles.category}
        name="categoryId"
        defaultValue={categoryId}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </Select>
    </Section>
  );
}

function PhotoDescription({
  description,
  error,
}: {
  description: string;
  error?: string;
}) {
  const id = `${componentId}-description`;
  return (
    <Section>
      <Label size="small" className={styles.heading} htmlFor={id}>
        写真の概要
      </Label>
      <TextArea
        id={id}
        className={styles.description}
        name="description"
        defaultValue={description}
      />
      {error && <AlertText>{error}</AlertText>}
    </Section>
  );
}

type Props = {
  photo: Photo;
  categories: GetCategoriesResponse["categories"];
};

export function PhotoForm({ photo, categories }: Props) {
  const [formState, formDispatch] = useFormState(
    updatePhoto,
    initialFormState({ ...photo }),
  );
  return (
    <form action={formDispatch}>
      <input type="hidden" name="photoId" value={photo.id} />
      <input type="hidden" name="imageUrl" value={photo.imageUrl} />
      <div className={styles.content}>
        <div>
          <PhotoFormTitle
            title={photo.title}
            error={formState?.error?.fieldErrors?.["title"].message}
          />
          <PhotoCategory
            categoryId={photo.categoryId}
            categories={categories}
          />
        </div>
        <div>
          <PhotoDescription description={photo.description} />
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

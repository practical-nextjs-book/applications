"use client";
import { useState, type FormEvent } from "react";
import { useFormState } from "react-dom";
import { AlertText } from "sns-shared-ui/src/components/AlertText";
import { Button } from "sns-shared-ui/src/components/Button";
import { Label } from "sns-shared-ui/src/components/Label";
import { LinkButton } from "sns-shared-ui/src/components/LinkButton";
import { Section } from "sns-shared-ui/src/components/Section";
import { Select } from "sns-shared-ui/src/components/Select";
import { TextArea } from "sns-shared-ui/src/components/TextArea";
import { TextField } from "sns-shared-ui/src/components/TextField";
import { ZodError } from "zod";
import type { GetCategoriesResponse } from "@/services/getCategories";
import type { Photo } from "@/services/type";
import { updatePhoto } from "./action";
import { initialFormState } from "./state";
import styles from "./style.module.css";
import { transformFiledErrors, validateFormData } from "./validate";
import type { FieldErrors } from "./state";

const componentId = "PhotoForm";

function PhotoFormTitle({
  defaultValue,
  error,
}: {
  defaultValue: string;
  error?: string;
}) {
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
        defaultValue={defaultValue}
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
  defaultValue,
  error,
}: {
  defaultValue: string;
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
        defaultValue={defaultValue}
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
  // 【1】Server Action で発生したバリデーションエラーを保持
  const [formState, formDispatch] = useFormState(
    updatePhoto,
    initialFormState({ ...photo })
  );
  // 【2】Client で発生したバリデーションエラーを保持
  const [clientErrors, setClientErrors] = useState<FieldErrors | undefined>(
    formState.error?.fieldErrors
  );
  // 【3】項目別に表示するエラー
  const errors = clientErrors || formState.error?.fieldErrors;
  // 送信前に Client バリデーションを実施
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      const formData = new FormData(event.currentTarget);
      // バリデーションエラーが発生した場合 catch 句へ
      validateFormData(formData);
      // Client バリデーションエラーをクリア
      setClientErrors(undefined);
    } catch (err) {
      // 📌: Form のサブミット（action 実行）を中止
      event.preventDefault();
      if (!(err instanceof ZodError)) throw err;
      // Zod のバリデーションエラーをマッピング
      setClientErrors(transformFiledErrors(err));
    }
  }
  return (
    <form action={formDispatch} onSubmit={handleSubmit}>
      <input type="hidden" name="photoId" value={photo.id} />
      <input type="hidden" name="imageUrl" value={photo.imageUrl} />
      <div className={styles.content}>
        <div>
          <PhotoFormTitle
            defaultValue={photo.title}
            error={errors?.["title"]?.message} // 【3】
          />
          <PhotoCategory
            categoryId={photo.categoryId}
            categories={categories}
          />
        </div>
        <div>
          <PhotoDescription
            defaultValue={photo.description}
            error={errors?.["description"]?.message} // 【3】
          />
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

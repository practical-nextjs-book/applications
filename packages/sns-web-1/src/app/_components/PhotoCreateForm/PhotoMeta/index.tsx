"use client";

import { useEffect, useId, useState } from "react";
import { Button } from "sns-shared-ui/src/components/Button";
import { Label } from "sns-shared-ui/src/components/Label";
import { Select } from "sns-shared-ui/src/components/Select";
import { TextArea } from "sns-shared-ui/src/components/TextArea";
import { TextField } from "sns-shared-ui/src/components/TextField";
import type { GetCategoriesResponse } from "@/services/getCategories";
import styles from "./style.module.css";

type Props = {
  onChange: (state: State) => void;
} & GetCategoriesResponse;
type State = {
  title: string;
  categoryId: string;
  description: string;
};

export function PhotoMeta({ categories, onChange }: Props) {
  const componentId = useId();
  const titleId = `${componentId}-title`;
  const categoryId = `${componentId}-category`;
  const descriptionId = `${componentId}-description`;
  const [state, setState] = useState<State>({
    title: "",
    categoryId: "",
    description: "",
  });
  useEffect(() => {
    onChange(state);
  }, [state, onChange]);

  return (
    <div className={styles.meta}>
      <div className={styles.row}>
        <Label size="xsmall" htmlFor={titleId}>
          タイトル
        </Label>
        <TextField
          className={styles.title}
          id={titleId}
          value={state.title}
          placeholder={"タイトルを入力..."}
          onChange={(event) => {
            setState({ ...state, title: event.target.value });
          }}
        />
      </div>
      <div className={styles.row}>
        <Label size="xsmall" htmlFor={categoryId}>
          カテゴリー
        </Label>
        {categories && (
          <Select
            className={styles.select}
            id={categoryId}
            onChange={(event) => {
              setState({ ...state, categoryId: event.target.value });
            }}
          >
            <option value="">カテゴリーを選択...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </Select>
        )}
      </div>
      <div className={styles.row}>
        <Label size="xsmall" htmlFor={descriptionId}>
          写真の概要
        </Label>
        <TextArea
          className={styles.description}
          id={descriptionId}
          placeholder={"写真の概要を入力..."}
          onChange={(event) => {
            setState({ ...state, description: event.target.value });
          }}
        />
      </div>
      <Button type="submit" color="orange" size="large">
        写真を投稿する
      </Button>
    </div>
  );
}

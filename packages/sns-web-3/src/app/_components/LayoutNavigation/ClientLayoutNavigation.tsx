"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Icon } from "sns-shared-ui/src/components/Icon";
import * as Layout from "sns-shared-ui/src/components/Layout";
import { renderLink } from "sns-shared-ui/src/components/Layout/Navigation";
import { roboto } from "@/app/fonts";
import type { GetCategoriesResponse } from "@/services/getCategories";
import { PhotoCreateModalContainer } from "../PhotoCreateModalContainer";
import styles from "./style.module.css";

type Props = {
  categories: GetCategoriesResponse["categories"];
};

export function ClientLayoutNavigation({ categories }: Props) {
  // 📌: Client レンダリングを活用することで静的レンダリング領域を増やす
  const { data: session } = useSession();
  const currentPathname = usePathname();
  // 📌: next/font で生成されたクラス名を取得する
  const linkClassName = roboto.className;
  return (
    <Layout.Navigation
      linkClassName={linkClassName}
      currentPathname={currentPathname}
    >
      <li className={styles.listitem}>
        {renderLink(currentPathname === "/profile", (attr) => (
          <Link href="/profile" className={linkClassName} {...attr}>
            <Icon type="user" color={Boolean(attr) ? "orange" : "black"} />
            profile
          </Link>
        ))}
      </li>
      <li className={styles.listitem}>
        {/* 📌 ログイン済みの場合モーダルを開き、未ログインの場合ログイン画面へ */}
        {session?.user ? (
          <PhotoCreateModalContainer
            categories={categories}
            toggleClassName={clsx(styles.listitemChild, linkClassName)}
          >
            <Icon type="camera" />
            post
          </PhotoCreateModalContainer>
        ) : (
          <button
            className={clsx(styles.listitemChild, linkClassName)}
            onClick={() => signIn()}
          >
            <Icon type="camera" />
            post
          </button>
        )}
      </li>
    </Layout.Navigation>
  );
}

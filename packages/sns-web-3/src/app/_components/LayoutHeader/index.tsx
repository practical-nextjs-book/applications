"use client";

import { useSession } from "next-auth/react";
import * as Layout from "sns-shared-ui/src/components/Layout";

type Props = {
  showDrawerMenu?: boolean;
};

export function LayoutHeader({ showDrawerMenu }: Props) {
  // 📌: Client レンダリングを活用することで静的レンダリング領域を増やす
  const { data: session } = useSession();
  return (
    <Layout.Header
      isLogin={Boolean(session)}
      avatarImageUrl={session?.user?.image}
      showDrawerMenu={showDrawerMenu}
    />
  );
}

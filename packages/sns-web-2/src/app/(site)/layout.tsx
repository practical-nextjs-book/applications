import * as Layout from "sns-shared-ui/src/components/Layout";
import { getServerSession } from "@/lib/auth";
import { getCategories } from "@/services/getCategories";
import { LayoutNavigation } from "../_components/LayoutNavigation";

type Props = {
  children: React.ReactNode;
};

export default async function SiteLayout({ children }: Props) {
  // ❌: 動的関数を使用しているため、すべてのページが動的レンダリングになる。
  const session = await getServerSession();
  // ❌: Leaf で取得できる
  const { categories } = await getCategories();
  return (
    <Layout.Root>
      <Layout.Header
        isLogin={Boolean(session)}
        avatarImageUrl={session?.user.image}
      />
      <Layout.Container>
        <LayoutNavigation session={session} categories={categories} />
        <Layout.Main>{children}</Layout.Main>
      </Layout.Container>
      <Layout.Footer />
    </Layout.Root>
  );
}

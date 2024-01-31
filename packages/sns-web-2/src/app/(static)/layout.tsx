import * as Layout from "sns-shared-ui/src/components/Layout";
import { getServerSession } from "@/lib/auth";

type Props = {
  children: React.ReactNode;
};

export default async function SiteLayout({ children }: Props) {
  // ❌: Subtree が全て動的レンダリングになる
  const session = await getServerSession();
  return (
    <Layout.Root>
      <Layout.Header
        avatarImageUrl={session?.user.image}
        showDrawerMenu={false}
      />
      <Layout.Container>
        <Layout.Main>{children}</Layout.Main>
      </Layout.Container>
      <Layout.Footer />
    </Layout.Root>
  );
}

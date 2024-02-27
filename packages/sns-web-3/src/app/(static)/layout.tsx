import * as Layout from "sns-shared-ui/src/components/Layout";
import { ClientRootLayout } from "../_components/ClientRootLayout";
import { LayoutHeader } from "../_components/LayoutHeader";

type Props = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Props) {
  // ★: 動的関数使用を避けることで、Subtree の動的レンダリングを回避する
  return (
    <ClientRootLayout>
      <LayoutHeader showDrawerMenu={false} />
      <Layout.Container>
        <Layout.Main>{children}</Layout.Main>
      </Layout.Container>
      <Layout.Footer />
    </ClientRootLayout>
  );
}

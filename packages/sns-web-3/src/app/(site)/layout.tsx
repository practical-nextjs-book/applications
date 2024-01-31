import * as Layout from "sns-shared-ui/src/components/Layout";
import { ClientRootLayout } from "../_components/ClientRootLayout";
import { LayoutHeader } from "../_components/LayoutHeader";
import { LayoutNavigation } from "../_components/LayoutNavigation";
import { PhotoIdsContextProvider } from "../_components/PhotoViewNavigator/provider";

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default async function SiteLayout({ children, modal }: Props) {
  return (
    <PhotoIdsContextProvider>
      {/* 📌 ↑: 写真拡大表示画面キーボード操作のための Provider */}
      <ClientRootLayout>
        <LayoutHeader />
        <Layout.Container>
          <LayoutNavigation />
          <Layout.Main>
            {children}
            {/* 📌 ↓: Parallel & Intercepting Routes によるモーダル表示 */}
            {modal}
          </Layout.Main>
        </Layout.Container>
        <Layout.Footer />
      </ClientRootLayout>
    </PhotoIdsContextProvider>
  );
}

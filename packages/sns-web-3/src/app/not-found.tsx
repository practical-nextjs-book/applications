import * as Layout from "sns-shared-ui/src/components/Layout";
import { NotFound } from "sns-shared-ui/src/components/NotFound";
import { ClientRootLayout } from "./_components/ClientRootLayout";
import { LayoutHeader } from "./_components/LayoutHeader";

export default function NotFoundPage() {
  return (
    <ClientRootLayout>
      <LayoutHeader />
      <Layout.Container>
        <Layout.Main>
          <NotFound />
        </Layout.Main>
      </Layout.Container>
      <Layout.Footer />
    </ClientRootLayout>
  );
}

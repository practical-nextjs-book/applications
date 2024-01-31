import * as Layout from "sns-shared-ui/src/components/Layout";
import { NotFound } from "sns-shared-ui/src/components/NotFound";

export default async function NotFoundPage() {
  return (
    <Layout.Root>
      <Layout.Header showDrawerMenu={false} />
      <Layout.Container>
        <Layout.Main>
          <NotFound />
        </Layout.Main>
      </Layout.Container>
      <Layout.Footer />
    </Layout.Root>
  );
}

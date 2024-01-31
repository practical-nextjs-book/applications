import * as Layout from "sns-shared-ui/src/components/Layout";
import { NotFound } from "sns-shared-ui/src/components/NotFound";
import { getServerSession } from "@/lib/auth";

export default async function NotFoundPage() {
  const session = await getServerSession();
  return (
    <Layout.Root>
      <Layout.Header
        avatarImageUrl={session?.user.image}
        showDrawerMenu={false}
      />
      <Layout.Container>
        <Layout.Main>
          <NotFound />
        </Layout.Main>
      </Layout.Container>
      <Layout.Footer />
    </Layout.Root>
  );
}

import * as Layout from "sns-shared-ui/src/components/Layout";

type Props = {
  children: React.ReactNode;
};

export default async function SiteLayout({ children }: Props) {
  return (
    <Layout.Root>
      <Layout.Header showDrawerMenu={false} />
      <Layout.Container>
        <Layout.Main>{children}</Layout.Main>
      </Layout.Container>
      <Layout.Footer />
    </Layout.Root>
  );
}

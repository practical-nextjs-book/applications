import * as Layout from "sns-shared-ui/src/components/Layout";
import { getCategories } from "@/services/getCategories";
import { LayoutNavigation } from "../_components/LayoutNavigation";

type Props = {
  children: React.ReactNode;
};

export default async function SiteLayout({ children }: Props) {
  const { categories } = await getCategories();
  return (
    <Layout.Root>
      <Layout.Header />
      <Layout.Container>
        <LayoutNavigation categories={categories} /> {/* ★ */}
        <Layout.Main>{children}</Layout.Main>
      </Layout.Container>
      <Layout.Footer />
    </Layout.Root>
  );
}

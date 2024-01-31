import { getCategories } from "@/services/getCategories";
import { ClientLayoutNavigation } from "./ClientLayoutNavigation";

export async function LayoutNavigation() {
  const { categories } = await getCategories();
  return <ClientLayoutNavigation categories={categories} />;
}

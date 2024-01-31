import { getCategories } from "@/services/getCategories";

export async function GET() {
  const categories = await getCategories();
  return Response.json(categories);
}

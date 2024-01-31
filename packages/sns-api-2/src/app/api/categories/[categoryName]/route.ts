import { prisma } from "@/lib/prisma";
import { getPaginationSrc, getPagination } from "@/lib/util/pagination";

export async function GET(
  request: Request,
  { params }: { params: { categoryName: string } },
) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || "1");
  const take = Number(searchParams.get("take") || "10");
  if (isNaN(page) || isNaN(take)) {
    return Response.json(
      { message: "Invalid Params" },
      {
        status: 400,
      },
    );
  }
  const { skip, currentPage } = getPaginationSrc({ page, take });
  const category = await prisma.category.findUnique({
    where: { name: params.categoryName },
    include: {
      photos: {
        take,
        skip,
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { likes: true } } },
      },
      _count: { select: { photos: true } },
    },
  });
  if (!category) {
    return Response.json({ message: "Not Found" }, { status: 404 });
  }
  console.log(
    `GET: /api/categories/${params.categoryName} ${new Date().toISOString()}`,
  );
  return Response.json({
    category: {
      ...category,
      photos: category.photos.map((photo) => ({
        ...photo,
        likedCount: photo._count.likes,
      })),
    },
    ...getPagination({
      take,
      skip,
      currentPage,
      hitCount: category?._count.photos,
    }),
  });
}

import { prisma } from "../../lib/prisma";

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getSingleCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  if (!result) {
    throw new Error("Category not found");
  }

  return result;
};

export const categoryService = {
  getAllCategories,
  getSingleCategory,
};

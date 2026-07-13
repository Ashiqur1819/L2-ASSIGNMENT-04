import { prisma } from "../../lib/prisma";
import { ICategory } from "./category.interface";

const createCategory = async (payload: ICategory) => {
  const isCategoryExists = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (isCategoryExists) {
    throw new Error("Category already exists");
  }

  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

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

const updateCategory = async (
  id: string,
  payload: Partial<ICategory>,
) => {
  const isCategoryExists = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!isCategoryExists) {
    throw new Error("Category not found");
  }

  if (payload.name) {
    const duplicateCategory = await prisma.category.findUnique({
      where: {
        name: payload.name,
      },
    });

    if (duplicateCategory && duplicateCategory.id !== id) {
      throw new Error("Category already exists");
    }
  }

  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteCategory = async (id: string) => {
  const isCategoryExists = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!isCategoryExists) {
    throw new Error("Category not found");
  }

  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
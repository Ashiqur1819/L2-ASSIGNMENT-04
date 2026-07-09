import config from "../../config";
import { prisma } from "../../lib/prisma"
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payload: any) => {

  const {name, email, password, phone, role, status} = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if(isUserExist) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(String(password), Number(config.BCRYPT_SALT_ROUNDS));

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      status
    }
  })

  const user = prisma.user.findUnique({
    where: {
      id: createdUser.id
    },
    omit: {
      password: true
    }
  });

  return user;
}

export const authService = {
  createUserIntoDB
}
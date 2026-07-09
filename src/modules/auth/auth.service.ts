import config from "../../config";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { IRegisterUser } from "./auth.interface";
import { SignOptions } from "jsonwebtoken";
import { createToken } from "../../utils/createToken";

const createUserIntoDB = async (payload: IRegisterUser) => {
  const { name, email, password, phone, role, status } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    String(password),
    Number(config.BCRYPT_SALT_ROUNDS),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      status,
    },
  });

  const user = prisma.user.findUnique({
    where: {
      id: createdUser.id,
    },
    omit: {
      password: true,
    },
  });

  return user;
};

const loginUser = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  if (user.status === "BLOCKED") {
    throw new Error("User is blocked");
  }

  const isPasswordCorrect = await bcrypt.compare(
    String(payload.password),
    String(user.password),
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET,
    config.JWT_ACCESS_EXPIRATION as SignOptions,
  );

  const { password: _, ...data } = user;

  return { data, accessToken };
};

export const authService = {
  createUserIntoDB,
  loginUser,
};

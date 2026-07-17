import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import handlePrismaError from "../errors/handlePrismaError";
import { Prisma } from "../../generated/prisma/client";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);

  let statusCode = 500;
  let message = "Internal Server Error";

  // Prisma Error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(error);

    statusCode = prismaError.statusCode;
    message = prismaError.message;
  }

  // JWT Error
  else if (error instanceof jwt.JsonWebTokenError) {
    statusCode = 401;
    message = "Invalid Token";
  }

  // Token Expired
  else if (error instanceof jwt.TokenExpiredError) {
    statusCode = 401;
    message = "Token Expired";
  }

  // Normal Error
  else if (error instanceof Error) {
    message = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;

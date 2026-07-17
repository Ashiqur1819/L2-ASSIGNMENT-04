import { Prisma } from "../../generated/prisma/client";


const handlePrismaError = (error: Prisma.PrismaClientKnownRequestError) => {
  let statusCode = 400;
  let message = "Database Error";

  switch (error.code) {
    case "P2002":
      message = `Duplicate value for ${error.meta?.target}`;
      break;

    case "P2025":
      statusCode = 404;
      message = "Record not found";
      break;

    case "P2003":
      message = "Foreign key constraint failed";
      break;

    case "P2014":
      message = "Invalid relation data";
      break;

    default:
      message = error.message;
      break;
  }

  return {
    success: false,
    statusCode,
    message,
  };
};

export default handlePrismaError;
import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { verifyToken } from "../utils/tokenVerify";
import httpStatus from "http-status";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        name: string;
        email: string;
        role: Role;
      };
    }
  }
}

export const auth = (...requiredRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.accessToken;

      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized. No token provided" });
      }

      const verifiedToken = verifyToken(
        token,
        config.JWT_ACCESS_SECRET as string,
      );

      if (!verifiedToken.success || typeof verifiedToken.decoded === "string") {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "Unauthorized. Invalid token" });
      }

      const { id, email, role } = verifiedToken.decoded as JwtPayload;

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: "Forbidden. Insufficient permissions" });
      }

      const user = await prisma.user.findUnique({
        where: {
          id,
          email,
        },
      });

      if (!user) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "Unauthorized. User not found" });
      }

      if (user.status === "BLOCKED") {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: "User is blocked. Please contact support." });
      }

      req.user = {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      next();
    } catch (error) {
      console.error("Error in auth middleware:", error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
};

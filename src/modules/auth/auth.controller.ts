import { Request, Response } from "express";
import { authService } from "./auth.service";
import httpStatus from "http-status";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.createUserIntoDB(req.body);

    res.status(httpStatus.CREATED).json({
      sucess: true,
      status: httpStatus.CREATED,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to create user",
      error: error,
    });
  }
};

export const authController = {
  createUser,
};

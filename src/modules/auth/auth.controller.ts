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
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message as Error,
      error: error,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUser(req.body);

    const { accessToken } = result;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message as Error,
      error: error,
    });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const user = await authService.getMe(userId as string);

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    console.error("Error in getMe controller:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message as Error,
      error: error,
    });
  }
};

export const authController = {
  createUser,
  loginUser,
  getMe,
};

import { Request, Response } from "express";
import httpStatus from "http-status";
import { ServiceService } from "./service.service";

const createService = async (req: Request, res: Response) => {
  try {
    const result = await ServiceService.createService(
      req.user!.userId,
      req.body,
    );

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Service created successfully",
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

// const updateService = async (req: Request, res: Response) => {
//   try {
//     const result = await ServiceService.updateService(
//       req.user!.userId,
//       req.params.id as string,
//       req.body,
//     );

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Service updated successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(httpStatus.BAD_REQUEST).json({
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Something went wrong",
//     });
//   }
// };

// const deleteService = async (req: Request, res: Response) => {
//   try {
//     await ServiceService.deleteService(req.user!.userId, req.params.id as string);

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Service deleted successfully",
//     });
//   } catch (error) {
//     res.status(httpStatus.BAD_REQUEST).json({
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Something went wrong",
//     });
//   }
// };

// const getMyServices = async (req: Request, res: Response) => {
//   try {
//     const result = await ServiceService.getMyServices(req.user!.userId);

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "My services retrieved successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(httpStatus.BAD_REQUEST).json({
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Something went wrong",
//     });
//   }
// };

// const getAllServices = async (req: Request, res: Response) => {
//   try {
//     const result = await ServiceService.getAllServices();

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Services retrieved successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Something went wrong",
//     });
//   }
// };

// const getSingleService = async (req: Request, res: Response) => {
//   try {
//     const result = await ServiceService.getSingleService(req.params.id as string);

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Service retrieved successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(httpStatus.NOT_FOUND).json({
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Something went wrong",
//     });
//   }
// };

export const ServiceController = {
  createService,
//   updateService,
//   deleteService,
//   getMyServices,
//   getAllServices,
//   getSingleService,
};
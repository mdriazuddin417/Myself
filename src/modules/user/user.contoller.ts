import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response,) => {
    const result = await UserService.createUser(req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Updated Successfully",
        data: result,
    })
})

const getAllFromDB = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getAllFromDB()
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getUserById(String(req.params.id))
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.updateUser(String(req.params.id), req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Updated Successfully",
        data: result,
    })
})

const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await UserService.deleteUser(String(req.params.id))
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const UserController = {
    createUser,
    getAllFromDB,
    getUserById,
    updateUser,
    deleteUser
}
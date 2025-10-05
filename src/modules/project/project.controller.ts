import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { projectSchema, ProjectService } from './project.service';




const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.createProject(req, res);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Updated Successfully",
    data: result,
  })
})
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const parsed = projectSchema.partial().safeParse(payload);

  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid input', issues: parsed.error.format() });
    return;
  }

  const result = await ProjectService.updateProject(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Updated Successfully",
    data: result,
  });
});


const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectService.deleteProject(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project Deleted Successfully",
    data: result,
  })
})
const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProjects();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects Retrieved Successfully",
    data: result,
  })
})


const getProjectBySlug = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectService.getProjectBySlug(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project Retrieved Successfully",
    data: result,
  })
})


export const ProjectController = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectBySlug
}
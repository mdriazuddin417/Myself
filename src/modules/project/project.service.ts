import { Project } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { z } from 'zod';
import { prisma } from '../../config/db';
import AppError from '../../errorHelpers/AppError';


export const projectSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(1),
    features: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    slug: z.string().optional(),
    startDate: z.string().optional(),
    images: z.array(z.string().url()),
    technologies: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    userId: z.string().optional(),
})

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // remove special chars
        .replace(/\s+/g, "-") // spaces → dashes
        .replace(/-+/g, "-") // multiple dashes → single dash
}

export async function createProject(req: Request, res: Response) {
    const parsed = projectSchema.safeParse(req.body)
    console.log({ parsed, body: req.body });
    if (!parsed.success) {
        return res.status(400).json({
            error: "Invalid input",
            issues: parsed.error.format(),
        })
    }
    let slug: string = generateSlug(parsed.data.title)

    const existing = await prisma.project.findUnique({ where: { slug } })
    if (existing) {
        slug = `${slug}-${Date.now()}` // fallback: add timestamp
    }

    const project = await prisma.project.create({
        data: {
            ...parsed.data,
            slug,
            userId: parsed.data.userId as string,
            longDescription: parsed.data.description as string ?? "", // Provide a default or parse from req.body
            startDate: new Date(), // Provide a default or parse from req.body
        },
    })

    return project;
}

async function updateProject(id: string, payload: Partial<Project>) {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
        throw new AppError(httpStatus.BAD_REQUEST, "Project not found")
    }

    const updated = await prisma.project.update({ where: { id }, data: payload });
    return updated;

}

async function deleteProject(id: string) {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
        throw new AppError(httpStatus.NOT_FOUND, "Parcel not found");
    }
    await prisma.project.delete({ where: { id } });
    return true
}

async function getAllProjects() {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    return projects
}

async function getProjectBySlug(id: string) {
    const project = await prisma.project.findUnique({ where: { id } });
    // const project = await prisma.project.findUnique({ where: { slug }, include: { owner: true } });
    if (!project) throw new AppError(httpStatus.NOT_FOUND, "Project not found");
    return project;
}

export const ProjectService = {
    createProject,
    updateProject,
    deleteProject,
    getAllProjects,
    getProjectBySlug
}
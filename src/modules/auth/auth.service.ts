import { z } from "zod";
import { prisma } from "../../config/db";

const registerUserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    phone: z.string().min(10),
    picture: z.string().url().optional()
});

const registerUser = async (payload: { name: string, email: string, password: string, phone: string, picture: string }) => {
    const parsed = registerUserSchema.safeParse(payload);
    if (!parsed.success) {
        throw new Error(`Invalid input: ${parsed.error.issues.map(issue => issue.message).join(", ")}`);
    }

    const user = await prisma.user.create({
        data: parsed.data
    });

    return user
}

const loginWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("User not found!")
    }

    if (password === user.password) {
        return user
    }
    else {
        throw new Error("Password is incorrect!")
    }
}


export const AuthService = {
    registerUser,
    loginWithEmailAndPassword,
}


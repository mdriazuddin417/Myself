import { Router } from "express"
import { AuthRouter } from "../modules/auth/auth.route"
import { PostRouter } from "../modules/post/post.route"
import { ProjectRouter } from "../modules/project/project.route"
import { UserRouter } from "../modules/user/user.route"

export const router = Router()

const moduleRoutes = [

    {
        path: "/auth",
        route: AuthRouter
    },
    {
        path: "/user",
        route: UserRouter
    },
    {
        path: "/post",
        route: PostRouter
    },
    {
        path: "/project",
        route: ProjectRouter
    },


]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})


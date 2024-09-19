import { Router } from "express";
import { FacilityRoutes } from "../modules/Facility/facility.route";
import { AuthRoutes } from "../modules/Auth/auth.route";


const router = Router()

const moduleRoutes = [
    {
        path:'/auth',
        route: AuthRoutes
    },
    {
        path:'/facility',
        route: FacilityRoutes
    },
  
]

moduleRoutes.forEach((route)=>router.use(route.path, route.route))

export default router
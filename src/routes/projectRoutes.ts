import { Router } from "express"
import { body } from 'express-validator'
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middlewares/validation";

const router = Router()


router.get('/', ProjectController.getAllProjects)

router.post('/',
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto debe ser obligatorio'),
    body('clienteName')
        .notEmpty().withMessage('El nombre del cliente debe ser obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion del proyecto debe ser obligatorio'),
    handleInputErrors,
    ProjectController.createProject)



export default router


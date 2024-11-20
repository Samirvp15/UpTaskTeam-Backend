import { Router } from "express"
import { body, param } from 'express-validator'
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middlewares/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middlewares/project";

const router = Router()


router.get('/', ProjectController.getAllProjects)

router.get('/:id',
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.getProjectById)

router.post('/',
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto debe ser obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente debe ser obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion del proyecto debe ser obligatorio'),
    handleInputErrors,
    ProjectController.createProject)


router.put('/:id',
    param('id').isMongoId().withMessage('ID no valido'),
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto debe ser obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente debe ser obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion del proyecto debe ser obligatorio'),
    handleInputErrors,
    ProjectController.updateProject)


router.delete('/:id',
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.deleteProject)


// ROUTES FOR TASKS

router.post('/:projectId/tasks',
    validateProjectExists,
    TaskController.createTask
)

export default router


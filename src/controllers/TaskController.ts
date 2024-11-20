import type { Request, Response } from 'express'
import Project from '../models/Project'
import Task from '../models/Task'


export class TaskController {

    static createTask= async (req: Request, res: Response) => {

        const { projectId } = req.params
        const project = await Project.findById(projectId)
        
        if (!project) {
            const error = new Error('Proyecto no encontrado')
            res.status(404).json({ error: error.message })
            return
        }
        
        try {
            const task = new Task(req.body)
            // ASIGNAR PROYECTO A TAREA
            task.project = project.id
           // AGREGAR UNA TAREA O ARRAY DE TAREAS A PROYECTO
            project.tasks.push(task.id)
            await task.save()
            await project.save()
            res.send('Tarea creada correctamente')

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error en el Servidor' })
        }


    }
}


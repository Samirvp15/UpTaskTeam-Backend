import type { Request, Response } from 'express'
import Project from '../models/Project'
import Task from '../models/Task'


export class TaskController {

    static createTask = async (req: Request, res: Response) => {


        try {
            const task = new Task(req.body)
            // ASIGNAR PROYECTO A TAREA
            task.project = req.project.id
            // AGREGAR UNA TAREA O ARRAY DE TAREAS A PROYECTO
            req.project.tasks.push(task.id)
            //MEJORAR LA PERFORMANCE DE LOS AWAIT
            await Promise.allSettled([task.save(), req.project.save()])
            res.send('Tarea creada correctamente')

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error en el Servidor' })
        }


    }

    static getProjectTasks = async (req: Request, res: Response) => {

        try {

            const tasks = await Task.find({ project: req.project.id }).populate('project')
            res.json(tasks)

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error en el Servidor' })
        }
    }

    static getTaskById = async (req: Request, res: Response) => {

        try {
            const { taskId } = req.params

            const task = await Task.findById(taskId)

            if (!task) {
                const error = new Error('Tarea no encontrada')
                res.status(404).json({ error: error.message })
                return
            }

            if (task.project.toString() !== req.project.id) {
                const error = new Error('Accion no valida')
                res.status(400).json({ error: error.message })
                return
            }

            res.json(task)

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error en el Servidor' })
        }
    }

}

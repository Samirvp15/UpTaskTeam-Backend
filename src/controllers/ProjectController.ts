import { Request, Response } from 'express'
import Project from '../models/Project'


export class ProjectController {

    static getAllProjects = async (req: Request, res: Response) => {

        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error en el Servidor' })
        }

    }

    static createProject = async (req: Request, res: Response) => {

        const project = new Project(req.body)

        try {
            await project.save()
            res.send(' projecto creado')

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error en el Servidor' })
        }


    }

    static getProjectById = async (req: Request, res: Response) => {

        const { id } = req.params
        try {
            const project = await Project.findById(id).populate('tasks')

            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).json({ error: error.message })
                return
            }

            res.json(project)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error en el Servidor' })
        }

    }

    static updateProject = async (req: Request, res: Response) => {

        const { id } = req.params
        try {

            const project = await Project.findById(id)

            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).json({ error: error.message })
                return
            }

            project.clientName = req.body.clientName
            project.projectName = req.body.projectName
            project.description = req.body.description
            await project.save()
            res.send('Proyecto Actualizado')

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error en el Servidor' })
        }

    }


    static deleteProject = async (req: Request, res: Response) => {

        const { id } = req.params
        try {
            const project = await Project.findById(id)

            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).json({ error: error.message })
                return
            }

            await project.deleteOne()
            res.json('Proyecto Eliminado')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error en el Servidor' })
        }

    }



}
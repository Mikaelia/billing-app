import express from 'express'
import cors from 'cors'
import { createProject, getProject, getProjects, updateProject } from './util'
import { reset } from './db/db'

const app = express()
app.use(cors())
app.use(express.json())

const port = 8080
const dbString = '../database.txt'

/** Admin endpoint for resetting the database */
app.get('/reset', (req, res) => {
  reset(dbString)
  res.send('Reset database')
})

/** Returns the project with the given ID */
app.get('/:projectId', (req, res) => {
  res.json({ project: getProject(dbString, req.params.projectId) })
})

/** Updates the project with the given ID and returns the updated project */
app.post('/:projectId', (req, res) => {
  const project = req.body.project
  res.json({ project: updateProject(dbString, project) })
})

/** Returns all projects in the database */
app.get('/', (req, res) => {
  const allProjects = getProjects(dbString)
  const projects = allProjects.map((project) => ({
    id: project.id,
    title: project.title,
  }))
  res.json({ projects })
})

/** Creates a new project in the database and returns it */
app.post('/', (req, res) => {
  res.json({ project: createProject(dbString) })
})

module.exports = app

app.listen(port, () => {
  console.log(`Billing is running on port ${port}.`)
})

import axios from 'axios'
import { Project } from './types'

const BASE_URL = 'http://localhost:8080'

/** The API for the app, for querying, creating and updating projects and invoices */
class InvoicelyApi {
  /** Returns the ID and title of every existing project */
  static async getProjects() {
    try {
      const req = await axios.get(BASE_URL)
      const { projects } = req.data
      return projects
    } catch (err) {
      throw new Error('Unable to fetch projects')
    }
  }

  static async createProject(projectData: Project) {
    try {
      const req = await axios.post(BASE_URL)
      const { project } = req.data
      return this.updateProject(project.id, { ...projectData, id: project.id })
    } catch (err) {
      throw new Error('Unable to create project')
    }
  }

  static async getProject(id: string) {
    try {
      const req = await axios.get(`${BASE_URL}/${id}`)
      const { project } = req.data
      return project
    } catch (err) {
      throw new Error(`Unable to fetch project ${id}`)
    }
  }
  // do the project updating here?
  static async updateProject(id: string, projectData: Project) {
    try {
      const req = await axios.post(`${BASE_URL}/${id}`, { project: projectData })
      const { project } = req.data
      return project
    } catch (err) {
      throw new Error('Unable to update project')
    }
  }
}

export default InvoicelyApi

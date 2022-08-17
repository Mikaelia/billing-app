import axios from 'axios'

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

  static async getProject(id:string) {
    try {
      const req = await axios.get(`${BASE_URL}/${id}`)
      const { project } = req.data
      return project
    } catch (err) {
      throw new Error('Unable to fetch project')
    }
  }
}

export default InvoicelyApi

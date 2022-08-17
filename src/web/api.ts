import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

type LineItem = {
    id: string,
    description: string,
    amount: number
}

type Invoice = {
    id: string,
    lineItems: LineItem[]
}
type Project = {
    id: string,
    title: string,
    invoice: Invoice
}

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
  // do the project updating here?
  static async updateProject(id: string, projectData: Project) {
    console.log(id, projectData)
    try {
      const req = await axios.post(`${BASE_URL}/${id}`, 
        {project: projectData}
      )
      const { project } = req.data
      return project
    } catch (err) {
      throw new Error('Unable to fetch project')
    }
  }
}

export default InvoicelyApi

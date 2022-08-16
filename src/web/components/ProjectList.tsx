import { useEffect, useState } from 'react'
import '../style/ProjectList.css'
import InvoicelyApi from '../api'

interface HomepageProject {
  id: string
  title: string
}

/** Homepage list of all invoiced projects that have been created */
export default function ProjectList() {
  const [projects, setProjects] = useState<HomepageProject[]>([])

  // Fetch all projects from the API
  useEffect(() => {
    async function fetchProjects() {
      const projects = await InvoicelyApi.getProjects()
      setProjects(projects)
    }

    fetchProjects()
  }, [])

  return (
    <div className="ProjectList">
      <h1 className="ProjectList__header">All projects</h1>
      {projects.map((project) => (
        <div key={project.id} className="ProjectList__projectCard">
          {project.title}
        </div>
      ))}
    </div>
  )
}

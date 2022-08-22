import styled from 'styled-components'
import { useEffect, useState } from 'react'
import InvoicelyApi from '../api'

import ProjectsPanel from './ProjectsPanel'
import NewProjectPanel from './NewProjectPanel'

import type { Project } from '../types'

const StyledHomePage = styled.div`
  display: flex;
  width: 100%;
`

function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState(null)

  useEffect(() => {
    async function fetchProjects() {
      const projects = await InvoicelyApi.getProjects()
      setProjects(projects)
    }
    fetchProjects()
  }, [newProject])

  const handleProjectsUpdate = async (project: Project) => {
    const newProject = await InvoicelyApi.createProject(project)
    setNewProject(newProject)
  }

  return (
    <StyledHomePage>
      <ProjectsPanel projects={projects}></ProjectsPanel>
      <NewProjectPanel changeHandler={handleProjectsUpdate}></NewProjectPanel>
    </StyledHomePage>
  )
}

export default HomePage

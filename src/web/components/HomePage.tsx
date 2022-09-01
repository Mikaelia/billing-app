import styled from 'styled-components'
import { useEffect, useState } from 'react'
import BillingApi from '../api'

import ProjectsPanel from './ProjectsPanel'
import NewProjectPanel from './NewProjectPanel'

import type { Project } from '../types'

const StyledHomePage = styled.div`
  display: flex;
  width: 100%;
`
/** Homepage - handles project api calls */
function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState(null)

  useEffect(() => {
    async function fetchProjects() {
      const projects = await BillingApi.getProjects()
      setProjects(projects)
    }
    fetchProjects()
  }, [newProject])

  /** Updates project once handler is called from child */
  const handleProjectsUpdate = async (project: Project) => {
    const newProject = await BillingApi.createProject(project)
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

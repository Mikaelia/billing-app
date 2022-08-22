import styled from 'styled-components'
import { useEffect, useState } from 'react'
import InvoicelyApi from '../api'

import ProjectsPanel from './ProjectsPanel'
import NewProjectPanel from './NewProjectPanel'

const StyledHomePage = styled.div`
  display: flex;
  width: 100%;
`

type LineItem = {
  id: string
  description: string
  amount: number
}

type Invoice = {
  id: string
  lineItems: LineItem[]
}

type Project = {
  id: string
  title: string
  invoice: Invoice
}

function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [state, setState] = useState(0)

  useEffect(() => {
    async function fetchProjects() {
      const projects = await InvoicelyApi.getProjects()
      setProjects(projects)
    }
    fetchProjects()
  }, [state])

  const handleProjectsUpdate = () => {
    setState(state + 1)
  }

  return (
    <StyledHomePage>
      <ProjectsPanel projects={projects}></ProjectsPanel>
      <NewProjectPanel changeHandler={() => handleProjectsUpdate()}></NewProjectPanel>
    </StyledHomePage>
  )
}

export default HomePage

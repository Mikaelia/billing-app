import { useEffect, useState } from 'react'
import InvoicelyApi from '../api'
import { Link } from 'react-router-dom'
import ItemCard from './ItemCard'
import styled from 'styled-components'

const StyledProjectList = styled.div`
  border-top: ${(props) => props.theme.border};
`

// revisit this --- when to use interface not type
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
    <StyledProjectList>
      {projects.map((project) => (
        <ItemCard key={project.id} url={`/invoices/${project.id}`} title={project.title}></ItemCard>
      ))}
    </StyledProjectList>
  )
}

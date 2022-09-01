import { Link } from 'react-router-dom'
import styled from 'styled-components'

import ItemCard from './ItemCard'

import type { Project } from '../types'

const StyledProjectList = styled.div`
  border-top: ${(props) => props.theme.border};
`

type Props = {
  projects: Project[]
}

export default function ProjectList({ projects }: Props) {
  return (
    <StyledProjectList>
      {projects.map((project) => (
        <Link to={`/invoice/${project.id}`}>
          <ItemCard key={project.id} title={project.title}></ItemCard>
        </Link>
      ))}
    </StyledProjectList>
  )
}

import styled from 'styled-components'

import ProjectList from './ProjectList'

import type { Project } from '../types'

const StyledProjectsPanel = styled.div`
  display: flex;
  flex-direction: column;
  border-right: ${(props) => props.theme.border};
  min-width: 50%;
  max-width: 600px;

  h1 {
    padding: 3rem;
    font-size: ${(props) => props.theme.fontSizes.heading1};
    font-weight: 500;
  }
`

type Props = {
  projects: Project[]
}

export default function ProjectsPanel({ projects }: Props) {
  // console.log(projects)
  return (
    <StyledProjectsPanel>
      <h1>Billing</h1>
      <ProjectList projects={projects}></ProjectList>
    </StyledProjectsPanel>
  )
}

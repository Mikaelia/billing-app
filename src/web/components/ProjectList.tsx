import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ItemCard from './ItemCard'
import styled from 'styled-components'

const StyledProjectList = styled.div`
  border-top: ${(props) => props.theme.border};
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

type Props = {
  projects: Project[]
}

/** Homepage list of all invoiced projects that have been created */
export default function ProjectList({ projects }: Props) {
  return (
    <StyledProjectList>
      {projects.map((project) => (
        <Link to={`/invoices/${project.id}`}>
          <ItemCard key={project.id} title={project.title}></ItemCard>
        </Link>
      ))}
    </StyledProjectList>
  )
}

import { useState, useEffect } from 'react'
import styled from 'styled-components'

import LineItemList from './LineItemList'
import Button from './Button'

const StyledInvoicePanel = styled.div`
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

type LineItem = {
  id: string
  description: string
  amount: number
}

type Invoice = {
  id: string
  lineItems: LineItem[]
}
// prob want to convert to TS
type Project = {
  id: string
  title: string
  invoice: Invoice
}

type Props = {
  project: Project
  handleAdd: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export default function InvoicePanel({ project, handleAdd }: Props) {
  const [projectData, setProjectData] = useState<Project | null>(null)

  useEffect(() => {
    setProjectData(project)
  }, [project])

  return projectData ? (
    <StyledInvoicePanel>
      <h1>{projectData.title}</h1>
      <Button onClick={handleAdd}>Add New</Button>
      <LineItemList lineItems={projectData.invoice.lineItems}></LineItemList>
    </StyledInvoicePanel>
  ) : (
    <div>No Project Found</div>
  )
}
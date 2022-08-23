import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import LineItemList from './LineItemList'
import Button from './Button'

import type { Project } from '../types'

const StyledInvoicePanel = styled.div`
  display: flex;
  flex-direction: column;
  border-right: ${(props) => props.theme.border};
  min-width: 50%;
  max-width: 600px;

  .header {
    padding: 2rem 3rem;
    padding-bottom: 5rem;
    position: relative;
  }

  h1 {
    font-size: ${(props) => props.theme.fontSizes.heading1};
    font-weight: 500;
  }

  p {
    font-size: ${(props) => props.theme.fontSizes.bodyLarge};
    margin-top: 1rem;
  }

  button {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }

  button span {
    margin-right: 5px;
  }
`

type Props = {
  project: Project
  handleAdd: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export default function InvoicePanel({ project, handleAdd }: Props) {
  const [projectData, setProjectData] = useState<Project | null>(null)

  const { itemId } = useParams()

  useEffect(() => {
    setProjectData(project)
  }, [project])

  return projectData ? (
    <StyledInvoicePanel>
      <div className="header">
        <h1>Invoice</h1>
        <p>{projectData.title}</p>
        <Button onClick={handleAdd}>
          <span>+</span> Add Expense
        </Button>
      </div>
      <LineItemList activeItemId={itemId} lineItems={projectData.invoice.lineItems}></LineItemList>
    </StyledInvoicePanel>
  ) : (
    <div>No Project Found</div>
  )
}

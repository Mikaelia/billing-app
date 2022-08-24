import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

import InvoicePanel from './InvoicePanel'
import NewLineItemForm from './NewLineItemForm'
import EditLineItemForm from './EditLineItemForm'
import StyledDetailPanel from './StyledDetailPanel'
import Spinner from './Spinner'

import InvoicelyApi from '../api'

import type { Project, LineItem } from '../types'
export type Action = 'viewing' | 'editing' | undefined

const StyledSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`
/** Invoice page - handles page state and api calls relating to updates in line items */
export default function InvoicePage() {
  const [project, setProject] = useState<Project | null>(null)
  const [currentLineItem, setCurrentLineItem] = useState<LineItem | undefined>(undefined)
  const [action, setAction] = useState<Action>()

  const navigate = useNavigate()
  const { id: projectId, itemId } = useParams()

  /** Fetches project based on id from url param */
  useEffect(() => {
    const fetchProjects = async () => {
      const project = await InvoicelyApi.getProject(projectId!)
      setProject(project)
    }
    fetchProjects()
  }, [projectId])

  /** If there is an itemId in the url params, sets the current item */
  useEffect(() => {
    if (project) {
      const currentLineItem = project.invoice.lineItems.filter((v) => v.id === itemId)[0]
      setCurrentLineItem(currentLineItem)
    }
  }, [project, itemId])

  /** Opens detail panel of first item in list if page is not in an editing state, and an item is not already being viewed */
  useEffect(() => {
    if (project && !action && !itemId) {
      const firstItem = project.invoice.lineItems[0]
      navigate(`/invoice/${project!.id}/item/${firstItem.id}`)
    }
  }, [project])

  /** Sets page action to editing and navigates away from any opened items */
  const toggleEditingState = () => {
    // might want to update url for editing
    navigate(`/invoice/${project!.id}`)
    setAction('editing')
  }

  /** Api Actions */

  const deleteLineItem = async (id: string) => {
    if (project) {
      const newProject: Project = { ...project }
      newProject.invoice.lineItems = newProject.invoice.lineItems.filter((v) => v.id !== id)

      const updatedProject = await InvoicelyApi.updateProject(id!, newProject!)
      setProject(updatedProject)
    }
  }

  const createLineItem = async (item: LineItem) => {
    if (project) {
      const newProject: Project = { ...project }
      newProject!.invoice.lineItems.push(item)

      const updatedProject = await InvoicelyApi.updateProject(item.id, newProject!)
      setProject(updatedProject)
    }
  }

  const editInvoiceItem = async (item: LineItem) => {
    if (project) {
      const lineItems = project!.invoice.lineItems.map((v) => {
        if (v.id === item.id) {
          return item
        } else return v
      })

      const newProject = {
        ...project,
        invoice: { ...project.invoice, lineItems },
      }

      const updatedProject = await InvoicelyApi.updateProject(project.id, newProject!)
      setProject(updatedProject)
    }
  }
  return project ? (
    <>
      <InvoicePanel handleCtaClick={toggleEditingState} project={project}></InvoicePanel>
      {currentLineItem ? (
        <StyledDetailPanel title={currentLineItem.description}>
          <EditLineItemForm
            handleEdit={editInvoiceItem}
            handleDelete={deleteLineItem}
            item={currentLineItem}
          ></EditLineItemForm>
        </StyledDetailPanel>
      ) : action === 'editing' ? (
        <StyledDetailPanel title="Add item">
          <NewLineItemForm handleNew={createLineItem}></NewLineItemForm>
        </StyledDetailPanel>
      ) : (
        // Would want to eventually create an empty state UI
        <span>There are no invoice Items</span>
      )}
    </>
  ) : (
    <StyledSpinner style={{ height: '100vh', width: '100vh' }}>
      <Spinner></Spinner>
    </StyledSpinner>
  )
}

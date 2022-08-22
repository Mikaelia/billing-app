import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import InvoicePanel from './InvoicePanel'
import InvoiceItemDetailPanel from './InvoiceItemDetailPanel'
import CreateLineItemForm from './CreateLineItemForm'
import EditInfoPanel from './EditInfoPanel'

import InvoicelyApi from '../api'

import type { Project, LineItem } from '../types'

export default function InvoicePage() {
  const [project, setProject] = useState<Project | null>(null)
  const [currentLineItem, setCurrentLineItem] = useState<LineItem | undefined>(undefined)
  // replace with action
  const [count, setCount] = useState(0)
  const [action, setAction] = useState('viewing')
  const navigate = useNavigate()
  const { id: projectId, itemId } = useParams()

  /** Fetches project based on id from url param */
  useEffect(() => {
    const fetchProjects = async () => {
      const project = await InvoicelyApi.getProject(projectId!)
      setProject(project)
    }
    fetchProjects()
    console.log('RERENDER')
    console.log(project)
  }, [projectId, count])

  /** If there's an itemId in the url params, stores the current item */
  useEffect(() => {
    if (project) {
      const currentLineItem = project.invoice.lineItems.filter((v) => v.id === itemId)[0]
      setCurrentLineItem(currentLineItem)
      console.log(currentLineItem)
    }
  }, [project, itemId])

  const handleChange = () => {
    console.log('change')
    setCount(count + 1)
    console.log(count)
  }

  const deleteInvoiceItem = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    if (project) {
      // needed?
      const newProject: Project = { ...project }
      newProject.invoice.lineItems = newProject.invoice.lineItems.filter((v) => v.id !== id)

      const updatedProject = await InvoicelyApi.updateProject(id!, newProject!)
      setProject(updatedProject)
    }
  }

  const handleAdd = () => {
    // might want to add url for editing
    navigate(`/invoices/${project!.id}`)
    setAction('creating')
  }

  /** FOR FORM TO HANDLE */
  const handleNewItem = async (item: LineItem) => {
    if (project) {
      const newProject: Project = { ...project }
      newProject!.invoice.lineItems.push(item)

      const updatedProject = await InvoicelyApi.updateProject(item.id, newProject!)
      setProject(updatedProject)
    }
  }

  const editInvoiceItem = async (e: React.FormEvent, item: LineItem) => {
    e.preventDefault()

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

  // create an editing and adding state
  return project ? (
    <>
      <InvoicePanel handleAdd={handleAdd} project={project}></InvoicePanel>
      {currentLineItem ? (
        <InvoiceItemDetailPanel
          editInvoiceItem={editInvoiceItem}
          deleteInvoiceItem={deleteInvoiceItem}
          item={currentLineItem}
        ></InvoiceItemDetailPanel>
      ) : action === 'creating' ? (
        <CreateLineItemForm changeHandler={handleNewItem}></CreateLineItemForm>
      ) : (
        <EditInfoPanel></EditInfoPanel>
      )}
    </>
  ) : (
    <div>ERROR NO PROJECT</div>
  )
}

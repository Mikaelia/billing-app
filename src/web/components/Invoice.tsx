import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import InvoicelyApi from '../api'

type LineItem = {
    id: string,
    description: string,
    amount: number
}

type Invoice = {
    id: string,
    lineItems: LineItem[]
}
// prob want to convert to TS
type Project = {
    id: string,
    title: string,
    invoice: Invoice
}


export default function Invoice() {
    const [project, setProject] = useState<Project | null>(null)
    const [invoiceData, setInvoiceData] = useState<Invoice | null>(null)

    const { id } = useParams();

  // Fetch all projects from the API
  useEffect(() => {
    async function fetchProjects() {
      const project = await InvoicelyApi.getProject(id!)
      setProject(project)
    }

    fetchProjects()
  }, [])
    

    const addInvoiceItem = async () => {
        const newItem = {
            id: "123",
            description: "Test",
            amount: 1234
        }
  
        // might not need to set new
        const newProject = project;
        newProject!.invoice.lineItems = [...newProject!.invoice.lineItems, newItem]
        console.log(newProject)
        const updatedProject = await InvoicelyApi.updateProject(id!, newProject!)
        setProject(updatedProject)
    }

    // delete invoiceItem
    const deleteInvoiceItem = async (id: string = "123") => {
        project!.invoice.lineItems = project!.invoice.lineItems.filter(v =>v.id !== id)
        const updatedProject = await InvoicelyApi.updateProject(id!, project!)
        setProject(updatedProject)
    }

    // edit invoiceItem
  const editInvoiceItem = async (id: string = "123") => {
        const newItem = {
            id: "123",
            description: "Testing",
            amount: 5000
        }
      
        // better as a reduce
        project!.invoice.lineItems = project!.invoice.lineItems.map(v => {
            if (v.id === id) {
               return newItem;
            }
            else return v
        })
            
        const updatedProject = await InvoicelyApi.updateProject(id!, project!)
            setProject(updatedProject)
        }
    
    

    return (
        project ? (
         <div>
            <h1>{project.title}</h1>
            <ul>
            {project.invoice.lineItems.map(v => 
                <li key={v.id}>
                    <span>{v.description}</span>
                    <span>{v.amount}</span>
                </li>
            )}
                </ul>
                <button onClick={() => addInvoiceItem()}>Add</button>
                <button onClick={() => deleteInvoiceItem()}>delete</button>
                <button onClick={() => editInvoiceItem()}>edit</button>
        </div>
        ) : (
            <div>No Project Found</div>
       )
  )
}

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import InvoicelyApi from '../api'
import { stringify } from "querystring";

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
    const [project, setProject] = useState<Project|null>(null)
     const { id } = useParams();

  // Fetch all projects from the API
  useEffect(() => {
    async function fetchProjects() {
      const project = await InvoicelyApi.getProject(id!)
      setProject(project)
    }

    fetchProjects()
  }, [])
    


    return (
        project ? (
         <div>
            <h1>{project.title}</h1>
            <ul>
            {project.invoice.lineItems.map(v => 
                <li key={v.id}><span>{v.description}</span> <span>{v.amount}</span></li>
            )}
            </ul>
        </div>
        ) : (
            <div>No Project Found</div>
       )
  )
}

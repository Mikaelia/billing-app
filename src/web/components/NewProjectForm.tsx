import React, { FormEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import InvoicelyApi from '../api'
import Button from './Button'
import { v4 as uuidv4 } from 'uuid'
import Icon from './Icon'
import StyledForm from './StyledForm'

const StyledFormContainer = styled.div`
  width: 100%;

  .item {
    display: flex;
    width: 100%;
    position: relative;
  }

  .submit-button {
    width: 100%;
    margin-top: 3rem;
    padding: 1rem;
    font-weight: 600;
  }

  .cancel-button {
    position: absolute;
    right: -2.5rem;
    bottom: 1rem;
  }
`

type LineItemData = {
  id: string
  description: string
  amount: string
}

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
  changeHandler: () => void
}

export default function NewProjectForm({ changeHandler }: Props) {
  const [title, setTitleValue] = useState('')
  const [lineItemValues, setLineItemValues] = useState([
    { id: uuidv4(), description: '', amount: '' },
  ])
  const [projectData, setProjectData] = useState<Project | null>(null)

  /** State Handling */

  const handleTitleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { value } = e.target as HTMLInputElement
    setTitleValue(value)
  }

  const handleLineItemChange = (i: number, e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement
    const newItemValues: LineItemData[] = [...lineItemValues]
    newItemValues[i][name as keyof LineItemData] = value
    setLineItemValues(newItemValues)
  }

  const saveProject = async (project: Project) => {
    const data = await InvoicelyApi.createProject(project)
    setProjectData(data)
  }

  /** Form Actions */

  const addFormFields = () => {
    setLineItemValues([...lineItemValues, { id: uuidv4(), description: '', amount: '' }])
  }

  const removeFormFields = (i: number) => {
    let newItemValues = [...lineItemValues]
    newItemValues.splice(i, 1)
    setLineItemValues(newItemValues)
  }

  const clearForm = () => {
    setTitleValue('')
    setLineItemValues([{ id: '', description: '', amount: '' }])
    setProjectData(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (isFormValid()) {
      const project = formatProjectData()
      await saveProject(project)
      clearForm()
      changeHandler()
    }
  }

  /** Data Formattng */

  const formatProjectData = (): Project => {
    let invoiceData = formatLineItemData(lineItemValues)
    const invoice = { id: uuidv4(), lineItems: invoiceData }
    const project = { id: uuidv4(), title, invoice }
    return project
  }

  const formatLineItemData = (lineItems: LineItemData[]): LineItem[] => {
    return lineItems.map((v) => {
      return { ...v, amount: parseFloat(parseFloat(v.amount).toFixed(2)) }
    })
  }

  /** Validations -- (much more robust in prod) */

  const isFormValid = (): boolean => {
    return !!(title && lineItemValues.length)
  }

  return (
    <StyledFormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <fieldset>
          <legend>PROJECT DETAILS</legend>
          <label>
            Title
            <input
              type="text"
              name="name"
              value={title || ''}
              onChange={(e) => handleTitleChange(e)}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>EXPENSES</legend>
          {lineItemValues.map((element, index) => (
            <div className="item" key={index}>
              <label>
                Description
                <input
                  type="text"
                  name="description"
                  value={element.description || ''}
                  onChange={(e) => handleLineItemChange(index, e)}
                />
              </label>
              <label>
                Amount
                <input
                  type="number"
                  name="amount"
                  min="0.00"
                  step="0.01"
                  value={element.amount || ''}
                  onChange={(e) => handleLineItemChange(index, e)}
                />
              </label>
              {index ? (
                <Button
                  className="cancel-button"
                  format="icon"
                  onClick={() => removeFormFields(index)}
                >
                  <Icon url="circle-cross.svg"></Icon>
                </Button>
              ) : null}
            </div>
          ))}
          <Button format="text" onClick={() => addFormFields()}>
            + Add
          </Button>
        </fieldset>
        <Button className="submit-button" type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </StyledForm>
    </StyledFormContainer>
  )
}

// need form section -- fieldset

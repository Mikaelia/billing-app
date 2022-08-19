import React, { FormEvent, useRef, useState } from 'react'
import styled from 'styled-components'
import InvoicelyApi from '../api'
import Button from './Button'
import { v4 as uuidv4 } from 'uuid'
import Icon from './Icon'

const StyledFormContainer = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.standard};
  padding: 3rem;
  height: 100%;
  width: 100%;

  form,
  label {
    display: flex;
    flex-direction: column;
  }

  fieldset {
    border: none;
    margin-bottom: 2rem;
  }

  legend {
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: ${(props) => props.theme.fontSizes.bodySmall};
  }

  input {
    margin-bottom: 1rem;
    width: 100%;
    padding: 0.25rem;
    background: ${(props) => props.theme.colors.gray1};
    border: none;
    border-bottom: ${(props) => props.theme.border};
    border-radius: ${(props) => props.theme.borderRadius.small};
    outline-color: ${(props) => props.theme.colors.blue};
  }

  label:not(:first-of-type) {
    margin-left: 0.5rem;
  }

  .item {
    display: flex;
    width: 100%;
    position: relative;
  }

  label:first-child {
    flex: 1;
  }

  .submit-button {
    width: 100%;
    margin-top: 3rem;
    padding: 1rem;
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

export default function NewProjectForm() {
  const [title, setTitleValue] = useState('')
  const [lineItemValues, setLineItemValues] = useState([{ id: '', description: '', amount: '' }])
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (isFormValid()) {
      const project = formatProjectData()
      saveProject(project)
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
      <form onSubmit={handleSubmit}>
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
      </form>
    </StyledFormContainer>
  )
}

// need form section -- fieldset

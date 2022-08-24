import React, { FormEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'

import Button from './Button'
import Icon from './Icon'
import StyledForm from './StyledForm'

import type { Project, LineItemData, LineItem } from '../types'

const StyledFormContainer = styled.div`
  width: 100%;

  .input-grouping {
    display: flex;
    width: 100%;
    position: relative;
  }

  .amount-input {
    margin-left: 1rem;
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

type Props = {
  changeHandler: (project: Project) => void
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
      changeHandler(project)
      clearForm()
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

  /** Validations -- (obviously much more robust in prod. Will still submit with null values in line items) */

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
            <div className="input-grouping" key={index}>
              <label>
                Description
                <input
                  type="text"
                  name="description"
                  value={element.description || ''}
                  onChange={(e) => handleLineItemChange(index, e)}
                />
              </label>
              <label className="amount-input">
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
                  variant="destructive"
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

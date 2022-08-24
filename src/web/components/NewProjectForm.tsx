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
/** Form for creating a new project */
export default function NewProjectForm({ changeHandler }: Props) {
  const [title, setTitleValue] = useState('')
  const [lineItemValues, setLineItemValues] = useState<LineItem[]>([
    { id: uuidv4(), description: '', amount: 0 },
  ])
  const [projectData, setProjectData] = useState<Project | null>(null)

  /** State Handling */

  const handleTitleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { value } = e.target as HTMLInputElement
    setTitleValue(value)
  }

  const handleLineItemChange = (i: number, e: React.ChangeEvent<HTMLElement>) => {
    let { name, value } = e.target as HTMLInputElement
    updateLineItemValues(name, value, i)
  }

  const updateLineItemValues = (name: string, value: string, index: number) => {
    const newItemValues: LineItem[] = [...lineItemValues]
    if (name === 'amount') {
      let amountValue: number
      // store value as number and remove extra decimal points
      amountValue = parseFloat(parseFloat(value).toFixed(2))
      newItemValues[index].amount = amountValue
    } else newItemValues[index].description = value
    setLineItemValues(newItemValues)
  }

  /** Form Actions */

  const addFormFields = (e: FormEvent) => {
    e.preventDefault()
    setLineItemValues([...lineItemValues, { id: uuidv4(), description: '', amount: 0 }])
  }

  const removeFormFields = (e: FormEvent, i: number) => {
    e.preventDefault()
    let newItemValues = [...lineItemValues]
    newItemValues.splice(i, 1)
    setLineItemValues(newItemValues)
  }

  const clearForm = () => {
    setTitleValue('')
    setLineItemValues([{ id: '', description: '', amount: 0 }])
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

  /** Convert to cents -- could have stored a 'display' value alternatively */
  const formatLineItemData = (lineItems: LineItem[]): LineItem[] => {
    return lineItems.map((v) => {
      return { ...v, amount: v.amount * 100 }
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
                  onClick={(e) => removeFormFields(e, index)}
                >
                  <Icon url="circle-cross.svg"></Icon>
                </Button>
              ) : null}
            </div>
          ))}
          <Button format="text" onClick={addFormFields}>
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

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import InvoicelyApi from '../api'
import Button from './Button'
import { v4 as uuidv4 } from 'uuid'
import Icon from './Icon'
import StyledForm from './StyledForm'

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
  changeHandler: (e: React.FormEvent, item: LineItem) => void
}

export default function NewProjectForm({ changeHandler }: Props) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = parseInt(e.target.value)
    // console.log(e.target.value)
    setAmount(data)
  }

  const clearForm = () => {
    setAmount(0)
    setDescription('')
  }

  const isFormValid = (): boolean => {
    return !!(amount && description)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    changeHandler(e, { id: uuidv4(), description, amount })
    clearForm()
  }

  return (
    <StyledForm>
      <fieldset>
        <legend>EXPENSES</legend>
        <label>
          Description
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
          />
        </label>
        <label>
          Amount
          <input
            type="number"
            name="amount"
            min="0.00"
            step="0.01"
            value={amount}
            onChange={(e) => handleAmountChange(e)}
          />
        </label>
      </fieldset>
      <Button className="submit-button" type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </Button>
    </StyledForm>
  )
}

// need form section -- fieldset

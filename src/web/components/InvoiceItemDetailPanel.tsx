import React, { useState, useEffect } from 'react'
import StyledForm from './StyledForm'
import styled from 'styled-components'
import Icon from './Icon'
import Button from './Button'
import InvoicelyApi from '../api'

const StyledPanel = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  background: ${(props) => props.theme.colors.gray1};

  h1 {
    font-size: ${(props) => props.theme.fontSizes.heading1};
    font-weight: 500;
    // background: ${(props) => props.theme.colors.white};
    // border-bottom: ${(props) => props.theme.border};
  }

  .header {
    padding: 3rem;
    display: flex;
    align-items: center;
  }

  .form-container {
    display: flex;
    align-items: flex-start;
    padding: 0 3rem;
    overflow-y: scroll;
    max-height: calc(100vh - 156px - 3rem);
  }
`

type LineItem = {
  id: string
  description: string
  amount: number
}

type Invoice = {
  id: string
  lineItems: LineItem[]
}
// prob want to convert to TS
type Project = {
  id: string
  title: string
  invoice: Invoice
}

type Props = {
  project: Project
  item: LineItem
  editInvoiceItem: (e: React.FormEvent, item: LineItem) => void
}
export default function InvoiceItemDetailPanel({ item, editInvoiceItem, project }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(item.description)
  const [amount, setAmount] = useState(item.amount)

  useEffect(() => {
    setDescription(item.description)
    setAmount(item.amount)
  }, [item])

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = parseInt(e.target.value)
    // console.log(e.target.value)
    setAmount(data)
  }
  const toggleEditing = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(true)
  }

  const clearForm = () => {
    setAmount(0)
    setDescription('')
  }

  const handleSave = (e: React.FormEvent) => {
    editInvoiceItem(e, { ...item, amount, description })
    clearForm()
    setIsEditing(false)
  }

  return (
    <StyledPanel>
      <div className="header">
        <h1>Details</h1>
      </div>
      <div className="form-container">
        <StyledForm>
          <label>
            Description
            <input
              disabled={!isEditing}
              type="text"
              onChange={handleDescriptionChange}
              value={description}
            />
          </label>
          <label>
            Amount
            <input
              disabled={!isEditing}
              onChange={handleAmountChange}
              min="0.00"
              step="0.01"
              type="number"
              value={amount}
            />
          </label>
          {!isEditing ? (
            <Button onClick={(e: React.FormEvent) => toggleEditing(e)}>Edit</Button>
          ) : (
            <Button type="submit" onClick={(e: React.FormEvent) => handleSave(e)}>
              Save
            </Button>
          )}
        </StyledForm>
      </div>
    </StyledPanel>
  )
}

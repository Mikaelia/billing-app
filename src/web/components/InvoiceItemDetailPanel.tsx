import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Button from './Button'
import LineItemForm from './LineItemForm'

const StyledPanel = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  background: ${(props) => props.theme.colors.gray1};

  h1 {
    font-size: ${(props) => props.theme.fontSizes.heading1};
    font-weight: 500;
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

type Props = {
  item: LineItem
  editInvoiceItem: (e: React.FormEvent, item: LineItem) => void
  deleteInvoiceItem: (e: React.MouseEvent<HTMLButtonElement>, itemId: string) => void
}
export default function InvoiceItemDetailPanel({
  item,
  editInvoiceItem,
  deleteInvoiceItem,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState(item)

  const handleChange = (item: LineItem) => {
    setEditingItem(item)
  }

  const clearForm = () => {
    setEditingItem({ id: '', amount: 0, description: '' })
  }

  /** Button Actions */

  const toggleEditing = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsEditing(true)
  }

  const handleSave = (e: React.FormEvent) => {
    editInvoiceItem(e, editingItem)
    clearForm()
    setIsEditing(false)
  }

  return (
    <StyledPanel>
      <div className="header">
        <h1>Details</h1>
      </div>
      <div className="form-container">
        <LineItemForm isDisabled={!isEditing} item={item} handleChange={handleChange}>
          {!isEditing ? (
            <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => toggleEditing(e)}>
              Edit
            </Button>
          ) : (
            <>
              <Button type="submit" onClick={(e: React.FormEvent) => handleSave(e)}>
                Save
              </Button>
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => deleteInvoiceItem(e, item.id)}
              >
                Delete
              </Button>
            </>
          )}
        </LineItemForm>
      </div>
    </StyledPanel>
  )
}

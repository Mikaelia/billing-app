import React, { useState } from 'react'
import styled from 'styled-components'

import Button from './Button'
import LineItemForm from './LineItemForm'

import type { LineItem } from '../types'
import Icon from './Icon'

const StyledButtonContainer = styled.div`
  justify-content: center;
  .button-container {
    position: absolute;
    top: 2.75rem;
    right: 3rem;

    button:first-child {
      margin-right: 1rem;
    }
  }
`

type Props = {
  item: LineItem
  editInvoiceItem: (e: React.FormEvent, item: LineItem) => void
  deleteInvoiceItem: (e: React.MouseEvent<HTMLButtonElement>, itemId: string) => void
  createInvoiceItem: (item: LineItem) => void
  action: 'viewing' | 'creating'
}

export default function EditLineItemForm({ item, editInvoiceItem, deleteInvoiceItem }: Props) {
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
    <LineItemForm isDisabled={!isEditing} item={item} handleChange={handleChange} title="Details">
      <StyledButtonContainer>
        <div className="button-container">
          {!isEditing ? (
            <>
              <Button
                className="edit-button"
                format="icon"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => toggleEditing(e)}
              >
                <Icon url={'/edit.svg'}></Icon>
              </Button>
              <Button
                variant="destructive"
                format="icon"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => deleteInvoiceItem(e, item.id)}
              >
                <Icon url="/delete.svg"></Icon>
              </Button>
            </>
          ) : (
            <Button
              className="submit-button"
              type="submit"
              variant="success"
              format="icon"
              onClick={(e: React.FormEvent) => handleSave(e)}
            >
              <Icon url="/tick.svg"></Icon>
            </Button>
          )}
        </div>
      </StyledButtonContainer>
    </LineItemForm>
  )
}

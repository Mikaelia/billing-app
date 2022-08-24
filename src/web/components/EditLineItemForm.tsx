import React, { useState } from 'react'
import styled from 'styled-components'

import LineItemForm from './LineItemForm'
import Button from './Button'
import Icon from './Icon'

import type { LineItem } from '../types'

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
  handleEdit: (item: LineItem) => void
  handleDelete: (itemId: string) => void
}
/** Form for editing line items */
export default function EditLineItemForm({ item, handleEdit, handleDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedItem, setEditedItem] = useState(item)

  /** Gets and saves edited item value from child */
  const handleChange = (item: LineItem) => {
    setEditedItem(item)
  }

  /** Button Actions */

  /** Changes form status to 'editing' */
  const toggleEditing = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsEditing(true)
  }

  const isFormValid = (): boolean => {
    return !!(editedItem.amount && editedItem.description)
  }

  /** Passes edited item value to parent, while resetting form data */
  const updateItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid()) {
      handleEdit(editedItem)
      clearForm()
      setIsEditing(false)
    }
  }

  const deleteItem = (e: React.FormEvent) => {
    e.preventDefault()
    handleDelete(item.id)
  }

  const clearForm = () => {
    setEditedItem({ id: '', amount: 0, description: '' })
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
              <Button variant="destructive" format="icon" onClick={deleteItem}>
                <Icon url="/delete.svg"></Icon>
              </Button>
            </>
          ) : (
            <Button
              className="submit-button"
              type="submit"
              variant="success"
              format="icon"
              onClick={updateItem}
            >
              <Icon url="/tick.svg"></Icon>
            </Button>
          )}
        </div>
      </StyledButtonContainer>
    </LineItemForm>
  )
}

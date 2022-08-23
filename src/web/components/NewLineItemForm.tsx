import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Button from './Button'
import LineItemForm from './LineItemForm'

import type { LineItem } from '../types'

type Props = {
  handleNew: (item: LineItem) => void
}

export default function NewLineItemForm({ handleNew }: Props) {
  const [item, setItem] = useState({ id: uuidv4(), description: '', amount: 0 })

  const clearForm = () => {
    setItem({ id: uuidv4(), description: '', amount: 0 })
  }

  const isFormValid = (): boolean => {
    return !!(item.amount && item.description)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid()) {
      handleNew(item)
      clearForm()
    }
  }

  const handleLineItemChange = (item: LineItem) => {
    setItem(item)
  }

  return (
    <LineItemForm item={item} handleChange={handleLineItemChange} title="New Item: ">
      <Button className="submit-button" type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </Button>
    </LineItemForm>
  )
}

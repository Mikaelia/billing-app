import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Button from './Button'
import LineItemForm from './LineItemForm'

import type { LineItem } from '../types'

type Props = {
  changeHandler: (item: LineItem) => void
}

export default function NewLineItemForm({ changeHandler }: Props) {
  const [item, setItem] = useState({ id: uuidv4(), description: '', amount: 0 })

  const clearForm = () => {
    setItem({ id: uuidv4(), description: '', amount: 0 })
  }

  /** Still needs basic empty form validation and non-zero amount value */
  // const isFormValid = (): boolean => {
  //   return !!(amount && description)
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    changeHandler(item)
    clearForm()
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
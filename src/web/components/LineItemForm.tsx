import React, { useState, useEffect } from 'react'

import StyledForm from './StyledForm'

import type { LineItem } from '../types'

type Props = {
  isDisabled?: boolean
  item: LineItem
  handleChange: (item: LineItem) => void
  children?: React.ReactNode
}

export default function LineItemForm({ isDisabled, item, children, handleChange }: Props) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    setDescription(item.description)
    setAmount(item.amount)
  }, [item])

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: description } = e.target
    const lineItem = { ...item, amount, description }

    setDescription(description)
    handleChange(lineItem)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value)
    const lineItem = { ...item, amount, description }

    setAmount(amount)
    handleChange(lineItem)
  }

  return (
    <StyledForm>
      <label>
        Description
        <input
          type="text"
          name="description"
          disabled={isDisabled}
          value={description}
          onChange={handleDescriptionChange}
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
          disabled={isDisabled}
          onChange={handleAmountChange}
        />
      </label>
      {children}
    </StyledForm>
  )
}

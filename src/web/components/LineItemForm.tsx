import React, { useState, useEffect, useRef } from 'react'

import StyledForm from './StyledForm'

import type { LineItem } from '../types'

type Props = {
  isDisabled?: boolean
  item: LineItem
  title: string
  handleChange: (item: LineItem) => void
  children?: React.ReactNode
}

export default function LineItemForm({ isDisabled, item, children, handleChange, title }: Props) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDescription(item.description)
    setAmount(item.amount)
  }, [item])

  useEffect(() => {
    !isDisabled && inputRef.current?.focus()
  }, [isDisabled])

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
      <fieldset>
        <legend>{title}</legend>
        <label>
          Description
          <input
            ref={inputRef}
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
      </fieldset>
      {children}
    </StyledForm>
  )
}

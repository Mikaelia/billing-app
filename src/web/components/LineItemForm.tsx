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
  const [amount, setAmount] = useState<number>(0)
  const [displayAmount, setDisplayAmount] = useState<number>(0)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDescription(item.description)
    setAmount(item.amount)
    // convert cents to dollars, restrict to two decimals
    const formattedData = parseFloat((item.amount / 100).toFixed(2))
    setDisplayAmount(formattedData)
  }, [item])

  /** Focus first input element if form is not disabled */
  useEffect(() => {
    !isDisabled && inputRef.current?.focus()
  }, [isDisabled])

  // Could combine these handlers into one 'lineItem' state to reduce duplication. Separated for readability

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: description } = e.target
    const lineItem = { ...item, amount, description }

    setDescription(description)
    handleChange(lineItem)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const displayAmount = parseFloat(value)
    // convert dollar value to cents for backend data
    const amount = parseFloat(value) * 100
    const lineItem = { ...item, amount, description }

    setDisplayAmount(displayAmount)
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
            value={displayAmount || ''}
            disabled={isDisabled}
            onChange={handleAmountChange}
          />
        </label>
      </fieldset>
      {children}
    </StyledForm>
  )
}

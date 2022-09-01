import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem 3rem;
  border-bottom: ${(props) => props.theme.border};

  :hover {
    background: ${(props) => props.theme.colors.gray1};
  }

  .item-title {
    font-size: ${(props) => props.theme.fontSizes.heading2};
    font-weight: 500;
    color: ${(props) => props.theme.colors.black};
  }

  .item-price {
    color: ${(props) => props.theme.colors.brand};
  }
`

type Props = {
  title: string
  price?: number
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  className?: string
}
// Card would be more generic (i.e. not have 'price' specific functionality and styles) for prod use  - slots/children prefered with styles here defining layout
export default function ItemCard({ title, price, onClick, className }: Props) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const formatPrice = (cents: number) => {
    // convert to dollars - worth pulling out a helper eventually
    return formatter.format(cents / 100)
  }

  return (
    <StyledCard className={className} onClick={onClick}>
      <h2 className="item-title">{title}</h2>
      {price ? <span className="item-price">{formatPrice(price)}</span> : ''}
    </StyledCard>
  )
}

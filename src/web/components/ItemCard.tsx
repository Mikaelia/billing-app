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

  h2 {
    font-size: ${(props) => props.theme.fontSizes.heading2};
    font-weight: 500;
    color: ${(props) => props.theme.colors.black};
  }

  .price {
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
  return (
    <StyledCard className={className} onClick={onClick}>
      <h2>{title}</h2>
      {price ? <span className="price">${price}</span> : ''}
    </StyledCard>
  )
}

import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledCard = styled.div`
  border-bottom: ${(props) => props.theme.border};
  padding: 1.5rem 3rem;
  display: flex;
  width: 100%;
  justify-content: space-between;

  :hover {
    background: ${(props) => props.theme.colors.gray1};
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizes.heading2};
    color: ${(props) => props.theme.colors.black};
    font-weight: 500;
  }

  price {
    font-weight: bold;
  }
`

type Props = {
  title: string
  price?: number
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
// convert to slot later

export default function ItemCard({ title, price, onClick }: Props) {
  return (
    <StyledCard onClick={onClick}>
      <h2>{title}</h2>
      {price ? <span className="price">${price}</span> : ''}
    </StyledCard>
  )
}

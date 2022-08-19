import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledCard = styled(Link)`
  border-bottom: ${(props) => props.theme.border};
  padding: 1rem 3rem;
  display: block;
  width: 100%;

  :hover {
    background: ${(props) => props.theme.colors.gray1};
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizes.heading2};
    color: ${(props) => props.theme.colors.black};
    font-weight: 500;
  }
`

type Props = {
  title: string
  url: string
}

export default function ItemCard({ title, url }: Props) {
  return (
    <StyledCard to={url}>
      <h2>{title}</h2>
    </StyledCard>
  )
}

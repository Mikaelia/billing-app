import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'

import ItemCard from './ItemCard'

import type { LineItem } from '../types'

const StyledLineItemList = styled.div`
  border-top: ${(props) => props.theme.border};

  .active {
    background: ${(props) => props.theme.colors.gray1};
  }
`

type Props = {
  lineItems: LineItem[]
  activeItemId?: string
}

export default function LineItemList({ lineItems, activeItemId }: Props) {
  const { id } = useParams()

  const isActive = (id: string): boolean => {
    return id === activeItemId
  }

  return (
    <StyledLineItemList>
      {lineItems.map((item) => (
        <Link key={item.id} to={`/invoices/${id}/item/${item.id}`}>
          <ItemCard
            className={isActive(item.id) ? 'active' : ''}
            key={item.id}
            title={item.description}
            price={item.amount}
          ></ItemCard>
        </Link>
      ))}
    </StyledLineItemList>
  )
}

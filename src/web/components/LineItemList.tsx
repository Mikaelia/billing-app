import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'

import ItemCard from './ItemCard'

const StyledLineItemList = styled.div`
  border-top: ${(props) => props.theme.border};
`

type LineItem = {
  id: string
  description: string
  amount: number
}

type Props = {
  lineItems: LineItem[]
}

export default function LineItemList({ lineItems }: Props) {
  const { id } = useParams()
  return (
    <StyledLineItemList>
      {lineItems.map((item) => (
        <Link key={item.id} to={`/invoices/${id}/item/${item.id}`}>
          <ItemCard key={item.id} title={item.description} price={item.amount}></ItemCard>
        </Link>
      ))}
    </StyledLineItemList>
  )
}
import ItemCard from './ItemCard'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useLocation, useParams } from 'react-router-dom'

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
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>, itemId: string) => void
}

export default function LineItemList({ lineItems, handleDelete }: Props) {
  const location = useLocation()
  const { id } = useParams()
  return (
    <StyledLineItemList>
      {lineItems.map((item) => (
        <Link key={item.id} to={`/invoices/${id}/item/${item.id}`}>
          <ItemCard key={item.id} title={item.description} price={item.amount}></ItemCard>
          <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDelete(e, item.id)}>
            Delete
          </button>
        </Link>
      ))}
    </StyledLineItemList>
  )
}

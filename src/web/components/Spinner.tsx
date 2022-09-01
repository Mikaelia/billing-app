import styled from 'styled-components'

import Icon from './Icon'

const StyledSpinner = styled.div`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: spin 4s linear infinite;
`
export default function Spinner() {
  return (
    <StyledSpinner>
      <Icon size="3rem" url="/spinner.svg"></Icon>
    </StyledSpinner>
  )
}

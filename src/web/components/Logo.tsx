import styled from 'styled-components'

const StyledLogo = styled.img`
  margin-left: -1rem;
  height: 5rem;
  width: 10rem;
`

export default function Logo() {
  return <StyledLogo src="/logo.svg"></StyledLogo>
}

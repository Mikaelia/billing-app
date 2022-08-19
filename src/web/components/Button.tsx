import React, { EventHandler } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background: ${(props) => props.theme.colors.blue};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.standard};
  color: ${(props) => props.theme.colors.white};
  font-weight: 500;
  cursor: pointer;
`

const StyledTextButton = styled(StyledButton)`
    background: transparent;
    color: ${(props) => props.theme.colors.blue}

    :hover {
        background: ${(props) => props.theme.colors.gray1}
    }
`

type Props = {
  children: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
  type?: string
}

export default function Button({ children, onClick, type }: Props) {
  return type === 'text' ? (
    <StyledTextButton onClick={onClick}>{children}</StyledTextButton>
  ) : (
    <StyledButton onClick={onClick}>{children}</StyledButton>
  )
}

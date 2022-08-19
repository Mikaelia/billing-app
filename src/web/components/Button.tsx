import styled from 'styled-components'

const StyledButton = styled.button`
  background: ${(props) => props.theme.colors.blue};
  padding: 0.5rem 1rem;
  border: 3px solid transparent;
  border-radius: ${(props) => props.theme.borderRadius.standard};
  color: ${(props) => props.theme.colors.white};
  font-weight: 500;
  cursor: pointer;

  :hover {
    background: #e0e5ff;
    border: 3px solid ${(props) => props.theme.colors.blue};
    color: ${(props) => props.theme.colors.blue};
  }

  &.text-button {
    background: transparent;
    color: ${(props) => props.theme.colors.blue};

    :hover {
      background: ${(props) => props.theme.colors.gray3};
      border-color: transparent;
    }
  }

  &.icon-button {
    background: transparent;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 2rem;
    height: 2rem;

    :hover {
      background: ${(props) => props.theme.colors.gray3};
      border-color: transparent;
    }
  }
`

type Props = {
  children: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
  type?: 'submit' | 'reset' | 'button'
  format?: 'text' | 'icon' | null
  className?: string
}

export default function Button({ children, onClick, type, format, className = '' }: Props) {
  const buttonStyleClass = () => {
    if (format === 'text') return 'text-button'
    if (format === 'icon') return 'icon-button'
    return ''
  }

  return (
    <StyledButton className={`${buttonStyleClass()} ${className}`} type={type} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

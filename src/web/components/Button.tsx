import styled from 'styled-components'

const StyledButton = styled.button`
  display: inline-block;
  background: ${(props) => props.theme.colors.brand};
  padding: 0.5rem 1rem;
  border: 3px solid transparent;
  border-radius: ${(props) => props.theme.borderRadius.standard};
  color: ${(props) => props.theme.colors.white};
  font-weight: 500;
  cursor: pointer;

  &.brand:hover {
    background: ${(props) => props.theme.colors.brandDark};
  }

  &.text-button {
    background: transparent;
    color: ${(props) => props.theme.colors.brand};

    :hover {
      background: ${(props) => props.theme.colors.gray3};
    }
  }

  &.icon-button {
    background: transparent;
    border-radius: 50%;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 2rem;
    height: 2rem;

    &.destructive:hover {
      background: ${(props) => props.theme.colors.destructiveLight};
    }

    &.brand:hover {
      background: ${(props) => props.theme.colors.brandLight};
    }

    &.success:hover {
      background: ${(props) => props.theme.colors.successLight};
    }
  }
`

type Props = {
  children: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
  type?: 'submit' | 'reset' | 'button'
  format?: 'text' | 'icon' | null
  className?: string
  variant?: 'destructive' | 'success' | 'brand'
}

export default function Button({
  children,
  onClick,
  type,
  format,
  variant = 'brand',
  className = '',
}: Props) {
  const buttonStyleClass = () => {
    let className = ''
    if (format === 'text') className += ' text-button'
    if (format === 'icon') className += ' icon-button'
    className += ` ${variant}`
    return className
  }

  return (
    <StyledButton className={`${buttonStyleClass()} ${className}`} type={type} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

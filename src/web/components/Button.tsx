import styled from 'styled-components'

const StyledButton = styled.button`
  display: inline-block;
  background: ${(props) => props.theme.colors.brand};
  color: ${(props) => props.theme.colors.white};
  font-weight: 500;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: ${(props) => props.theme.borderRadius.standard};
  border: 3px solid transparent;

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
    display: inline-flex;
    justify-content: center;
    flex-shrink: 0;
    align-items: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    background: transparent;
    border-radius: 50%;

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
  type?: 'submit' | 'button' | 'reset'
  format?: 'text' | 'icon' | null
  className?: string
  variant?: 'destructive' | 'success' | 'brand'
}

/** Button supports icon and text types (formats), as well as three color themes (variants). For now, only icon buttons support all three variants */
export default function Button({
  children,
  onClick,
  type,
  format,
  variant = 'brand',
  className = '',
}: Props) {
  /** Sets css class based on format and variant */
  const buttonStyleClass = () => {
    // Ok for now because options are so limited - in future would extract to enum
    let className = ''
    if (format === 'text') className += ' text-button'
    if (format === 'icon') className += ' icon-button'
    className += ` ${variant}`
    return className
  }

  // Ideally icons would be built in to icon buttons, and would be able to adjust color dynamically
  return (
    <StyledButton className={`${buttonStyleClass()} ${className}`} type={type} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

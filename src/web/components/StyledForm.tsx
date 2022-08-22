import { FormEvent } from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  background: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.standard};
  padding: 3rem;
  height: 100%;
  width: 100%;

  form,
  label {
    display: flex;
    flex-direction: column;
  }

  fieldset {
    border: none;
    margin-bottom: 2rem;
  }

  legend {
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: ${(props) => props.theme.fontSizes.bodySmall};
  }

  input {
    margin-bottom: 1rem;
    width: 100%;
    padding: 0.25rem;
    background: ${(props) => props.theme.colors.gray1};
    border: none;
    border-bottom: ${(props) => props.theme.border};
    border-radius: ${(props) => props.theme.borderRadius.small};
    outline-color: ${(props) => props.theme.colors.blue};
  }

  label {
    color: ${(props) => props.theme.colors.gray6};
  }

  label:first-child {
    flex: 1;
  }

  label:not(:first-of-type) {
    margin-left: 0.5rem;
  }
`
type Props = {
  onSubmit?: (e: FormEvent) => void
  children: React.ReactNode
}
const Form = ({ onSubmit, children }: Props) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
}

export default Form

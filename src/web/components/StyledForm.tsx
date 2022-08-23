import { FormEvent } from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  background: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.standard};
  border-top: 4px solid ${(props) => props.theme.colors.gray3};
  padding: 3rem;
  width: 100%;
  position: relative;

  form,
  label {
    display: flex;
    flex-direction: column;
  }

  fieldset {
    border: none;
  }

  fieldset:not(:last-of-type) {
    margin-bottom: 2rem;
  }

  legend {
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: ${(props) => props.theme.fontSizes.body};
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  input {
    margin-bottom: 1rem;
    width: 100%;
    padding: 0.25rem;
    background: ${(props) => props.theme.colors.gray1};
    border: none;
    border-bottom: ${(props) => props.theme.border};
    border-radius: ${(props) => props.theme.borderRadius.small};
    outline-color: ${(props) => props.theme.colors.brand};
  }

  label {
    color: ${(props) => props.theme.colors.gray6};
  }

  label:first-child {
    flex: 1;
  }
`
type Props = {
  onSubmit?: (e: FormEvent) => void
  children: React.ReactNode
}
/** Base styles for app forms */
const Form = ({ onSubmit, children }: Props) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
}

export default Form

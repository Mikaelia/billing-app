import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'
import NewProjectForm from './NewProjectForm'

const StyledPanel = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.gray1};

  h1 {
    font-size: ${(props) => props.theme.fontSizes.heading1};
    font-weight: 500;
    // background: ${(props) => props.theme.colors.white};
    // border-bottom: ${(props) => props.theme.border};
  }

  .header {
    padding: 3rem;
    display: flex;
    align-items: center;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: inline-block;
    margin-right: 1rem;
  }

  .form {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3rem;
  }
`
export default function NewProjectPanel() {
  return (
    <StyledPanel>
      <div className="header">
        <span className="icon">
          <Icon url="add.svg" size="2.25rem"></Icon>
        </span>
        <h1>Create a new invoice</h1>
      </div>
      <div className="form">
        <NewProjectForm></NewProjectForm>
      </div>
    </StyledPanel>
  )
}

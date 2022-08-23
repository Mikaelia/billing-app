import React from 'react'
import styled from 'styled-components'

import Icon from './Icon'
import NewProjectForm from './NewProjectForm'

import type { Project } from '../types'

const StyledPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  background: ${(props) => props.theme.colors.gray1};

  .header {
    display: flex;
    align-items: center;
    padding: 3rem;

    h1 {
      font-size: ${(props) => props.theme.fontSizes.heading1};
      font-weight: 500;
    }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: inline-block;
    margin-right: 1rem;
  }

  .form-container {
    display: flex;
    align-items: flex-start;
    max-height: calc(100vh - 156px - 3rem);
    padding: 0 3rem;
    overflow-y: scroll;
  }
`

type Props = {
  changeHandler: (project: Project) => void
}
export default function NewProjectPanel({ changeHandler }: Props) {
  return (
    <StyledPanel>
      <div className="header">
        <span className="icon">
          <Icon url="add.svg" size="2.25rem"></Icon>
        </span>
        <h1>Create a new invoice</h1>
      </div>
      <div className="form-container">
        <NewProjectForm changeHandler={changeHandler}></NewProjectForm>
      </div>
    </StyledPanel>
  )
}

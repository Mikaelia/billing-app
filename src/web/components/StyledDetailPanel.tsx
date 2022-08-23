import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  background: ${(props) => props.theme.colors.gray1};

  .heading {
    padding: 2rem 3rem;
    background: ${(props) => props.theme.colors.white};
    border-bottom: ${(props) => props.theme.border};
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizes.heading1};
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: ${(props) => props.theme.fontSizes.bodyLarge};
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    width: 100%;
    padding: 2.5rem;
    overflow-y: scroll;
    max-height: calc(100vh - 156px - 3rem);
  }
`

type Props = {
  title?: string
  subtitle?: string
  children: React.ReactNode
}
export default function StyledDetailPanel({ title, subtitle, children }: Props) {
  return (
    <StyledContainer>
      <div className="heading">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="content">{children}</div>
    </StyledContainer>
  )
}

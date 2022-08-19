import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Icon from './Icon'

const StyledSidebar = styled.div`
  background: ${(props) => props.theme.colors.gray1};
  height: 100vh;
  padding: 2rem 1rem;
  width: 20rem;
  border: ${(props) => props.theme.border};

  h2 {
    color: ${(props) => props.theme.colors.gray6};
    font-size: ${(props) => props.theme.fontSizes.bodySmall};
    font-weight: 600;
    padding-left: 1rem;
    margin-bottom: 0.5rem;
    margin-top: 2.5rem;
  }
`

const StyledNavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.gray6};
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: ${(props) => props.theme.borderRadius.standard};
  background: ${(props) => props.theme.colors.gray3};

  :hover {
    background: ${(props) => props.theme.colors.gray3};
  }

  .navlink-text {
    margin-left: 1rem;
  }
`

type Props = {
  children: React.ReactNode
}

//Look into named slot

export default function Sidebar({ children }: Props) {
  return (
    <StyledSidebar>
      <Link className="logo" to={`/`}>
        {children}
      </Link>
      <h2>FINANCIALS</h2>
      <ul className="nav">
        <StyledNavLink to={`/`}>
          <Icon size="1.25rem" url="card.svg"></Icon>
          <span className="navlink-text">Billing</span>
        </StyledNavLink>
      </ul>
    </StyledSidebar>
  )
}

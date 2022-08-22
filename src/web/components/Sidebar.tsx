import React from 'react'
import { Link, useLocation, matchPath } from 'react-router-dom'
import styled from 'styled-components'

import Icon from './Icon'

const StyledSidebar = styled.div`
  background: ${(props) => props.theme.colors.gray1};
  height: 100vh;
  padding: 2rem 1rem;
  width: 270px;
  min-width: 270px;
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
  transition: all 0.1s ease;

  &.active {
    background: ${(props) => props.theme.colors.gray3};
  }

  :hover {
    background: ${(props) => props.theme.colors.gray3};
    color: ${(props) => props.theme.colors.black};
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
  const location = useLocation()
  // console.log(location.pathname)
  // need to make reactive

  /// might not work because exact match
  const isLinkActive = (path: string) => {
    return !!matchPath(location.pathname, path)
  }

  return (
    <StyledSidebar>
      <Link className="logo" to={`/`}>
        {children}
      </Link>
      <h2>FINANCIALS</h2>
      <ul className="nav">
        <StyledNavLink to={`/`} className={isLinkActive('/') ? 'active' : ''}>
          <Icon size="1.25rem" url="/card.svg"></Icon>
          <span className="navlink-text">Billing</span>
        </StyledNavLink>
      </ul>
    </StyledSidebar>
  )
}

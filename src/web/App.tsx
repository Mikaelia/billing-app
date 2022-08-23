import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import HomePage from './components/HomePage'
import Theme from './components/Theme'
import InvoicePage from './components/InvoicePage'
import Sidebar from './components/Sidebar'
import Logo from './components/Logo'
const StyledLayout = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.black};
`
function App() {
  return (
    <Theme>
      <Router>
        <StyledLayout>
          <Sidebar>
            <Logo></Logo>
          </Sidebar>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/invoice/:id" element={<InvoicePage />} />
            <Route path="/invoice/:id/item/:itemId" element={<InvoicePage />} />
          </Routes>
        </StyledLayout>
      </Router>
    </Theme>
  )
}

export default App

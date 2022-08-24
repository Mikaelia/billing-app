import styled from 'styled-components'

const StyledView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;

  h2 {
    font-size: ${(props) => props.theme.fontSizes.heading2};
  }
`

export default function UnselectedView() {
  return (
    <StyledView>
      <h2>Please select an item to view</h2>
    </StyledView>
  )
}

import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    white: '#ffffff',
    gray1: '#f7f7f7',
    gray2: '#f3f3f3',
    gray3: '#ececec',
    gray4: '#d8d8d8',
    gray5: '#9c9c9c',
    gray6: '#8a8a8a',
    black: '#323232',
    blue: '#0225e0',
  },
  font: 'Rubik',
  fontSizes: {
    heading1: '2.5rem',
    heading2: '1rem',
    bodySmall: '.75rem',
    body: '1rem',
    bodyLarge: '1.5rem',
  },
  borderRadius: {
    small: '.25rem',
    standard: '.5rem',
  },
  border: '2px solid #ececec',
}

type Props = {
  children: React.ReactNode
}

const Theme = ({ children }: Props) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

export default Theme

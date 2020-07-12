import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import AppProvider from '../providers'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

const App = ({Component, pageProps}: AppProps) => (
  <ThemeProvider theme={theme}>
    <AppProvider>
      <Component {...pageProps} />
      <GlobalStyle />
    </AppProvider>
  </ThemeProvider>
)

export default App;

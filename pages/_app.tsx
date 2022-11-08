import '../styles/globals.css'
import '../styles/envelop-stripes.css'

import type { AppProps } from 'next/app'

const isDevelopment = process.env.NODE_ENV === 'development';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {isDevelopment && <script src="https://unpkg.com/spacingjs" defer></script>}
      <Component {...pageProps} />
    </>
  )
}

export default App;

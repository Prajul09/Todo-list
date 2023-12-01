import '@/styles/globals.css'
import { StoreProvider } from '@/store'

export default function App({ Component, pageProps }) {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </>
  ) 
}

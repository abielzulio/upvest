import "../styles/globals.css"
import type { AppProps } from "next/app"
import Main from "components/Main"
import { Toaster } from "react-hot-toast"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Main>
      <Toaster />
      <Component {...pageProps} />
    </Main>
  )
}

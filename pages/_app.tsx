import "../styles/globals.css"
import type { AppProps } from "next/app"
import Main from "components/Main"
import { Toaster } from "react-hot-toast"
import { UserProvider } from "context/user"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Main>
        <Toaster />
        <Component {...pageProps} />
      </Main>
    </UserProvider>
  )
}

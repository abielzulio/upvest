import Head from "components/Head"
import UserContext from "context/user"
import { useRouter } from "next/router"
import { FormEvent, useContext } from "react"
import { toast } from "react-hot-toast"
import { Item } from "type"

const WelcomePage = () => {
  const router = useRouter()
  const { items } = useContext(UserContext)
  const onLoginClick = (
    e: FormEvent<HTMLButtonElement>,
    items: Item[]
  ): Promise<boolean> => {
    e.preventDefault()
    toast.success("RHB account succesfully connected!")
    if (items && items.length === 0) return router.push("/new")
    return router.push("/")
  }
  return (
    <>
      <Head title="Welcome | Upvest" />
      <div className="px-[36px] pb-[36px] pt-[54px] flex flex-col min-h-screen justify-between">
        <h1 className="text-black text-[48px] font-medium">
          Your investment journey, start from here
        </h1>
        <div className="flex flex-col gap-[24px] mt-auto">
          <button
            onClick={(e) => onLoginClick(e, items)}
            type="button"
            className="bg-black h-[64px] w-full text-white rounded-full border-[2px] border-transparent font-semibold transition hover:bg-transparent hover:border-black hover:text-black"
          >
            Connect RHB Account
          </button>
        </div>
      </div>
    </>
  )
}

export default WelcomePage

import Link from "next/link"

const WelcomePage = () => {
  return (
    <div className="px-[36px] pb-[36px] pt-[54px] flex flex-col h-full justify-between">
      <h1 className="text-black text-[48px] font-medium">
        Your investment journey, start from here
      </h1>
      <div className="flex flex-col gap-[24px]">
        <Link href="/new">
          <button
            type="button"
            className="bg-black h-[64px] w-full text-white rounded-full border-[2px] border-transparent font-semibold transition hover:bg-transparent hover:border-black hover:text-black"
          >
            Connect RHB Account
          </button>
        </Link>
      </div>
    </div>
  )
}

export default WelcomePage

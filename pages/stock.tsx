import Head from "components/Head"
import UserContext from "context/user"
import { useRouter } from "next/router"
import { FormEvent, useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { DispatchSetState } from "type"

interface Stock {
  id: number
  symbol: string
  price: number[]
  gain: number
}

const StockCard = ({
  symbol,
  gain,
  selectedStock,
  setSelectedStock,
}: {
  symbol: string
  gain: number
  selectedStock: string | undefined
  setSelectedStock: DispatchSetState<string | undefined>
}) => {
  return (
    <div
      onClick={() => setSelectedStock(symbol)}
      className="flex justify-between items-center h-fit w-full p-[20px] bg-stock border-[1px] border-green-500 rounded-[10px]"
    >
      <div className="flex flex-col text-green-500">
        <p className="font-medium">{symbol}</p>
        <p className="font-mono text-[12px] opacity-50">
          {gain.toFixed(2) + `%` ?? `3 month 2 week`}
        </p>
      </div>
      {selectedStock === symbol ? (
        <span className="border-[1px] flex items-center justify-center text-[10px] border-green-500 rounded-full h-[20px] w-[20px] bg-green-500 text-white">
          ✓
        </span>
      ) : (
        <span className="border-[1px] border-green-500 rounded-full h-[20px] w-[20px] bg-white" />
      )}
    </div>
  )
}

const StockRecommendationPage = () => {
  const [selectedStock, setSelectedStock] = useState<string>()
  const [stocks, setStock] = useState<Stock[]>()
  const { userProfile } = useContext(UserContext)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [nextLoading, setNextLoading] = useState<boolean>(false)

  const router = useRouter()
  const QUERY_ITEM_DATA = router.query

  const { initial, final, spare, firstLoad } = router.query

  const onInvestClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setNextLoading(true)
  }

  useEffect(() => {
    if (nextLoading) {
      const toastLoad = toast.loading("Preparing your profile...")
      setTimeout(() => {
        router.push({
          pathname: "/app",
          query: { ...QUERY_ITEM_DATA, stock: selectedStock, toastLoad },
        })
      }, 5000)
    }
  }, [nextLoading])

  const fetchStock = async (profile: string | undefined) => {
    try {
      const res = await fetch(`/api/stock/${profile?.toLowerCase()}`)
      const data = await res.json()
      if (res.ok) {
        setStock(data.data)
        setLoading(false)
        toast.dismiss(firstLoad as string)
        toast.success("Done!")
      }
    } catch (e) {
      toast.error(e as string)
    }
  }

  useEffect(() => {
    fetchStock(userProfile?.toLowerCase())
  }, [userProfile])

  return (
    <>
      <Head title="Stock recommendations | Upvest" />
      <div className="pt-[36px] flex flex-col justify-between h-screen-safe pb-[108px]">
        <h1 className="text-black text-[36px] font-medium pb-[24px] px-[36px]">
          Here’s our stock recommendation* for you <br />
          <span className="opacity-50 text-[16px] font-normal -mt-[10px]">
            * based on past 1 year performance
          </span>
        </h1>
        {isLoading ? (
          <div className="flex items-center justify-center w-full">
            <p className="animate-spin text-[32px] text-black">◡</p>
          </div>
        ) : (
          stocks && (
            <div className="flex flex-col px-[36px] gap-[20px] mb-auto h-[500px] overflow-y-scroll">
              {stocks.map((item) => (
                <StockCard
                  key={item.id}
                  symbol={item.symbol}
                  gain={item.gain}
                  setSelectedStock={setSelectedStock}
                  selectedStock={selectedStock}
                />
              ))}
            </div>
          )
        )}
        <div className="flex flex-col gap-[24px] px-[36px] mt-[24px]">
          <button
            onClick={(e) => onInvestClick(e)}
            type="button"
            style={{ opacity: selectedStock ? 1 : 0.5 }}
            disabled={!selectedStock}
            className="bg-black h-[64px] w-full text-white rounded-full border-[2px] border-transparent font-semibold transition hover:bg-transparent hover:border-black hover:text-black"
          >
            {nextLoading ? (
              <p className="animate-spin">◡</p>
            ) : (
              `Let's invest ${selectedStock ?? ""}`
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default StockRecommendationPage

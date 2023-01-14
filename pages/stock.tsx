import Head from "components/Head"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { DispatchSetState } from "type"

const StockCard = ({
  symbol,
  duration,
  selectedStock,
  setSelectedStock,
}: {
  symbol: string
  duration?: string
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
          {duration ?? `3 month 2 week`}
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

  const router = useRouter()
  const QUERY_ITEM_DATA = router.query

  const onInvestClick = (
    e: FormEvent<HTMLButtonElement>,
    stock: string | undefined,
    item: any
  ) => {
    e.preventDefault()

    router.push({
      pathname: "/",
      query: { ...item, stock },
    })
  }

  return (
    <>
      <Head title="Stock recommendations | Upvest" />
      <div className="pb-[36px] pt-[48px] flex flex-col h-screen-safe">
        <h1 className="text-black text-[36px] font-medium pb-[24px] px-[36px]">
          Here’s our stock recommendation* for you <br />
          <span className="opacity-50 text-[16px] font-normal">
            * based on past 1 year performance
          </span>
        </h1>
        <div className="flex flex-col px-[36px] mb-[24px] gap-[20px] h-full overflow-y-scroll overflow-x-hidden">
          <StockCard
            symbol="AAPL"
            setSelectedStock={setSelectedStock}
            selectedStock={selectedStock}
          />
          <StockCard
            symbol="GOOGL"
            setSelectedStock={setSelectedStock}
            selectedStock={selectedStock}
          />
          <StockCard
            symbol="MSFT"
            setSelectedStock={setSelectedStock}
            selectedStock={selectedStock}
          />
          <StockCard
            symbol="NVDA"
            setSelectedStock={setSelectedStock}
            selectedStock={selectedStock}
          />
          <StockCard
            symbol="BBCA"
            setSelectedStock={setSelectedStock}
            selectedStock={selectedStock}
          />
          <StockCard
            symbol="SHOP"
            setSelectedStock={setSelectedStock}
            selectedStock={selectedStock}
          />
          <StockCard
            symbol="AAPL"
            setSelectedStock={setSelectedStock}
            selectedStock={selectedStock}
          />
        </div>
        <div className="flex flex-col gap-[24px] px-[36px]">
          <button
            onClick={(e) => onInvestClick(e, selectedStock, QUERY_ITEM_DATA)}
            type="button"
            style={{ opacity: selectedStock ? 1 : 0.5 }}
            disabled={!selectedStock}
            className="bg-black h-[64px] w-full text-white rounded-full border-[2px] border-transparent font-semibold transition hover:bg-transparent hover:border-black hover:text-black"
          >
            Let's invest {selectedStock ?? ""}
          </button>
        </div>
      </div>
    </>
  )
}

export default StockRecommendationPage

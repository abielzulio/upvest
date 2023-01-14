import Head from "components/Head"
import * as Icon from "components/Icon"
import UserContext from "context/user"
import { nanoid } from "nanoid"
import Link from "next/link"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { useContext, useState } from "react"
import { DispatchSetState, Item, Maybe } from "type"
import { UrlWithParsedQuery } from "url"

type BalanceType = "Invest" | "Bank"

const SwithBalanceButton = ({
  type,
  balanceType,
  setBalanceType,
}: {
  type: BalanceType
  balanceType: BalanceType
  setBalanceType: DispatchSetState<BalanceType>
}) => (
  <button
    type="button"
    onClick={() => setBalanceType(type)}
    className={`${
      balanceType === type ? `bg-white text-black` : `bg-transparent text-white`
    } px-[10px] py-[5px] rounded-full uppercase`}
  >
    {type}
  </button>
)

interface GoalItemCardProps {
  item: Item
}

const GoalItemCard = ({ item }: GoalItemCardProps) => {
  const percent =
    (item?.initial &&
      item?.price &&
      `${(Number(item.initial) / Number(item.price)) * 100}`) ||
    `10%`
  return (
    <div className="w-full flex flex-col gap-[5px] bg-white p-[24px] my-[15px] rounded-[10px] shadow-[0px_0px_20px_rgba(0,0,0,0.13)]">
      <div className="flex justify-between">
        <p className="text-[18px] font-medium flex items-center gap-[10px]">
          {item?.name}
        </p>
        <p className="font-mono">
          ${item?.initial.toLocaleString()}
          <span className="opacity-50">/${item?.price.toLocaleString()}</span>
        </p>
      </div>
      <div className="flex justify-between">
        <p className="text-[12px] opacity-50">11/11/2023</p>
        <p className="text-[10px] bg-black/10 px-[8px] py-[2px] rounded-full font-mono font-medium tracking-wide">
          {item?.stock}
        </p>
      </div>
      <div className="flex flex-col gap-[8px] mt-[15px] my-[10px]">
        <div className="relative h-[5px] w-full flex items-center justify-start">
          <span
            className="bg-green-500 h-full rounded-full z-10 absolute"
            style={{
              width: `${percent}%`,
            }}
          />
          <span className="bg-black/[0.08] rounded-full w-full h-full" />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-green-500 text-[14px]">
            {Number(percent).toFixed(2)}%
          </p>
          <p className="text-black opacity-50 font-medium text-[12px]">
            1 more months
          </p>
        </div>
      </div>
      <button className="bg-black hover:bg-opacity-80 transition font-medium text-[14px] h-[48px] text-white rounded-full">
        Top up
      </button>
    </div>
  )
}

const HomePage = () => {
  const router = useRouter()
  const { items, userProfile } = useContext(UserContext)
  const [balanceType, setBalanceType] = useState<BalanceType>("Invest")
  const [isLoading, setLoading] = useState<boolean>(true)

  const ITEM_PLACEHOLDER_DATA = {
    name: "iPad Air",
    initial: 50,
    price: 1500,
    id: nanoid(),
    stock: "GOOG",
  }

  const { id, name, price, initial, stock } = router.query

  const DATA = {
    id,
    name,
    price: Number(price),
    initial: Number(initial),
    stock,
  } as {
    id: string
    name: string
    price: number
    initial: number
    stock: string
  }

  /*   useEffect(() => {
    if (userProfile === "") {
      router.push("welcome")
      setLoading(false)
    }
  }, []) */

  /*   isLoading && <p>Loading</p> */

  return (
    <>
      <Head title="Home | Upvest" />
      <div className="flex flex-col h-full justify-between bg-black">
        <div className="h-fit flex flex-col gap-[15px] pb-[32px] justify-center items-center w-full text-white">
          <div className="flex items-center h-fit w-full px-[24px] pt-[54px] justify-between">
            <Icon.Setting />
            <p className="opacity-50 font-semibold">Your balance</p>
            <Icon.User />
          </div>
          <p className="font-mono text-[64px] flex">
            {balanceType === "Invest" ? (
              <>
                <span className="text-[32px] opacity-50 mt-[15px]">$</span>
                {DATA.initial ? Number(DATA.initial ?? 0).toLocaleString() : 50}
              </>
            ) : (
              <>
                <span className="text-[32px] opacity-50 mt-[15px]">$</span>
                {(10000).toLocaleString()}
              </>
            )}
          </p>
          <div className="mx-auto flex gap-[5px] uppercase font-medium text-[12px] bg-white/20 px-[8px] py-[8px] rounded-full">
            <SwithBalanceButton
              balanceType={balanceType}
              setBalanceType={setBalanceType}
              type="Invest"
            />
            <SwithBalanceButton
              balanceType={balanceType}
              setBalanceType={setBalanceType}
              type="Bank"
            />
          </div>
        </div>
        <div className="w-full h-full gap-[20px] flex flex-col rounded-tl-[32px] rounded-tr-[32px] pt-[32px] text-black bg-white/[0.95]">
          <div className="flex items-center justify-between px-[32px]">
            <p className="text-[18px] font-medium opacity-80">My goals</p>
            <Link href="/new">
              <button
                type="button"
                className="opacity-50 hover:opacity-100 transition"
              >
                + Create new
              </button>
            </Link>
          </div>
          <div className="flex flex-col px-[32px] overflow-x-hidden overflow-y-scroll h-full">
            {DATA.name ? (
              <GoalItemCard item={DATA} />
            ) : (
              <GoalItemCard item={ITEM_PLACEHOLDER_DATA as Item} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage

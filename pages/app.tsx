import Head from "components/Head"
import * as Icon from "components/Icon"
import UserContext from "context/user"
import { nanoid } from "nanoid"
import { useRouter } from "next/router"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { DispatchSetState, Item, Maybe } from "type"

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
  withdraw: boolean
  setWithdraw: DispatchSetState<boolean>
  setItem: DispatchSetState<Item>
}

interface TopUp {
  amount: number
  isShow: boolean
}

const GoalItemCard = ({
  item,
  withdraw,
  setItem,
  setWithdraw,
}: GoalItemCardProps) => {
  const [topUp, setTopUp] = useState<TopUp>({
    amount: 0,
    isShow: false,
  })
  const percent =
    (item.initial &&
      item.final &&
      `${(Number(item.initial) / Number(item.final)) * 100}`) ||
    `10%`

  useEffect(() => {
    if (item.initial > item.final) {
      toast.success(`${item.name}'s investment is ready to withdraw`)
      setItem({ ...item, success: true })
    }
  }, [item.initial])

  const handleTopUp = () => {
    setItem({ ...item, initial: item.initial + topUp.amount })
    toast.success(`$${topUp.amount} is succesfully invested`)
  }

  const handleWithdraw = () => {
    toast.success(`$${topUp.amount} is succesfully withdrawn`)
    setWithdraw((prev) => !prev)
  }

  return (
    <div className="w-full flex flex-col gap-[5px] bg-white p-[24px] my-[15px] rounded-[10px] shadow-[0px_0px_20px_rgba(0,0,0,0.13)]">
      <div className="flex justify-between">
        <p className="text-[18px] font-medium flex items-center gap-[10px]">
          {item?.name}
        </p>
        <p className="font-mono">
          ${item?.initial.toLocaleString()}
          <span className="opacity-50">/${item?.final.toLocaleString()}</span>
        </p>
      </div>
      <div className="flex justify-between">
        <p className="text-[12px] opacity-50">11/11/2023</p>
        <p className="text-[10px] bg-black/10 px-[8px] py-[2px] rounded-full font-mono font-medium tracking-wide">
          {item?.stock}
        </p>
      </div>
      {!withdraw ? (
        <>
          <div className="flex flex-col gap-[8px] mt-[15px] my-[10px]">
            <div className="relative h-[5px] w-full flex items-center justify-start">
              <span
                className="bg-green-500 h-full rounded-full z-10 absolute"
                style={{
                  width: item?.success ? `100%` : `${percent}%`,
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
          {topUp.isShow && (
            <div className="flex w-full h-[32px] justify-between mb-[20px] gap-[20px]">
              <button
                type="button"
                disabled={topUp.amount === 0}
                style={{
                  opacity: topUp.amount === 0 ? 0.3 : 1,
                }}
                onClick={() => setTopUp({ ...topUp, amount: topUp.amount - 1 })}
                className="border-[1px] border-black/10 w-[36px] rounded-md"
              >
                -
              </button>
              <input
                type="number"
                value={topUp.amount > 0 ? topUp.amount : undefined}
                defaultValue={topUp.amount}
                className="border-[2px] border-black/10 h-[36px] pl-[12px] w-full bg-transparent rounded-[6px] placeholder:text-black/30 "
                placeholder="0"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTopUp({ ...topUp, amount: Number(e.target.value) })
                }
              />
              <button
                type="button"
                onClick={() => setTopUp({ ...topUp, amount: topUp.amount + 1 })}
                className="border-[1px] border-black/10 w-[36px] rounded-md"
              >
                +
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() =>
              topUp.isShow
                ? handleTopUp()
                : item.success
                ? handleWithdraw()
                : setTopUp({ ...topUp, isShow: !topUp.isShow })
            }
            style={{
              opacity: topUp.isShow && topUp.amount === 0 ? 0.5 : 1,
            }}
            disabled={topUp.isShow && topUp.amount === 0}
            className={`${
              !topUp.isShow && item.success ? `bg-green-500` : `bg-black`
            } hover:bg-opacity-80 transition font-medium text-[14px] h-[48px] text-white rounded-full`}
          >
            {topUp.isShow
              ? topUp.amount === 0
                ? `Input your top-up amount`
                : `Click to Top-up $${topUp.amount}`
              : item.success
              ? `Withdraw`
              : `Top-up`}
          </button>
          {topUp.isShow && (
            <button
              type="button"
              onClick={() => setTopUp({ ...topUp, isShow: !topUp.isShow })}
              className="text-[14px] opacity-50 mt-[10px]"
            >
              Cancel
            </button>
          )}
          {!topUp.isShow && item.success && (
            <button
              type="button"
              onClick={() => setTopUp({ ...topUp, isShow: !topUp.isShow })}
              className="text-[14px] opacity-50 mt-[10px]"
            >
              Top-up
            </button>
          )}
        </>
      ) : (
        <p className="text-green-500 text-[14px]">Withdrawn</p>
      )}
    </div>
  )
}

const HomePage = () => {
  const router = useRouter()
  const [balanceType, setBalanceType] = useState<BalanceType>("Invest")
  const [item, setItem] = useState<Item>({
    name: "iPad Air",
    initial: 50,
    final: 1500,
    spare: 100,
    id: nanoid(),
    stock: "GOOG",
  })
  const [withdraw, setWithdraw] = useState<boolean>(false)

  const QUERY_ITEM_DATA = router.query

  useEffect(() => {
    const DATA = {
      id: QUERY_ITEM_DATA.id,
      name: QUERY_ITEM_DATA.name,
      final: Number(QUERY_ITEM_DATA.final),
      initial: Number(QUERY_ITEM_DATA.initial),
      spare: Number(QUERY_ITEM_DATA.spare),
      stock: QUERY_ITEM_DATA.stock,
    } as {
      id: string
      name: string
      final: number
      initial: number
      stock: string
      spare: number
    }

    if (DATA.id && DATA.id.length > 0) {
      setItem(DATA)
    }
  }, [QUERY_ITEM_DATA])

  useEffect(() => {
    if (QUERY_ITEM_DATA.toastLoad) {
      toast.dismiss(QUERY_ITEM_DATA.toastLoad as string)
      toast.success("Your profile is ready!")
    }
  }, [])

  return (
    <>
      <Head title="Home | Upvest" />
      <div className="flex flex-col h-screen-safe bg-black">
        <div className="h-fit flex flex-col gap-[15px] pb-[32px] justify-center items-center w-full text-white">
          <div className="flex items-center h-fit w-full px-[24px] pt-[36px] justify-center">
            {/*             <Icon.Setting /> */}
            <p className="opacity-50 font-semibold">Your balance</p>
            {/*             <Icon.User /> */}
          </div>
          <p className="font-mono text-[64px] flex">
            {balanceType === "Invest" ? (
              <>
                <span className="text-[32px] opacity-50 mt-[15px]">$</span>
                {withdraw ? `0` : Number(item.initial ?? 0).toLocaleString()}
              </>
            ) : (
              <>
                <span className="text-[32px] opacity-50 mt-[15px]">$</span>
                {withdraw
                  ? (10000 + Number(item.initial)).toLocaleString()
                  : (10000 - Number(item.initial ?? 0)).toLocaleString()}
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
        <div className="w-full gap-[20px] flex flex-col h-screen-safe rounded-tl-[32px] rounded-tr-[32px] pt-[32px] pb-[32px] text-black bg-white/[0.95]">
          <div className="flex items-center justify-between px-[32px]">
            <p className="text-[18px] font-medium opacity-80">My goals</p>
            {/*             <Link href="/new">
              <button
                type="button"
                className="opacity-50 hover:opacity-100 transition"
              >
                + Create new
              </button>
            </Link> */}
          </div>
          <div className="flex flex-col px-[32px] h-full -mb-[10px]">
            {QUERY_ITEM_DATA.name ? (
              <>
                <GoalItemCard
                  item={item}
                  withdraw={withdraw}
                  setItem={setItem}
                  setWithdraw={setWithdraw}
                />
              </>
            ) : (
              <GoalItemCard
                item={item}
                withdraw={withdraw}
                setItem={setItem}
                setWithdraw={setWithdraw}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage

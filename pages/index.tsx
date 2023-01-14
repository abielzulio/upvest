import * as Icon from "components/Icon"
import Link from "next/link"
import { useState } from "react"
import { DispatchSetState } from "type"

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

const HomePage = () => {
  const [balanceType, setBalanceType] = useState<BalanceType>("Invest")
  return (
    <div className="flex flex-col h-full justify-between bg-black">
      <div className="h-fit flex flex-col gap-[15px] pb-[32px] justify-center items-center w-full text-white">
        <div className="flex items-center h-fit w-full px-[24px] pt-[54px] justify-between">
          <Icon.Setting />
          <p className="opacity-50 font-semibold">Your balance</p>
          <Icon.User />
        </div>
        <p className="font-mono text-[64px] flex">
          <span className="text-[32px] opacity-50 mt-[15px]">$</span>100
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
        <div className="flex flex-col px-[32px] overflow-scroll gap-[20px]">
          <div className="w-full flex flex-col gap-[5px] bg-white p-[24px] rounded-[10px] shadow-[0px_0px_20px_rgba(0,0,0,0.13)]">
            <div className="flex justify-between">
              <p className="text-[18px] font-medium flex items-center gap-[10px]">
                iPhone 11
              </p>
              <p className="font-mono">
                $100<span className="opacity-50">/$1500</span>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[12px] opacity-50">11/11/2023</p>
              <p className="text-[10px] bg-black/10 px-[8px] py-[2px] rounded-full font-mono font-medium tracking-wide">
                AAPL
              </p>
            </div>
            <div className="flex flex-col gap-[8px] mt-[15px] my-[10px]">
              <span className="h-[5px] bg-green-500 rounded-full" />
              <div className="flex justify-between items-center">
                <p className="text-green-500 text-[14px]">100%</p>
                <p className="text-green-500 font-medium text-[12px]">
                  Time to cash out
                </p>
              </div>
            </div>
            <button className="bg-green-500 hover:bg-opacity-80 transition font-medium text-[14px] h-[48px] text-white rounded-full">
              Cash out
            </button>
          </div>
          <div className="w-full flex flex-col gap-[5px] bg-white p-[24px] rounded-[10px] shadow-[0px_0px_20px_rgba(0,0,0,0.13)]">
            <div className="flex justify-between">
              <p className="text-[18px] font-medium flex items-center gap-[10px]">
                iPhone 11
              </p>
              <p className="font-mono">
                $100<span className="opacity-50">/$1500</span>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[12px] opacity-50">11/11/2023</p>
              <p className="text-[10px] bg-black/10 px-[8px] py-[2px] rounded-full font-mono font-medium tracking-wide">
                AAPL
              </p>
            </div>
            <div className="flex flex-col gap-[8px] mt-[15px] my-[10px]">
              <span className="h-[5px] bg-green-500 rounded-full" />
              <div className="flex justify-between items-center">
                <p className="text-green-500 text-[14px]">100%</p>
                <p className="text-green-500 font-medium text-[12px]">
                  Time to cash out
                </p>
              </div>
            </div>
            <button className="bg-green-500 hover:bg-opacity-80 transition font-medium text-[14px] h-[48px] text-white rounded-full">
              Cash out
            </button>
          </div>
          <div className="w-full flex flex-col gap-[5px] bg-white p-[24px] rounded-[10px] shadow-[0px_0px_20px_rgba(0,0,0,0.13)]">
            <div className="flex justify-between">
              <p className="text-[18px] font-medium flex items-center gap-[10px]">
                iPhone 11
              </p>
              <p className="font-mono">
                $100<span className="opacity-50">/$1500</span>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[12px] opacity-50">11/11/2023</p>
              <p className="text-[10px] bg-black/10 px-[8px] py-[2px] rounded-full font-mono font-medium tracking-wide">
                AAPL
              </p>
            </div>
            <div className="flex flex-col gap-[8px] mt-[15px] my-[10px]">
              <span className="h-[5px] bg-green-500 rounded-full" />
              <div className="flex justify-between items-center">
                <p className="text-green-500 text-[14px]">100%</p>
                <p className="text-green-500 font-medium text-[12px]">
                  Time to cash out
                </p>
              </div>
            </div>
            <button className="bg-green-500 hover:bg-opacity-80 transition font-medium text-[14px] h-[48px] text-white rounded-full">
              Cash out
            </button>
          </div>
          <div className="w-full flex flex-col gap-[5px] bg-white p-[24px] rounded-[10px] shadow-[0px_0px_20px_rgba(0,0,0,0.13)]">
            <div className="flex justify-between">
              <p className="text-[18px] font-medium flex items-center gap-[10px]">
                iPhone 11
              </p>
              <p className="font-mono">
                $100<span className="opacity-50">/$1500</span>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[12px] opacity-50">11/11/2023</p>
              <p className="text-[10px] bg-black/10 px-[8px] py-[2px] rounded-full font-mono font-medium tracking-wide">
                AAPL
              </p>
            </div>
            <div className="flex flex-col gap-[8px] mt-[15px] my-[10px]">
              <span className="h-[5px] bg-green-500 rounded-full" />
              <div className="flex justify-between items-center">
                <p className="text-green-500 text-[14px]">100%</p>
                <p className="text-green-500 font-medium text-[12px]">
                  Time to cash out
                </p>
              </div>
            </div>
            <button className="bg-green-500 hover:bg-opacity-80 transition font-medium text-[14px] h-[48px] text-white rounded-full">
              Cash out
            </button>
          </div>
          <div className="w-full flex flex-col gap-[5px] bg-white p-[24px] rounded-[10px] shadow-[0px_0px_20px_rgba(0,0,0,0.13)]">
            <div className="flex justify-between">
              <p className="text-[18px] font-medium flex items-center gap-[10px]">
                iPhone 11
              </p>
              <p className="font-mono">
                $100<span className="opacity-50">/$1500</span>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[12px] opacity-50">11/11/2023</p>
              <p className="text-[10px] bg-black/10 px-[8px] py-[2px] rounded-full font-mono font-medium tracking-wide">
                AAPL
              </p>
            </div>
            <div className="flex flex-col gap-[8px] mt-[15px] my-[10px]">
              <span className="h-[5px] bg-green-500 rounded-full" />
              <div className="flex justify-between items-center">
                <p className="text-green-500 text-[14px]">100%</p>
                <p className="text-green-500 font-medium text-[12px]">
                  Time to cash out
                </p>
              </div>
            </div>
            <button className="bg-green-500 hover:bg-opacity-80 transition font-medium text-[14px] h-[48px] text-white rounded-full">
              Cash out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

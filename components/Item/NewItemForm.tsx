import { useRouter } from "next/router"
import { ChangeEvent, FormEvent } from "react"
import { toast } from "react-hot-toast"
import { DispatchSetState, Item } from "type"

export const NewItemForm = ({
  item,
  setItem,
  path,
}: {
  item: Item
  setItem: DispatchSetState<Item>
  path: string
}) => {
  const router = useRouter()

  const onSubmitForm = (
    e: FormEvent<HTMLFormElement>,
    item: Item,
    path: string
  ) => {
    e.preventDefault()

    if (!item.name) toast.error("Goal name can't be empty")
    if (!item.price || item.price === 0)
      toast.error("Goal price amount can't be zero")
    if (!item.initial || item.initial === 0)
      toast.error("Initial investment amount can't be zero")

    if (item.name && item.initial > 0 && item.price > 0)
      return router.push({
        pathname: path,
        query: {
          id: item.id,
          name: item.name,
          price: item.price,
          initial: item.initial,
        },
      })
  }
  return (
    <form
      className="flex flex-col gap-[16px] bg-black/[0.03] text-black p-[24px] rounded-[20px] h-full"
      onSubmit={(e) => onSubmitForm(e, item, path)}
    >
      <p className="text-[18px] font-semibold opacity-50">Goal details</p>
      <div className="flex flex-col gap-[8px]">
        <label htmlFor="name" className="text-sm opacity-50 font-semibold">
          Name
        </label>
        <input
          type="name"
          id="name"
          className="border-[2px] border-black/10 h-[36px] pl-[12px] bg-transparent rounded-[6px] placeholder:text-black/30"
          placeholder="Goals name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setItem({ ...item, name: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <label htmlFor="price" className="text-sm opacity-50 font-semibold">
          Price (in dollar $)
        </label>
        <input
          type="number"
          id="price"
          className="border-[2px] border-black/10 h-[36px] pl-[12px] bg-transparent rounded-[6px] placeholder:text-black/30 "
          placeholder="Price amount"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setItem({ ...item, price: Number(e.target.value) })
          }
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <label htmlFor="initial" className="text-sm opacity-50 font-semibold">
          Initial Investment (in dollar $)
        </label>
        <input
          type="number"
          id="initial"
          className="border-[2px] border-black/10 h-[36px] pl-[12px] bg-transparent rounded-[6px] placeholder:text-black/30 "
          placeholder="Initial amount"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setItem({ ...item, initial: Number(e.target.value) })
          }
        />
      </div>
      <div className="mt-auto">
        <button className="bg-black/10 text-black cursor-pointer font-semibold py-[10px] w-full h-[51px] rounded-full transition hover:bg-black/20">
          Create My First Goal
        </button>
      </div>
    </form>
  )
}

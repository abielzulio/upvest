import Head from "components/Head"
import { NewItemForm } from "components/Item"
import { nanoid } from "nanoid"
import { useState } from "react"
import { Item } from "type"

const NewItemPage = () => {
  const [item, setItem] = useState<Item>({
    id: nanoid(),
    name: "",
    price: 0,
    initial: 0,
  })
  return (
    <>
      <Head title="Create new goal | Upvest" />
      <div className="px-[36px] py-[36px] flex flex-col h-screen-safe gap-[36px]">
        <h1 className="text-black text-[36px] font-medium pb-[36x] h-full">
          What’s your investment goal?
        </h1>
        <div className="flex items-center justify-center w-full h-full">
          <NewItemForm item={item} setItem={setItem} path="/profile-type" />
        </div>
      </div>
    </>
  )
}

export default NewItemPage

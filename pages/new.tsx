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
      <div className="px-[36px] py-[36px] flex flex-col h-screen-safe justify-between">
        <h1 className="text-black text-[36px] font-medium pb-[36x]">
          What’s your investment goal?
        </h1>
        <NewItemForm item={item} setItem={setItem} path="/profile-type" />
      </div>
    </>
  )
}

export default NewItemPage

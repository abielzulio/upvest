import { supabase } from "lib/initSupabase"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const type = req.query.type
  try {
    const { data, error } = await supabase
      .from("tb_stock")
      .select("*, tb_price(*)")
      .eq("type", type)
      .range(0, 5)

    if (error) {
      throw new Error("there is error at server")
    }

    const formatedData = data.map((e: any) => {
      const price = e.tb_price.map((e: any) => parseFloat(e.close))
      return {
        id: e.stock_id,
        symbol: e.symbol,
        price: price.slice(0, 12)
      }
    })
    return res.status(200).json({ message: "success", data:  formatedData })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Terdapat error di sisi klien!", error })
  }
}

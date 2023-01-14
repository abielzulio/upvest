import { supabase } from "lib/initSupabase"
import { NextApiRequest, NextApiResponse } from "next"

import _ from "lodash"

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { s, e } = req.query
  try {
    if (!(s && e) || +s < 1 || +e < 1) {
      const { data, error } = await supabase
        .from("tb_stock")
        .select("*, tb_price(*)")

      if (error) {
        throw new Error("there is error at server")
      }

      const formatedData = data.map((e: any) => {
        const price = e.tb_price.map((e: any) => parseFloat(e.close))
        return {
          id: e.stock_id,
          symbol: e.symbol,
          price: price.slice(0, 12),
          gain: _.sum(price.slice(0, 12)) / 12,
        }
      })
      return res.status(200).json({
        message: "success",
        data: _.orderBy(formatedData, (e) => e.gain, ["desc"]),
      })
    }

    const { data, error } = await supabase
      .from("tb_stock")
      .select("*, tb_price(*)")
      .range(+s - 1, +e - 1)

    if (error) {
      throw new Error("there is error at server")
    }

    const formatedData = data.map((e: any) => {
      const price = e.tb_price.map((e: any) => parseFloat(e.close))
      return {
        id: e.stock_id,
        symbol: e.symbol,
        price: price.slice(0, 12),
        gain: _.sum(price.slice(0, 12)) / 12,
      }
    })
    return res
      .status(200)
      .json({
        message: "success",
        data: _.orderBy(formatedData, (e) => e.gain, ["desc"]),
      })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Terdapat error di sisi klien!", error })
  }
}

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useReducer,
  useState,
} from "react"

export type DispatchSetState<T> = Dispatch<SetStateAction<T>>

export interface Item {
  id: string
  name: string
  initial: number
  price: number
}

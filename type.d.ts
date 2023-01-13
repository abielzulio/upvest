import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useReducer,
  useState,
} from "react"

export type DispatchSetState<T> = Dispatch<SetStateAction<T>>

export type UserProfileType =
  | "Conservative"
  | "Moderate"
  | "Aggresive"
  | string
  | null
  | undefined

export interface Item {
  id: string
  name: string
  initial: number
  price: number
}

export interface LoadingData {
  items: boolean | null
  userProfile: boolean | null
}

export interface UserContextType {
  items: Item[]
  userProfile: UserProfileType
  isLoading: LoadingData | null
  error: string
  setItems: DispatchSetState<Item[]>
  setUserProfile: DispatchSetState<UserProfileType>
}

export interface UserProviderProps {
  children: React.ReactNode
}

import { createContext, useEffect, useState } from "react"
import {
  Item,
  LoadingData,
  UserContextType,
  UserProfileType,
  UserProviderProps,
} from "type"

const UPVEST = {
  items: "UPVEST_ITEMS",
  userProfile: "UPVEST_USER_PROFILE",
}

const UserContext = createContext<UserContextType>({
  items: [],
  userProfile: "",
  isLoading: null,
  error: "",
  setItems: () => {},
  setUserProfile: () => {},
})

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [items, setItems] = useState<Item[]>(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem(UPVEST.items)) {
        return JSON.parse(
          localStorage.getItem(UPVEST.items) as string
        ) satisfies Item[]
      } else {
        return []
      }
    }
  })
  const [userProfile, setUserProfile] = useState<UserProfileType>(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem(UPVEST.userProfile)) {
        return JSON.parse(localStorage.getItem(UPVEST.userProfile) as string)
      } else {
        return ""
      }
    }
  })
  const [error, setError] = useState<string>("")
  const [isLoading, setLoading] = useState<LoadingData>({
    items: null,
    userProfile: null,
  })

  useEffect(() => {
    setLoading({ ...isLoading, items: true })
    localStorage.setItem(UPVEST.items, JSON.stringify(items))
    setLoading({ ...isLoading, items: false })
  }, [items])

  useEffect(() => {
    setLoading({ ...isLoading, userProfile: true })
    localStorage.setItem(UPVEST.userProfile, JSON.stringify(userProfile))
    setLoading({ ...isLoading, userProfile: false })
  }, [userProfile])

  return (
    <UserContext.Provider
      value={{ items, userProfile, isLoading, error, setItems, setUserProfile }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext

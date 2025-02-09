'use client'
import { createContext, useContext, useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount"

//Create Context
const GlobalContext = createContext()

//Create Provider
export const GlobalContextProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0)
  const { data: session } = useSession()

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        setUnreadCount(res.count)
      })
    }
  }, [getUnreadMessageCount, session])

  return (
    <GlobalContext.Provider value={{
      unreadCount,
      setUnreadCount
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

//Use Context
export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
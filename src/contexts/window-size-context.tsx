"use client"

import { createContext, useEffect, useState } from "react"

export const INITIAL_NOT_KNOW_SIZE = undefined

type StateType = {
  height: number | typeof INITIAL_NOT_KNOW_SIZE
  width: number | typeof INITIAL_NOT_KNOW_SIZE
}

export const WindowSizeContext = createContext<StateType | null>(null)

export const WindowSizeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [size, setSize] = useState<StateType>({
    height: INITIAL_NOT_KNOW_SIZE,
    width: INITIAL_NOT_KNOW_SIZE,
  })

  useEffect(() => {
    if (!window) return

    const { innerWidth, innerHeight } = window
    setSize({ width: innerWidth, height: innerHeight })

    const handleResize = () => {
      const { innerWidth, innerHeight } = window
      setSize({ width: innerWidth, height: innerHeight })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <WindowSizeContext.Provider value={size}>
      {children}
    </WindowSizeContext.Provider>
  )
}

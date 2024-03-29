"use client"

import { onAuthStateChanged } from "@/firebase/utils"
import { useState, useEffect } from "react"

export const USER_POSSIBLE_STATES = {
  NOT_LOGGED: false,
  NOT_KNOWN: undefined,
}

export default function useUser() {
  const [admin, setAdmin] = useState<boolean | undefined>(
    USER_POSSIBLE_STATES.NOT_KNOWN,
  )

  const setState = (value: boolean) => {
    setAdmin(value)
  }

  useEffect(() => {
    onAuthStateChanged(setState)
  }, [])

  return admin
}

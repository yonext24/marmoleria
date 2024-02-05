"use client"

import { navEntryTypeId } from "@/app/components/UI/navbar/navbar"
import { usePathname } from "next/navigation"
import { createContext, useState, ReactNode } from "react"

export type currentNavbarSectionType = navEntryTypeId | undefined

type currentNavbarSectionContextType = {
  currentSection: currentNavbarSectionType
  setSection: (section: currentNavbarSectionType) => void
} | null

export const currentNavbarSectionContext =
  createContext<currentNavbarSectionContextType>(null)

export const CurrentNavbarSectionProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const path = usePathname()

  const [currentSection, setCurrentSection] =
    useState<currentNavbarSectionType>(() => {
      if (path === "/") return "inicio"
      return "inicio"
    })

  const setSection = (section: currentNavbarSectionType) => {
    setCurrentSection(section)
  }

  return (
    <currentNavbarSectionContext.Provider
      value={{ currentSection, setSection }}
    >
      {children}
    </currentNavbarSectionContext.Provider>
  )
}

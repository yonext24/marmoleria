"use client"

import { useRef, useState } from "react"
import { NavLink } from "./nav-link"
import { currentNavbarSectionType, navEntrys } from "./navbar"

export const NavbarWideFallback = () => (
  <div className="w-full h-[80px] bg-white/40 backdrop-blur" />
)

export default function Navbar() {
  const [currentSectionPositionData, setCurrentSectionPositionData] =
    useState<currentNavbarSectionType | null>(null)

  const changeSectionPositionData = (data: currentNavbarSectionType) => {
    setCurrentSectionPositionData(data)
  }

  const menuBackdrop = useRef<HTMLDivElement>(null)

  return (
    <nav className="w-full flex justify-center h-[80px] relative">
      <div className="fixed h-[80px] w-full bg-white/40 backdrop-blur" />
      <div
        ref={menuBackdrop}
        id="menu-backdrop"
        className={`
          fixed bg-gold/70 border-2 border-gold data-[current=true]:bg-transparent rounded pointer-events-none
          translate-x-[var(--left)] translate-y-[var(--top)]
          left-0 top-0
          w-[var(--width)] h-[var(--height)]
          transition-all duration-300
          ease-in-out opacity-0

        `}
      />
      <ul
        className="flex justify-center items-center gap-12 uppercase w-full h-[80px] fixed top-0 left-0
      bg-white/40"
      >
        {navEntrys.map((entry) => (
          <NavLink
            menuBackdrop={menuBackdrop}
            currentSectionPositionData={currentSectionPositionData}
            changePositionData={changeSectionPositionData}
            key={entry.href}
            {...entry}
          />
        ))}
      </ul>
    </nav>
  )
}

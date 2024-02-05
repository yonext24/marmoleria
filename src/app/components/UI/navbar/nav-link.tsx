/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useRef, useCallback, useEffect } from "react"
import { useNavbarSection } from "@/hooks/useNavbarSection"
import { currentNavbarSectionType, navEntryType } from "./navbar"
import { useClientSize } from "@/hooks/useClientSize"
import debounce from "just-debounce-it"
import Link from "next/link"

type LinkEntryProps = navEntryType & {
  menuBackdrop: React.RefObject<HTMLDivElement>
  currentSectionPositionData: currentNavbarSectionType | null
  changePositionData: (data: currentNavbarSectionType) => void
}

export function NavLink({
  menuBackdrop,
  text,
  href,
  id,
  currentSectionPositionData,
  changePositionData
}: LinkEntryProps) {
  const liRef = useRef<HTMLLIElement>(null)
  const { currentSection } = useNavbarSection()
  const { width } = useClientSize()

  const setMenuBackdropPosition = useCallback(
    ({
      top,
      left,
      width,
      height
    }: {
      top: number
      left: number
      width: number
      height: number
    }) => {
      if (liRef.current == null || menuBackdrop.current == null) return

      menuBackdrop.current.style.setProperty("--left", `${left}px`)
      menuBackdrop.current.style.setProperty("--top", `${top}px`)
      menuBackdrop.current.style.setProperty("--width", `${width}px`)
      menuBackdrop.current.style.setProperty("--height", `${height}px`)
    },
    [menuBackdrop]
  )

  const handleResize = useCallback(
    debounce(() => {
      if (currentSectionPositionData == null) return
      if (currentSection !== id) return
      if (!liRef.current) return
      console.log("resize")

      const { left, top, width, height } = liRef.current.getBoundingClientRect()

      changePositionData({
        left,
        top,
        width,
        height
      })
      setMenuBackdropPosition({ left, top, width, height })
    }, 500),
    [changePositionData, liRef, setMenuBackdropPosition]
  )

  const handleMouseEnter = useCallback(() => {
    if (liRef.current == null || menuBackdrop.current == null) return
    const { left, top, width, height } = liRef.current.getBoundingClientRect()

    setMenuBackdropPosition({ left, top, width, height })
    menuBackdrop.current.setAttribute("data-current", "false")
  }, [liRef, menuBackdrop])

  useEffect(() => {
    if (liRef.current === null) return
    if (currentSection !== id) return
    if (!menuBackdrop.current) return

    const { left, top, width, height } = liRef.current.getBoundingClientRect()

    changePositionData({
      left,
      top,
      width,
      height
    })

    setMenuBackdropPosition({ left, top, width, height })
    menuBackdrop.current.style.opacity = "1"
    menuBackdrop.current.style.visibility = "visible"
    menuBackdrop.current.setAttribute("data-current", "true")
  }, [currentSection, menuBackdrop])

  useEffect(handleResize, [width, menuBackdrop])

  const handleMouseLeave = () => {
    if (menuBackdrop.current == null) return

    const { top, left, width, height } = currentSectionPositionData ?? {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    }

    setMenuBackdropPosition({ top, left, width, height })
    menuBackdrop.current.setAttribute("data-current", "true")
  }

  return (
    <li
      className="flex rounded-md relative z-30 hover:text-white transition-colors"
      ref={liRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        className="py-2 px-4 cursor-pointer"
        scroll={true}
        href={href ?? ""}
      >
        {text}
      </Link>
    </li>
  )
}

"use client"

import dynamic from "next/dynamic"
import { NavbarWideFallback } from "./nav-wide"
import { MOBILE_WIDTH, useClientSize } from "@/hooks/useClientSize"
import { INITIAL_NOT_KNOW_SIZE } from "@/contexts/window-size-context"

export type navEntryTypeId = "marmol" | "mueble" | "inicio" | "contacto"
export type navEntryTypeHref = "#marmol" | "#mueble" | "/" | "/contacto"

export interface navEntryType {
  text: string
  href: navEntryTypeHref
  id: navEntryTypeId
}

export const navEntrys = [
  { text: "Inicio", href: "/", id: "inicio" },
  { text: "Mármoles", href: "/#marmol", id: "marmol" },
  { text: "Muebles", href: "/#mueble", id: "mueble" },
  { text: "Contacto", href: "/contacto", id: "contacto" }
] as navEntryType[]

export type currentNavbarSectionType = {
  left: number
  top: number
  width: number
  height: number
}

const WideNavbar = dynamic(
  async (): Promise<React.ComponentType> =>
    await import("./nav-wide").then((module) => module.default),
  { loading: () => <NavbarWideFallback /> }
)
const MobileNavbar = dynamic(
  async (): Promise<React.ComponentType> =>
    await import("./nav-mobile").then((module) => module.default),
  { loading: () => <div /> }
)

export function Navbar() {
  const { width } = useClientSize()

  if (width === INITIAL_NOT_KNOW_SIZE)
    return <div className="md:h-[80px] md:w-full md:bg-white" />

  const isMobile = (width ?? 500) < MOBILE_WIDTH

  return <>{isMobile ? <MobileNavbar /> : <WideNavbar />}</>
}

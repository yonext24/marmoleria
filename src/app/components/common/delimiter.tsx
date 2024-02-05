"use client"

import { useIntersect } from "@/hooks/useIntersect"
import { useNavbarSection } from "@/hooks/useNavbarSection"
import { useEffect } from "react"
import { navEntryTypeId } from "../UI/navbar/navbar"

export function Delimiter({
  name,
  rootMargin
}: {
  name: navEntryTypeId
  rootMargin?: string
}) {
  const { intersecting, fromRef } = useIntersect({
    once: false,
    rootMargin
  })

  const { setCurrentSection } = useNavbarSection()

  useEffect(() => {
    if (!intersecting) return

    setCurrentSection(name)
  }, [intersecting, name, setCurrentSection])

  return <div className="h-1 w-full bg-transparent" ref={fromRef} />
}

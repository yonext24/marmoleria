import { currentNavbarSectionContext } from "@/contexts/current-navbar-section-context"
import { useContext } from "react"

export function useNavbarSection() {
  const { currentSection, setSection: setCurrentSection } = useContext(
    currentNavbarSectionContext,
  ) ?? { currentSection: undefined, setSection: () => {} }
  // why not

  return { currentSection, setCurrentSection }
}

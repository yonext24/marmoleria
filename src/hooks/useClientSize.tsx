import {
  INITIAL_NOT_KNOW_SIZE,
  WindowSizeContext
} from "@/contexts/window-size-context"
import { useContext } from "react"

export const MOBILE_WIDTH = 640

export function useClientSize() {
  const size = useContext(WindowSizeContext)

  const width = size?.width ?? INITIAL_NOT_KNOW_SIZE
  const height = size?.height ?? INITIAL_NOT_KNOW_SIZE

  return { width, height }
}

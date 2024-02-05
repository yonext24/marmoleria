"use client"

import { useIntersect } from "@/hooks/useIntersect"

export function Line({
  vertical,
  horizontal,
  duration = "1s",
  once = true,
  toRight = false,
  toTop = false,
  delay = "0s",
  className,
}: {
  vertical?: boolean
  horizontal?: boolean
  once?: boolean
  toRight?: boolean
  toTop?: boolean
  className?: string
  duration?: string
  delay?: string
}) {
  const { intersecting: intersected, fromRef } = useIntersect({ once })

  const verticalInitialPosition = toTop ? "0 0" : "0 100%"
  const horizontalInitialPosition = toRight ? "0 0" : "100% 0"

  const verticalFinalPosition = toTop ? "0 100%" : "0 0"
  const horizontalFinalPosition = toRight ? "100% 0" : "0 0"

  const backgroundPosition = intersected
    ? vertical
      ? verticalFinalPosition
      : horizontalInitialPosition
    : vertical
    ? verticalInitialPosition
    : horizontalFinalPosition

  const backgroundImage = vertical
    ? `linear-gradient(180deg, ${
        toTop ? "transparent 50%, #F5C800 50%" : "#F5C800 50%, transparent 50%"
      } 50%)`
    : `linear-gradient(90deg, ${
        toRight
          ? "#F5C800 50%, transparent 50%"
          : "transparent 50%, #F5C800 50%"
      })`

  const transition = `background-position ${duration} ease-in`
  const transitionDelay = delay
  const height = vertical ? "100%" : "2px"
  const width = horizontal ? "100%" : "2px"
  const backgroundSize = vertical ? "100% 200%" : "200%"

  return (
    <div
      style={{
        backgroundPosition,
        backgroundSize,
        width,
        height,
        backgroundImage,
        transition,
        transitionDelay,
      }}
      ref={fromRef}
      className={className ?? ""}
      id="line"
    />
  )
}

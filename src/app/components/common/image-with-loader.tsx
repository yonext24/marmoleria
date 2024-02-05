"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"
import { Spinner } from "./spinner"

interface ImageWithLoaderProps extends ImageProps {
  imageClassName?: string
  loaderClassName?: string
  parentClassName?: string
  withSkeleton?: boolean
}

export function ImageWithLoader({
  alt = "Product Image",
  parentClassName,
  imageClassName,
  loaderClassName,
  withSkeleton = false,
  ...props
}: ImageWithLoaderProps) {
  const [loaded, setLoaded] = useState<boolean>(false)

  const handleLoad = () => {
    setLoaded(true)
  }

  return (
    <picture
      className={`relative flex overflow-hidden ${parentClassName ?? ""}`}
    >
      <Image
        alt={alt}
        {...props}
        style={{ opacity: !loaded ? "0" : "100", ...props.style }}
        onLoad={handleLoad}
        className={`max-h-full object-contain ${imageClassName ?? ""}`}
      />
      {(() => {
        if (loaded) return null
        if (withSkeleton) {
          return (
            <div
              className={`absolute top-0 left-0 w-full h-full bg-[rgb(230,230,230)]
                [background-image:linear-gradient(90deg,_rgba(200,200,200,_0),_rgba(200,200,200,_0.5),_rgba(200,200,200,_0))]
                [background-size:200px_100%] bg-no-repeat [background-position:_left_-200px_top_0] animate-skeleton-right
                flex items-center justify-center
                ${loaderClassName ?? ""}`}
            >
              <Spinner className="h-8 w-8 m-auto" />
            </div>
          )
        }
        return (
          <div
            id="skeleton"
            className={`absolute top-0 left-0 w-full h-full flex bg-gradient-to-br from-transparent via-transparent ${
              loaderClassName ?? ""
            }`}
          >
            <Spinner className="h-8 w-8 m-auto" />
          </div>
        )
      })()}
    </picture>
  )
}

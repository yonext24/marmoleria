"use client"

import Masonry from "react-masonry-css"
import { useClientSize } from "@/hooks/useClientSize"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { ImageWithLoader } from "../common/image-with-loader"
import { Product } from "@/types/product"
import { addModal } from "react-modal-observer"
import { ProductModal } from "../modals/product-modal"

export function HomeCardMapper({
  products = [],
  category
}: {
  products: Product[]
  category: Product["category"]
}) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => product.category === category)
  }, [products, category])

  const breakpointCols = {
    default: 3,
    750: 2,
    500: 1
  }

  return (
    <Masonry
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
      breakpointCols={breakpointCols}
    >
      {filteredProducts.map((product) => (
        <HomeCard key={product.id} {...product} />
      ))}
    </Masonry>
  )
}

export function HomeCard(props: Product) {
  const { image } = props

  const [position, setPosition] = useState<number>(0)
  const reference = useRef<HTMLElement>(null)

  const { height: clientHeight } = useClientSize()

  const handleScroll = useCallback(() => {
    if (!reference.current) return

    // top es la cantidad de píxeles que le faltan al elemento para llegar a la parte superior de la pantalla
    const { top, height } = reference.current.getBoundingClientRect()
    const sHeight = clientHeight ?? 1

    const elementCenter = height / 2
    const elementCenterPosition = top + elementCenter

    const currentElementCenterPositionInViewPort =
      elementCenterPosition - sHeight

    const percentageInViewPort =
      (currentElementCenterPositionInViewPort / sHeight) * 100 + 50

    const marginOfPixelsToMove = height * 0.15 // Este es el margen de pixeles en el que se puede mover la imágen para no hacer overflow
    // sale del scale(1.1) del style del componente ImageWithLoader
    const toMove = (marginOfPixelsToMove / 100) * percentageInViewPort

    setPosition(toMove)
  }, [clientHeight, reference, setPosition])

  useEffect(() => {
    if (!window) return

    handleScroll()

    window.addEventListener("scroll", handleScroll)

    return () => {
      removeEventListener("scroll", handleScroll)
    }
  }, [reference, handleScroll])

  return (
    <article
      ref={reference}
      className="rounded-sm relative overflow-hidden"
      onClick={() => {
        addModal(ProductModal, { product: props })
      }}
      aria-label="Ver Producto"
      aria-roledescription="Button"
    >
      {image && (
        <ImageWithLoader
          alt="Imágen de producto"
          src={image.src}
          loading={"lazy"}
          width={image.width}
          height={image.height}
          style={{
            transform: `translateY(${position * -1}px) scale(1.15)`
          }}
          withSkeleton
          imageClassName="w-full h-full transition-transform duration-[5ms]"
        />
      )}

      <div className="bg-gold absolute bottom-[-150px] right-[-150px] w-[200px] h-[200px] rotate-45" />
    </article>
  )
}

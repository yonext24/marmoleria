import { Product } from "@/types/product"
import { ImageWithLoader } from "../common/image-with-loader"
import { Line } from "../common/line"

export function ProductModal({
  product,
  closeModal
}: {
  product: Product
  closeModal: () => void
}) {
  const { image } = product
  const { width, height } = image
  const duration = `${550 / (height / width)}ms` // prettier-ignore

  return (
    <div
      onClick={closeModal}
      className="relative overflow-hidden max-h-screen flex flex-col"
    >
      <Line horizontal delay="1s" duration={duration} className="ml-2" />
      <Line
        vertical
        toTop
        className="absolute right-0 top-0 !h-[calc(100%-10px)]"
      />
      <div
        id="modalContainer"
        className="m-2 h-full"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <ImageWithLoader
          alt="Imágen de producto"
          src={image.src}
          loading={"eager"}
          width={image.width}
          height={image.height}
          withSkeleton
          imageClassName="max-h-[95vh] max-w-[95vw] w-min"
        />
      </div>
      <Line
        vertical
        className="absolute left-0 top-0 !h-[calc(100%-10px)] mt-[10px]"
      />
      <Line
        toRight
        delay="1s"
        duration={duration}
        horizontal
        className="!w-[calc(100%-10px)]"
      />
    </div>
  )
}

import { Product } from "@/types/product"
import { Delimiter } from "../common/delimiter"
import { Line } from "../common/line"
import { ShadowedText } from "../common/shadowed-text"
import { HomeCardMapper } from "../home-card/home-card"
import { navEntryTypeId } from "../UI/navbar/navbar"

export function Realizados({
  products,
  category = "marmol",
  text,
  delimiterId,
  id
}: {
  text: string
  products: Product[]
  category: Product["category"]
  delimiterId: navEntryTypeId
  id: navEntryTypeId
}) {
  return (
    <section id={id} className="bg-white min-h-screen px-4 py-12">
      <Delimiter rootMargin="0px 0px -70% 0px" name={delimiterId} />
      <div className="flex flex-col w-full h-full max-w-6xl mx-auto gap-12">
        <div className="flex justify-center items-center gap-4">
          <Line horizontal className="flex-1" duration=".5s" />
          <ShadowedText text={text} />
        </div>

        <HomeCardMapper category={category} products={products} />
      </div>
    </section>
  )
}

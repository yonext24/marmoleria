import { Delimiter } from "../common/delimiter"
import { Line } from "../common/line"
import { ShadowedText } from "../common/shadowed-text"

export function WelcomeSection() {
  return (
    <section
      className="h-screen pt-12 relative flex flex-col px-4 pb-12 before:bg-[url('/bg.webp')] before:opacity-20
  before:w-full before:h-full before:absolute before:top-0 before:left-0 before:-z-10 sm:pt-0 sm:h-[calc(100vh-80px)]"
    >
      <Delimiter name="inicio" rootMargin="0px" />
      <div className="h-full flex flex-col w-full max-w-6xl relative mx-auto">
        <Line
          once
          toRight
          horizontal
          duration="1s"
          className="!w-2/3 absolute right-0 top-0 sm:hidden"
        />
        <div className="text-white font-bold text-3xl flex items-center gap-4 mt-2">
          <ShadowedText text="MARMOLERÍA LANÚS" />
          <Line horizontal className="flex-1 max-[639px]:hidden" toRight />
        </div>
        <div className="flex flex-col flex-1 justify-center pb-16 gap-4">
          <p className="text-2xl text-end">
            Somos expertos en trabajos de marmolería y muebles a medida.
          </p>
          <button className="self-end bg-gold text-white py-2 px-5">
            Contactános
          </button>
        </div>
        <Line
          once
          vertical
          toTop
          duration=".2s"
          className="!h-1/4 absolute left-0 bottom-0"
          delay={"1.5s"}
        />
        <Line horizontal className="!w-2/3" delay={"1s"} duration={".5s"} />
      </div>
    </section>
  )
}

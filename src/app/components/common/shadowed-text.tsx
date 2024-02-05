import { anton } from "@/fonts"

export function ShadowedText({
  text,
  type = "white"
}: {
  text: string
  type?: "white" | "gold"
}) {
  const goldShadow = "rgba(245, 200, 0, 0.98) -3px 2px 5px"
  const whiteShadow = "0px 0px 8px rgba(255,255,255,0.9)"

  return (
    <div className="flex w-max">
      <span
        style={{
          ...anton.style,
          ...(type === "gold"
            ? { textShadow: goldShadow, fontSize: 64 }
            : { textShadow: whiteShadow })
        }}
        className="uppercase text-[64px] [line-height:1] sm:text-7xl select-none block bg-[rgba(0,0,0,.15)] text-transparent bg-clip-text"
      >
        {text}
      </span>
    </div>
  )
}

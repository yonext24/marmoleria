export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={`
      relative w-[64px] h-[64px] bg-black/50 rotate-45 overflow-hidden m-auto 
      after:absolute after:inset-2 after:m-auto after:bg-white
      before:absolute before:inset-[-15px] before:m-auto before:bg-gold before:animate-loader
      ${className ?? ""}
      `}
    ></div>
  )
}

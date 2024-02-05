"use client"

import { useState } from "react"
import { CloseIcon, MenuIcon } from "../../icons"
import { navEntryType, navEntrys } from "./navbar"
import Link from "next/link"
import { Link as ScrollLink } from "react-scroll"
import { ShadowedText } from "../../common/shadowed-text"
import { useNavbarSection } from "@/hooks/useNavbarSection"
import { useModalLogic } from "@/hooks/useModalLogic"

export default function Header() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div
        className="fixed top-0 left-0 p-1 flex text-white"
        id="button-nav-container"
      >
        <div
          className={`w-full h-full relative before:bg-gold before:shadow-md before:rounded-full before:aspect-square before:absolute
          before:top-[-50px] before:left-[-50px] before:w-[100px] before:h-[100px]
          ${!open ? "" : "before:scale-[10]"} before:flex before:transition-all 
          before:duration-200`}
        >
          <button
            className="h-14 w-14 flex items-start justify-start relative"
            onClick={() => {
              setOpen(true)
            }}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {open && (
        <MobileNav
          closeModal={() => {
            setOpen(false)
          }}
        />
      )}
    </>
  )
}

const MobileNav = ({ closeModal }: { closeModal: () => void }) => {
  const { currentSection } = useNavbarSection()
  useModalLogic({ noScroll: true, closeModal })

  console.log(currentSection)

  return (
    <nav className="w-screen h-screen fixed top-0 left-0 bg-gold animate-appear py-24 px-4 flex flex-col justify-center">
      <button className="fixed top-6 left-6" onClick={closeModal}>
        <CloseIcon className="text-white h-8 w-8" />
      </button>

      <div className="h-0 mx-auto">
        <ShadowedText type="gold" text="MARMOLERÍA" />
      </div>
      <div
        id="custom-scroll"
        className="flex-1 px-[5%] overflow-auto my-[72px] pr-8 max-w-xs mx-auto w-full flex flex-col gap-2 justify-center"
      >
        {navEntrys.map((el) => (
          <MobileNavEntry
            key={el.href}
            {...el}
            isCurrent={el.id === currentSection}
          />
        ))}
      </div>
    </nav>
  )
}

const MobileNavEntry = ({
  href,
  text,
  isCurrent
}: navEntryType & { isCurrent: boolean }) => {
  const className = `relative transition-[margin-left] data-[selected=true]:text-white data-[selected=true]:pl-6
  data-[selected=true]:after:absolute data-[selected=true]:after:left-0 data-[selected=true]:after:top-0 data-[selected=true]:after:w-4
  data-[selected=true]:after:h-full data-[selected=true]:after:bg-white`

  if (href[0] === "#")
    return (
      <ScrollLink className={className} to={href}>
        {text}
      </ScrollLink>
    )

  return (
    <Link href={href} data-selected={isCurrent} className={className}>
      {text}
    </Link>
  )
}

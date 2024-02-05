"use client"

import { useRouter, usePathname } from "next/navigation"
import { ReactNode } from "react"
import { scroller, animateScroll } from "react-scroll"

type CustomLinkProps = {
  className?: string
  href: string
  children: ReactNode
}

const comparePaths = (href: string, pathname: string) => {
  console.log({ href, pathname })
  if (href === pathname) {
    return true
  }
  if (pathname === "/" && !href.includes("/")) {
    return true
  }
  const rawHref = href.split("#")[0]
  if (rawHref === pathname) {
    return true
  }
  return false
}

export function CustomLink({ className, href, children }: CustomLinkProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname === href) {
      animateScroll.scrollToTop()
    } else if (comparePaths(href, pathname)) {
      scroller.scrollTo(href.split("#")[1], {
        duration: 800,
        smooth: "easeInOutCubic"
      })
    } else {
      let link: string = href
      let hash: string | false = false

      if (href.includes("#")) {
        link = href.split("#")[0]
        hash = href.split("#")[1]

        if (!link.startsWith("/")) {
          link = `/${link}`
        }
      }
      console.log({ link, href, hash })

      router.push(link)
      if (hash === false) return
      scroller.scrollTo(hash, {
        duration: 800,
        smooth: "easeInOutCubic"
      })
    }
  }

  return (
    <a className={className} onClick={handleClick}>
      {children}
    </a>
  )
}

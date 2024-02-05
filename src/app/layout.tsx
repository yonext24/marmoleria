import type { Metadata } from "next"
import "./globals.css"
import { inter } from "../fonts"
import { WindowSizeProvider } from "@/contexts/window-size-context"
import { CurrentNavbarSectionProvider } from "@/contexts/current-navbar-section-context"
import { Navbar } from "./components/UI/navbar/navbar"
import { Modals } from "react-modal-observer"
import { Spinner } from "./components/common/spinner"

export const metadata: Metadata = {
  title: "Marmolería Lanús",
  description: "La mejor marmolería de zona sur."
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <WindowSizeProvider>
        <CurrentNavbarSectionProvider>
          <body
            className={
              inter.className + " bg-white text-black flex flex-col-reverse"
            }
          >
            {children}
            <Navbar />
            <Modals duration={300} Spinner={<Spinner />} />
          </body>
        </CurrentNavbarSectionProvider>
      </WindowSizeProvider>
    </html>
  )
}

"use client"

import { ShadowedText } from "@/app/components/common/shadowed-text"
import { iniciarSesion } from "@/firebase/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState<false | string>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    )

    iniciarSesion(email as string, password as string)
      .then(() => {
        router.replace("/admin")
      })
      .catch((err) => {
        if (
          [
            "auth/invalid-email",
            "auth/wrong-password",
            "auth/user-not-found"
          ].includes(err.code)
        ) {
          setError("Email o contraseña incorrectos")
        }
      })
  }

  return (
    <main className="h-[calc(100vh-80px)] flex flex-col justify-evenly">
      <div className="flex w-full justify-center">
        <ShadowedText text="INICIAR SESIÓN" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-1 flex-col my-4 justify-between px-4 pt-12 pb-4 rounded-lg border-2 border-gold max-w-sm bg.white m-auto gap-4"
      >
        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="py-2 bg-gold text-white placeholder:text-white rounded-md text-center font-bold"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="py-2 bg-gold text-white placeholder:text-white rounded-md text-center font-bold"
          />
        </div>
        <div className="flex flex-col">
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="border-2 border-gold py-2 rounded-md font-bold text-gold"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
    </main>
  )
}

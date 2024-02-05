/* eslint-disable @next/next/no-img-element */
"use client"

import useUser, { USER_POSSIBLE_STATES } from "@/hooks/useUser"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Product } from "@/types/product"
import { getAllProducts } from "@/firebase/products"
import { AddProduct } from "../components/modals/add-product"
import { addModal } from "react-modal-observer"
import { DeleteModal } from "../components/modals/delete-modal"

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product])
  }

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    getAllProducts().then(setProducts)
  }, [])

  useEffect(() => {
    if (user === USER_POSSIBLE_STATES.NOT_LOGGED) {
      router.replace("/admin/login")
    }
  }, [user, router])

  if (user === USER_POSSIBLE_STATES.NOT_KNOWN) return null

  return (
    <main className="max-w-5xl flex flex-col p-2 min-h-[calc(100vh-80px)] w-full mx-auto">
      <h1 className="text-center font-bold text-4xl">
        Pantalla de administrador
      </h1>
      <div className="grid grid-cols-[repeat(auto-fit,150px)] gap-4 w-full mt-4">
        <button
          className="aspect-square border-2 border-black"
          onClick={() => {
            addModal(AddProduct, { addProduct }, { noScroll: true })
          }}
        >
          Agregar
        </button>
        {products.map((el) => (
          <div
            key={el.id}
            className="aspect-square border-2 border-black flex items-center justify-center relative"
          >
            <img src={el.image.src} alt="Imágen de producto" />
            <button
              onClick={() => {
                addModal(DeleteModal, { id: el.id }, { noScroll: true })
              }}
              className="absolute right-0 bottom-0 bg-red-500 text-white p-2"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}

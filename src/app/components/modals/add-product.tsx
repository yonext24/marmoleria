"use client"

import { ModalProps } from "@/types/common"
import { Product } from "@/types/product"
import { useState } from "react"
import { subirImagen, subirVideo } from "@/firebase/utils"
import { addProduct as addProductToFirestore } from "@/firebase/products"

type AddProductProps = ModalProps & {
  addProduct: (product: Product) => void
}

export function AddProduct({ closeModal, addProduct }: AddProductProps) {
  const [status, setStatus] = useState<"loading" | "error" | "success" | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)
  const [file, setFile] = useState<{
    type: "image" | "video"
    file: File
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFile({ type: file.type.includes("image") ? "image" : "video", file })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return setError("Debes subir una imágen")

    setStatus("loading")

    try {
      const data = Object.fromEntries(new FormData(e.target as HTMLFormElement))
      const category = data.category as Product["category"]
      const toUpload = file?.file

      let width, height, src

      if (file.type === "image") {
        const data = await subirImagen(toUpload)
        width = data.width
        height = data.height
        src = data.src
      } else {
        const data = await subirVideo(toUpload)
        width = data.width
        height = data.height
        src = data.src
      }

      const product: Product = {
        id: "placeHolder",
        category,
        image: { src, width, height }
      }

      await addProductToFirestore(product)
      const id = Date.now()
      addProduct({ ...product, id: id.toString() })
      closeModal()
    } catch (e) {
      setStatus("error")
      const msg =
        e instanceof Error ? e.message : "Algo salió mal subiendo la imágen"
      setError(msg)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white border-2 border-gold p-4 rounded-md"
    >
      <div className="flex justify-evenly">
        <div>
          <input
            type="radio"
            name="category"
            value="marmol"
            id="medium"
            defaultChecked
          />
          <label htmlFor="medium">Mármol</label>
        </div>
        <div>
          <input type="radio" name="category" value="mueble" id="mueble" />
          <label htmlFor="regular">Mueble</label>
        </div>
      </div>
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg, video/*"
        placeholder="Imágen"
        onChange={handleFileChange}
      />
      <button
        type="submit"
        className="bg-gold/90 border-2 border-gold py-1 rounded-md text-white "
      >
        {status === "loading" ? "Cargando..." : "Agregar"}
      </button>
      {status === "error" && <p className="text-red-500">{error}</p>}
    </form>
  )
}

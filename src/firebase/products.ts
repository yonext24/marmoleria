import { getDocs, addDoc, doc, deleteDoc } from "firebase/firestore"
import { cache } from "react"
import { productsCollection } from "./collections"
import { Product } from "@/types/product"

export const getAllProducts = cache(async () => {
  return await getDocs(productsCollection).then((snap) => {
    return snap.docs.map((doc) => {
      const data = doc.data()
      return { ...data, id: doc.id }
    })
  })
})

export const addProduct = async (data: Product) => {
  try {
    const docRef = await addDoc(productsCollection, data)
    return docRef
  } catch (err) {
    throw new Error("Hubo un error al subir el tatuaje a la base de datos.")
  }
}

export const deleteTattoo = async (id: string) => {
  try {
    await deleteDoc(doc(productsCollection, id))
  } catch (err) {
    console.error(err)
  }
}

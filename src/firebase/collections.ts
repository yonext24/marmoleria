/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Product } from "@/types/product"
import {
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  collection
} from "firebase/firestore"
import { firestore } from "./app"

export const productConverter = {
  toFirestore(product: Product) {
    const { id, ...data } = product
    return { ...data }
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    const { id } = snapshot
    const data = snapshot.data(options)

    return { id, ...data } as Product
  }
}

export const productsCollection = collection(
  firestore,
  "products"
).withConverter(productConverter)

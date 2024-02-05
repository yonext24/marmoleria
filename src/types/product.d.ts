export type Product = {
  id: string
  category: "marmol" | "mueble"
  date?: string
  image: {
    src: string
    height: number
    width: number
  }
}

import { getAllProducts } from "@/firebase/products"
import { WelcomeSection } from "./components/home/welcome-section"
import { Realizados } from "./components/home/realizados"

export default async function Home() {
  const products = await getAllProducts()

  return (
    <main className="flex flex-col">
      <WelcomeSection />
      <Realizados
        id="marmol"
        text="Mármoles"
        category="marmol"
        products={products}
        delimiterId="marmol"
      />
      <Realizados
        id="mueble"
        text="Muebles"
        category="mueble"
        products={products}
        delimiterId="mueble"
      />
    </main>
  )
}

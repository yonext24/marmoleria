import { deleteTattoo } from "@/firebase/products"

export function DeleteModal({
  closeModal,
  id
}: {
  id: string
  closeModal: () => void
}) {
  return (
    <div className="flex flex-col gap-4 bg-white border-2 border-gold p-4 rounded-md">
      <h2>¿Estás seguro de que quieres eliminar este producto?</h2>
      <div className="flex justify-evenly">
        <button
          type="button"
          className="bg-red-500 text-white p-2 rounded-md"
          onClick={() => {
            deleteTattoo(id)
          }}
        >
          Sí
        </button>
        <button
          type="button"
          className="bg-green-500 text-white p-2 rounded-md"
          onClick={closeModal}
        >
          No
        </button>
      </div>
    </div>
  )
}

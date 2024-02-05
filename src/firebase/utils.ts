/* eslint-disable @typescript-eslint/no-unused-vars */
import { signInWithEmailAndPassword } from "firebase/auth"
import { deleteDoc, doc } from "firebase/firestore"
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage"
import { auth, storage } from "./app"
import Compressor from "compressorjs"
import { getImageDimensionsFromFile } from "@/utils/getImageDimensions"
import { parseDimensions } from "@/utils/parseDimensions"

async function checkIfAdmin(): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    if (auth.currentUser === null) resolve(false)
    auth.currentUser
      ?.getIdTokenResult()
      .then((idTokenResult) => {
        if (idTokenResult.claims.admin === true) resolve(true)
        else resolve(false)
      })
      .catch(reject)
  })
}

export const onAuthStateChanged = (setState: (user: true | false) => void) => {
  return auth.onAuthStateChanged((user) => {
    if (user === null) {
      setState(false)
      return
    }
    setState(true)
  })
}

export const iniciarSesion = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const cerrarSesion = async () => {
  await auth.signOut()
}

export const subirImagen = async (
  file: File
): Promise<{ src: string; width: number; height: number }> => {
  // const isAdmin = await checkIfAdmin()
  // if (!isAdmin)
  //   throw new Error("No tenés permisos, cerrá sesión y volvé a abrirla.")
  let errorSettedByOwn: boolean = false

  const fileName = String(Date.now()) + "." + file.name.split(".")[1]

  const { width: rawWidth, height: rawHeight } =
    await getImageDimensionsFromFile(file)
  const { width, height } = parseDimensions(rawWidth, rawHeight)

  const compressedImage: Blob | File = await new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.5,
      height,
      width,
      resize: "contain",

      beforeDraw(context, canvas) {
        context.fillStyle = "#FFFFFF"
        context.fillRect(0, 0, canvas.width, canvas.height)
      },

      success(result) {
        resolve(result)
      },

      error() {
        errorSettedByOwn = true
        reject("Hubo un error al comprimir la imágen, intentálo denuevo")
      }
    })
  })

  const compressedRef = ref(storage, `/products/${fileName}`)

  try {
    await uploadBytesResumable(compressedRef, compressedImage)
    const src = await getDownloadURL(compressedRef)

    return { src, width, height }
  } catch (err) {
    if (errorSettedByOwn && err instanceof Error) throw err
    if (errorSettedByOwn && typeof err === "string") throw new Error(err)
    throw new Error(
      "Algo salió mal al comprimir la imágen, por favor intentálo denuevo"
    )
  }
}

export const subirVideo = async (file: File) => {
  // const isAdmin = await checkIfAdmin()
  // if (!isAdmin)
  //   throw new Error("No tenés permisos, cerrá sesión y volvé a abrirla.")
  const errorSettedByOwn: boolean = false

  const fileName = String(Date.now()) + "." + file.name.split(".")[1]

  const { width, height, video } = await fetch("/api/compress-video", {
    method: "POST",
    body: file
  }).then((res) => res.json())

  const compressedRef = ref(storage, `/products/${fileName}`)

  try {
    await uploadBytesResumable(compressedRef, video)
    const src = await getDownloadURL(compressedRef)

    return { src, width, height }
  } catch (err) {
    if (errorSettedByOwn && err instanceof Error) throw err
    if (errorSettedByOwn && typeof err === "string") throw new Error(err)
    throw new Error(
      "Algo salió mal al comprimir la imágen, por favor intentálo denuevo"
    )
  }
}

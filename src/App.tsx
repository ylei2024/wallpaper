import { useEffect, useState } from "react"
import { fetch } from "@tauri-apps/plugin-http"

import "./styles.css"

interface Images {
  startdate: string
  fullstartdate: string
  enddate: string
  url: string
  urlbase: string
  copyright: string
  copyrightlink: string
  title: string
  quiz: string
  wp: boolean
  hsh: string
  drk: number
  top: number
  bot: number
  hs: any[]
}
function App() {
  const [select, setSelect] = useState<number>(-1)
  const [images, setImages] = useState<Images[]>([])
  useEffect(() => {
    fetch("https://www.bing.com/HPImageArchive.aspx?format=js&n=10", { method: "GET" })
      .then((response) => {
        return response.json()
      })
      .then((data: { images: Images[] }) => {
        setImages(data.images)
      })
  }, [])
  async function setImage(index: number) {
    setSelect(index)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSelect(-1)
  }
  return (
    <main className="grid grid-cols-2 gap-2 bg-current border-8">
      {images.map((image, index) => {
        return (
          <div className="relative" key={index} onClick={() => setImage(index)}>
            <img
              className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-102"
              src={`https://www.bing.com${image.url}`}
              alt={image.title}
            />
            {select == index && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        )
      })}
    </main>
  )
}

export default App

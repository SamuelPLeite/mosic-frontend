import { useEffect } from "react"
import { useLocation, useSearchParams } from "react-router-dom"

export default function ScrollTop() {
  const { pathname } = useLocation()
  const searchParams = useSearchParams()

  useEffect(() => {
    setTimeout(() => {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      })
    }, 0) // fixes flashing screen on scroll
  }, [pathname, searchParams])

  return null
}
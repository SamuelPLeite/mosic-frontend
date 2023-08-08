import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      })
    }, 0) // fixes flashing screen on scroll
  }, [pathname])

  return null
}
import React from "react"
import { Link } from "react-router-dom"

import ScrollTop from "./ScrollTop"
import linkedinLogo from "../../../images/linkedin_logo.png"
import githubLogo from "../../../images/github-wmark.png"
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <ScrollTop />
      <div className="footer-text">
        created by Samuel Leite
        <span />
      </div>
      <div className="about-page__text-links">
        <Link to="https://github.com/SamuelPLeite" target="_blank">
          <img src={githubLogo} alt="github_logo" />
        </Link>
        <Link to="https://www.linkedin.com/in/samuel-henrique-pires-leite-30b442254/" target="_blank">
          <img src={linkedinLogo} alt="linkedin_logo" />
        </Link>
      </div>
    </div>
  )
}

export default Footer
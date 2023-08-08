import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CSSTransition } from "react-transition-group"

import { RespinSymbol } from "../../music/components/Icons"
import Card from "../../shared/components/UIElements/Card"
import c3slLogo from "../../images/c3sl_logo.png"
import ufprLogo from "../../images/ufpr_logo.png"
import fsopenLogo from "../../images/fsopen_logo.png"
import tsLogo from "../../images/typescript_logo.png"
import jsLogo from "../../images/javascript_logo.png"
import reactLogo from "../../images/react_logo.png"
import nodejsLogo from "../../images/nodejs_2logo.png"
import expressLogo from "../../images/expressjs_logo.png"
import postgreLogo from "../../images/postgresql_logo.png"
import gitLogo from "../../images/git_logo.png"
import bashLogo from "../../images/bash_logo.jpg"
import cssLogo from "../../images/css_logo.jpg"
import htmlLogo from "../../images/html5_logo.png"
import mongodbLogo from "../../images/mongodb_logo.png"
import linkedinLogo from "../../images/linkedin_logo.png"
import githubLogo from "../../images/github-mark.png"

import './AboutDev.css'

const AboutDev = () => {
  const [isDisplay, setIsDisplay] = useState(false)
  const nodeRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    setIsDisplay(true)
  }, [])

  const handleBack = () => {
    setIsDisplay(false)
    setTimeout(() => {
      navigate("/users")
    }, 500)
  }

  return (
    <CSSTransition in={isDisplay}
      nodeRef={nodeRef}
      timeout={550}
      mountOnEnter
      unmountOnExit
      classNames="slide-up">
      <div ref={nodeRef}
        className="about-page">
        <div className="about-page__header">
          <div className="page-title">
            <span className="page-title__text">
              <span>
                About the{" "}
              </span>
              <span className="about-page__highlight">
                Developer
              </span>
            </span>
          </div>
        </div>
        <Card className="about-page__content">
          <div className="about-page__text">
            <span className="about-page__p-title about-page__highlight">
              Introducing Myself<br />
            </span>
            <span>
              Greetings! I'm Samuel Leite—an aspiring software developer with an unyielding passion for crafting exceptional web solutions. Armed with a wide array of technologies including JavaScript, React, Node.js, Express, and MongoDB, I'm committed to transforming creative concepts into functional realities. Join me on a journey where code meets creativity, and together, let's embark on the exciting path of shaping the future of web development.            </span>
          </div>
          <div className="about-page__text">
            <span className="about-page__p-title about-page__highlight">
              Past experience<br />
            </span>
            <div className="about-page__p-content">
              <div className="about-page__p-image">
                <img src={c3slLogo} alt="c3sl logo" />
              </div>
              <div className="about-page__p-sub">
                <div className="about-page__p-top">
                  C3SL - Center for Scientific Computing and Free Software<br />
                  Curitiba - Brazil<br />
                  2021-2022<br />
                  <span>Software Engineer Intern</span>
                </div>
                <span>
                  During my year-long internship at C3SL, I proudly worked as a Web Developer Intern. In this role, I contributed significantly to enhancing and maintaining a Form Creator application. This experience allowed me to actively engage with the team, gain proficiency in technologies like React and JavaScript, and learn <b>Agile</b> methodologies. These insights enriched my skill set and deepened my appreciation for <b>collaborative development</b> practices. This environment taught me seamless teamwork, embraced continuous integration, and focused on delivering results in line with the organization's goals.
                </span>
              </div>
            </div>
            <div className="about-page__p-content">
              <div className="about-page__p-sub">
                <div className="about-page__p-top">
                  <span>Techologies I worked with:</span>
                </div>
                <ul className="about-page__p-list">
                  <li>
                    <img src={tsLogo} alt="typescript_logo" />
                    <img src={jsLogo} alt="javascript_logo" />
                    TypeScript and JavaScript
                  </li>
                  <li>
                    <img src={reactLogo} alt="react_logo" />
                    React
                  </li>
                  <li>
                    <img src={nodejsLogo} alt="nodejs_logo" />
                    Node.js
                  </li>
                  <li>
                    <img src={expressLogo} alt="express_logo" />
                    Express
                  </li>
                  <li>
                    <img src={postgreLogo} alt="postgre_logo" />
                    PostgreSQL
                  </li>
                  <li>
                    <img src={gitLogo} alt="git_logo" />
                    <img src={bashLogo} alt="bash_logo" />
                    Git and Bash
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="about-page__text">
            <span className="about-page__p-title about-page__highlight">
              Education<br />
            </span>
            <div className="about-page__p-content">
              <div className="about-page__p-image">
                <img src={ufprLogo} alt="ufpr_logo" />
              </div>
              <div className="about-page__p-sub">
                <div className="about-page__p-top">
                  UFPR - Federal University of Paraná<br />
                  Curitiba - Brazil<br />
                  2019-2022 {"(incomplete)"}<br />
                  <span>Bachelor's in Computer Science</span>
                </div>
                <span>
                  I embarked on my academic journey at UFPR, one of Brazil's esteemed universities, in 2018, initially pursuing studies in Chemical Engineering. In 2019, my path transitioned to Computer Science, a decision that broadened my horizons across diverse disciplines. From foundational programming to advanced <b>algorithms</b>, hardware exploration, and <b>databases</b>, my coursework honed a multifaceted skill set. The richness of my UFPR education materialized into tangible opportunities, including my role at C3SL.<br />
                </span>
              </div>
            </div>
            <div id="ufpr-2nd" className="about-page__p-content">
              In 2022, personal circumstances led me away from Curitiba, prompting a shift to Estácio de Sá University in my hometown. Currently on track to complete my Bachelor's in Computer Science by 2024, I'm propelled by a profound sense of gratitude for the wisdom and growth these institutions have imparted upon me.
            </div>
            <div className="about-page__p-top">
              <span>Other courses:</span>
            </div>
            <div id="fsopen-p" className="about-page__p-content">
              <div className="about-page__p-image">
                <img src={fsopenLogo} alt="fullstackopen_logo" />
              </div>
              <div className="about-page__p-sub">
                <span>
                  I've pursued a range of courses, delving into individual topics like MERN and Python. Yet, among these, the course that has most significantly shaped my skill set outside of university is <b>Full Stack open</b>. Through it, I re-approached familiar web development topics from fresh perspectives while delving deeper into uncharted territories. The course enabled me to explore areas that I haven’t extensively covered in this project, such as <b>tests</b> utilizing Jest and Cypress, as well as <b>Redux</b> and React Query. Completing the core part of Full Stack open, I am currently immersed in the extensions phase, with a keen focus on <b>Containers</b> and <b>CI/CD</b>. My journey and the code tied to this course can be found on my GitHub repository.                </span>
              </div>
            </div>
          </div>
          <div className="about-page__text">
            <span className="about-page__p-title about-page__highlight">
              My current project<br />
            </span>
            <div className="about-page__p-content">
              <div className="about-page__logo">
                <div className="mosic_logo">
                  <RespinSymbol />
                  <span>
                    Mosic
                  </span>
                </div>
              </div>
              <span>
                Mosic was conceived as a platform to apply and showcase the latest concepts I've learned since my previous practical experience, while also keeping my earlier skillset polished. Its beginnings were humble, yet as I invested effort into its development, fresh ideas emerged, causing it to organically expand. Although it's a work in progress, I've ensured that its core features are thoughtfully implemented. Every step of the journey, from its inception, is versioned and accessible on my GitHub repository, where I delve into the technical challenges and implementation details in greater depth.
              </span>
            </div>
            <div className="about-page__p-content">
              <div className="about-page__p-sub">
                <div className="about-page__p-top">
                  <span>Techologies I got a lot better at:</span>
                </div>
                <ul className="about-page__p-list">
                  <li>
                    <img src={htmlLogo} alt="nodejs_logo" />
                    HTML
                  </li>
                  <li>
                    <img src={cssLogo} alt="nodejs_logo" />
                    CSS
                  </li>
                  <li>
                    <img src={jsLogo} alt="javascript_logo" />
                    JavaScript
                  </li>
                  <li>
                    <img src={reactLogo} alt="react_logo" />
                    React
                  </li>
                  <li>
                    <img src={expressLogo} alt="express_logo" />
                    Express
                  </li>
                  <li>
                    <img src={mongodbLogo} alt="postgre_logo" />
                    MongoDB and mongoose
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="about-page__text">
            <span className="about-page__p-title about-page__highlight">
              Let's Connect<br />
            </span>
            <span>
              Thank you for joining me on this journey through my experiences and projects. I'm always open to conversations, collaborations, and feedback. Feel free to connect through the provided contact information. Let's explore new horizons together.
            </span>
            <div className="about-page__text-links">
              <Link to="https://github.com/SamuelPLeite" target="_blank">
                <img src={githubLogo} alt="github_logo" />
              </Link>
              <Link to="https://www.linkedin.com/in/samuel-henrique-pires-leite-30b442254/" target="_blank">
                <img src={linkedinLogo} alt="linkedin_logo" />
              </Link>
            </div>
          </div>
        </Card>
        <div className="about-page__footer">
          <div className="about-page__back"
            onClick={handleBack}>
            <span className="about-page__highlight">
              Back to Mosic
            </span>
          </div>
          <div className="about-page__footer-logo">
            <RespinSymbol />
            <span className="about-page__highlight">
              Mosic
            </span>
          </div>
        </div>
      </div>
    </ CSSTransition >
  )

}

export default AboutDev
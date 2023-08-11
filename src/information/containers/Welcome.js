import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from 'react-transition-group'
import { useNavigate } from "react-router-dom";

import { RespinIcon, LikeIcon, CommentIcon, InfoIcon, RespinSymbol } from "../../music/components/Icons";
import Card from "../../shared/components/UIElements/Card";
import HoverPopup from "../../shared/components/UIElements/HoverPopup";
import './Welcome.css'

const Welcome = () => {
  const [stage, setStage] = useState(0)
  const [isExit, setIsExit] = useState(false)
  const navigate = useNavigate()

  const nodeRef = useRef(null)
  const node2Ref = useRef(null)

  const handleStageChange = () => {
    setStage(current => current === 0 ? 1 : 0)
  }

  const handleEnterSite = () => {
    setIsExit(true)
    setTimeout(() => {
      navigate('/users');
    }, 500);
  }

  return (<CSSTransition nodeRef={nodeRef} in={!isExit} timeout={550} mountOnEnter unmountOnExit classNames="slide-up">
    <div ref={nodeRef} className="welcome-page">
      <CSSTransition nodeRef={node2Ref} in={stage === 1} timeout={250} mountOnEnter unmountOnExit classNames="modal">
        <Card ref={node2Ref} className="welcome-page__content">
          <div id="p1" className="welcome-page__text">
            <span className="welcome-page-p1__highlight">
              So, what is Mosic?<br />
            </span>
            <span>
              This is a
              <HoverPopup tooltip="MERN: MongoDB, Express, React, Node.js - A modern web development stack.">MERN</HoverPopup>
              full-stack project, born from my passion for music and web development. As a dedicated full-stack web developer with a year of hands-on experience, I've channeled my energy into the creation of Mosic. More than just a project, Mosic is a convergence of my aspirations, a testament to my drive to convert concepts into reality through code. A social-media platform centered around sharing your feelings about music, in the moment.<br />
            </span>
          </div>
          <div id="p2" className="welcome-page__text">
            <span className="welcome-page-p1__highlight">
              Mosic as a socia-media platform<br />
            </span>
            <span>
              If I were to pitch Mosic as a standalone social-media platform, it'd be something like this:
              <div className="welcome-page-p2__pitch">
                "Mosic reimagines music interaction as a dynamic conversation. It's where songs become chapters, and your emotions become the ink. Rate a track not just once, but as many times as your mood shifts or your perspective evolves. Your posts capture moments in musical time, and the platform's 'Respins' invite others to relive those beats. Dive into discussions with fellow music aficionados, bond over melodies that resonate, and discover new tunes as if flipping through a diary of shared experiences. Mosic isn't just about music; it's a symphonic journey of feelings and connections."
              </div>
            </span>
            <div className="welcome-page-p2">
              <div className="welcome-page-p2__icons">
                <RespinIcon id="p2-respin" />
                <LikeIcon id="p2-like" />
                <CommentIcon id="p2-comment" />
                <InfoIcon id="p2-info" />
              </div>
              <span>
                Aligned with this vision, I've implemented a range of features that drive the essence of Mosic. The cornerstones, Users and Posts, form its foundation. Users can effortlessly sign up, granting them access to profile pages, putting their posts and posts they liked on display. Posts are the canvas for musical expressions – a name and artist trigger the retrieval of corresponding music via DeezerAPI. The familiar
                <HoverPopup tooltip={<LikeIcon />}>Like</HoverPopup> and
                <HoverPopup tooltip={<CommentIcon />}>Comment</HoverPopup> functions are fully present, while
                <HoverPopup tooltip={<RespinIcon />}>Respin</HoverPopup> serves as a counterpart to traditional sharing. User profiles weave connections through authored content and respins, while the
                <HoverPopup tooltip={<InfoIcon />}>Info</HoverPopup> feature provides an extra layer of insight into featured music.
              </span>
            </div>
            <div>
              <div>
                The 'Info' feature serves a dual purpose: besides providing extra insights, it powers the
                <HoverPopup tooltip="Discover new posts about the same track or artist clicking one of the fields inside the Info popup.">'Discover' pages</HoverPopup>: when users click on a track's title or artist's name, they're seamlessly directed to the corresponding 'Discover' page, unveiling related posts.The DeezerAPI, beyond sourcing data for music posts, plays a central role in our
                <HoverPopup tooltip="Listen to the preview of a track by hovering and clicking the artwork.">built-in music players</HoverPopup> embedded within each cover – offering a 30-second preview of tracks. This short overview encapsulates the current scope of Mosic's implemented features, offering a snapshot of its capabilities.
              </div>
            </div>
          </div>
          <div id="p3" className="welcome-page__text">
            <span className="welcome-page-p1__highlight">
              Concluding...<br />
            </span>
            <span>
              As I crafted Mosic, I discovered a realm where my love for music and web development converged. This endeavor sharpened my technical prowess, offering me more hands-on insight into full-stack development. Through challenges, I embraced growth, expanding my skills and refining my approach to problem-solving. Thank you for taking the time to explore Mosic—an embodiment of my commitment and learning. I'm excited about the potential to channel this journey into contributing meaningfully to your team.
            </span>
          </div>
        </Card>
      </CSSTransition>
      <div id="page-title"
        className={`welcome-page-title ${stage === 1 && 'welcome-page-title2'}`}>
        <div className="welcome-page-title__image">
          <RespinSymbol />
        </div>
        <span className="welcome-page-title__text">
          {stage === 0 && <span>Welcome to </span>}
          <span className={`welcome-page-title__highlight ${stage === 1 ? "stage1" : ''}`}>
            Mosic
          </span>
        </span>
      </div>
      <div className={`welcome-page__btn ${stage === 1 && 'welcome-page__btn2'}`}
        onClick={handleStageChange}>
        <span className="welcome-page__btn-highlight">
          {stage === 0 ? 'intro' : 'back'}
        </span>
      </div>
      {
        stage === 1 && <div className={`welcome-page__enter`}
          onClick={handleEnterSite}>
          <span className="welcome-page__enter-highlight">
            Enter Mosic
          </span>
        </div>
      }
    </div >
  </CSSTransition >)
}

export default Welcome
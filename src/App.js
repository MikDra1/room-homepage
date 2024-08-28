import logo from "./images/logo.svg";
import desktopImageHero1 from "./images/desktop-image-hero-1.jpg";
import desktopImageHero2 from "./images/desktop-image-hero-2.jpg";
import desktopImageHero3 from "./images/desktop-image-hero-3.jpg";
import mobileImageHero1 from "./images/mobile-image-hero-1.jpg";
import mobileImageHero2 from "./images/mobile-image-hero-2.jpg";
import mobileImageHero3 from "./images/mobile-image-hero-3.jpg";
import imageAboutDark from './images/image-about-dark.jpg'
import imageAboutLight from './images/image-about-light.jpg'
import arrowNext from "./images/icon-angle-right.svg";
import arrowPrev from "./images/icon-angle-left.svg";
import { useEffect, useRef, useState } from "react";

const slidesMobile = {
  1: {
    content:
      "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
    image: mobileImageHero1,
    title: 'Discover innovative ways to decorate'
  },
  2: {
    content:
      "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
    image: mobileImageHero2,
    title: 'We are available all across the globe'
  },
  3: {
    content:
      "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office. ",
    image: mobileImageHero3,
    title: 'Manufactured with the best materials'
  },
};

const slidesDesktop = {
  1: {
    content:
      "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
    image: desktopImageHero1,
    title: 'Discover innovative ways to decorate',
  },
  2: {
    content:
      "We are available all across the globe With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
    image: desktopImageHero2,
    title: 'We are available all across the globe',
  },
  3: {
    content:
      "Manufactured with the best materials Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office. ",
    image: desktopImageHero3,
    title: 'Manufactured with the best materials',
  },
}

export default function App() {
  const [isMobile, setIsMobile] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(1)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const sectionChange = useRef(null)
  const changingImage = useRef(null)

  useEffect(function() {
    setIsMobile(window.innerWidth < 600)
  }, [])

  function handleChange(action) {
    sectionChange.current.classList[action]('transform')
    changingImage.current.classList[action]('transform')
  }

  useEffect(function() {
    handleChange('add')
  }, [])

  function handlePrevSlide() {
    handleChange('remove')
    setTimeout(() => {
      setCurrentSlide(v => v - 1 === 0 ? 3 : v - 1)
      handleChange('add')
    } , 500)
  }

  function handleNextSlide() {
    handleChange('remove')
    setTimeout(() => {
      setCurrentSlide(v => v + 1 === 4 ? 1 : v + 1)
      handleChange('add')
    } , 500)
  }

  function handleMobileNavOpen() {
    setIsMobileNavOpen(!isMobileNavOpen)
  }

  return (
    <div className="container">
      <Burger onMobileNavOpen={handleMobileNavOpen} isMobileNavOpen={isMobileNavOpen} />
      <Header isMobileNavOpen={isMobileNavOpen} />
      <main>
        <div className="main__content">
      <ChangingImage isMobile={isMobile} currentSlide={currentSlide} onPrevSlide={handlePrevSlide} onNextSlide={handleNextSlide} changingImage={changingImage} />

        <section className="section__change" ref={sectionChange}>
          <div className={`page__content `}>
          <h1>{isMobile ? slidesMobile[currentSlide].title : slidesDesktop[currentSlide].title}</h1>
          <p>{isMobile ? slidesMobile[currentSlide].content : slidesDesktop[currentSlide].content}</p>
          <button className="btn--shop">shop now &rarr;</button>
          </div>
        </section>
        </div>
        <section className="section__constant">
          <img src={imageAboutDark} alt="" />
          <div className="page__content section__constant--content">
          <h2>About our furniture </h2>
          <p>Our multifunctional collection blends design and function to suit your individual taste. Make each room unique, or pick a cohesive theme that best express your interests and what inspires you. Find the furniture pieces you need, from traditional to contemporary styles or anything in between. Product specialists are available to help you create your dream space.</p>
          </div>
          <img src={imageAboutLight} alt="" />
        </section>
      </main>
      <div className={`overlay ${isMobileNavOpen ? 'opacity' : ''}`}></div>
    </div>
  );
}

function ChangingImage({isMobile, currentSlide, onPrevSlide, onNextSlide, changingImage}) {
  return <div className="left__main--side"><img className="main__img" src={isMobile ? slidesMobile[currentSlide].image : slidesDesktop[currentSlide].image} alt="" ref={changingImage} />
  <div className="buttons">
    <button aria-label="Previous slide" onClick={onPrevSlide}>
      <img src={arrowPrev} alt="" />
    </button>
    <button aria-label="Next slide" onClick={onNextSlide}>
      <img src={arrowNext} alt="" />
    </button>
  </div></div>
}

function Header({isMobileNavOpen}) {
  return (
      <header className={`header ${isMobileNavOpen ? 'custom__header transformY' : ''}`}>
        
        <NavigationMobile isMobileNavOpen={isMobileNavOpen} />
        <img src={logo} alt=""className="logo" />
        <NavigationDesktop />
      </header>
    
  );
}

function NavigationMobile({isMobileNavOpen}) {
  return (
    <nav className={`nav--mobile ${isMobileNavOpen ? 'display' : ''}`}>
      <ul className="nav__ul--mobile">
        <li className="nav__li--mobile">Home</li>
        <li className="nav__li--mobile">Shop</li>
        <li className="nav__li--mobile">About</li>
        <li className="nav__li--mobile">Contact</li>
      </ul>
    </nav>
  );
}

function NavigationDesktop() {
  return (
    <nav className="nav--desktop">
      <ul className="nav__ul--desktop">
        <li tabIndex="0" className="nav__li--desktop">Home</li>
        <li tabIndex="0" className="nav__li--desktop">Shop</li>
        <li tabIndex="0" className="nav__li--desktop">About</li>
        <li tabIndex="0" className="nav__li--desktop">Contact</li>
      </ul>
    </nav>
  );
}

function Burger({onMobileNavOpen, isMobileNavOpen}) {
  return <div className="burger" onClick={onMobileNavOpen}>
          <span className={`burger__line--first ${isMobileNavOpen ? 'rotate custom__burger__line' : ''}`}></span>
          <span className={`burger__line--second ${isMobileNavOpen ? 'display--none' : ''}`}></span>
          <span className={`burger__line--third ${isMobileNavOpen ? 'rotate--negative custom__burger__line' : ''}`}></span>
        </div>
}
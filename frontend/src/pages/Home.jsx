import React from 'react'
import Hero from '../components/Hero/Hero'
import FeatureSection from '../components/Feauture/FeatureSection'
import FeatureProducts from '../components/Feauture/FeatureProduct'
import OfferBanner from '../components/offer/OfferBanner'
import Testimonials from '../components/reviews/Testimonials'
import FAQSection from '../components/Feauture/FAQ'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
      <Hero/>
      {/* 🔥 New Modern Parallax Effect */}
      <FeatureSection/>
      <FeatureProducts/>
      <OfferBanner/>
      <Testimonials/>
      {/* <FAQSection/> */}
      <Footer/>
      
    </div>
  )
}

export default Home 

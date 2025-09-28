import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import HowItWorks from '../components/Work'
import FAQ from '../components/Faq'
import { useScrollToTop } from '../components/UseScrollToTop'


export default function HomePage() {
  useScrollToTop();
  return (
    <div>
        <Hero/>
        <About/>
        <HowItWorks/>
        <FAQ/>
    </div>
  )
}

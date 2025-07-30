import React from 'react'
import CashierLayout from '../layout/CashierLayout'
import CircularGallery from '../components/CircularGallery'



const About = () => {
  return (
    <CashierLayout>
      <div>
        <p className='text-5xl font-bold mb-6 flex justify-center'>Our Teams</p>
      </div>
      <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery bend={3} textColor="#000000" borderRadius={0.05} scrollEase={0.02} />
      </div>
    </CashierLayout>
  )
}

export default About
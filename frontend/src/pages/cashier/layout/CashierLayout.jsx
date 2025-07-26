import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const CashierLayout = ({ children }) => {

    return (
        <div className='min-h-screen bg-[#f9f0e7]'>
            <Navbar />
            <div className="max-w-5xl mx-auto mt-12 px-6">
                {children}
            </div>
            <footer>
                <br />
            </footer>
        </div>
    )
}

export default CashierLayout
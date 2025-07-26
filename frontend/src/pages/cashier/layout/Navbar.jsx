import React from 'react'
import { Link, NavLink, useLocation } from 'react-router'

const Navbar = () => {
    const location = useLocation()
    const navItems = [
        { label: "HOME", path: '/cashier/dashboard' },
        { label: "HISTORY", path: '/cashier/history' },
        { label: "PRODUCTS", path: '/cashier/products' },
        { label: "ABOUT", path: '/cashier/about' },
    ]
    return (
        <nav className='flex justify-center gap-10 py-6 text-2xl font-bold tracking-wide'>
            {navItems.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                    <NavLink
                        key={idx}
                        to={item.path}
                        className={`px-6 py-2 rounded-full transition-all ${isActive ? "bg-black text-white" : "text-black"
                            }`}
                    >
                        {item.label}
                    </NavLink>
                )
            })}
        </nav>
    )
}

export default Navbar
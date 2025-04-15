import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

const NavbarComp = () => {
    const location = useLocation();

    const navItems = [
        { label: "TENTANG", path: "/about" },
        { label: "RIWAYAT", path: "/history" },
        { label: "PRODUK", path: "/products" },
        { label: "HOME", path: "/" },
    ];

    return (
        <div className="bg-[#f9f0e7] min-h-screen">
            <nav className="flex justify-center gap-10 py-6 text-2xl font-bold tracking-wide">
                {navItems.map((item, idx) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={idx}
                            to={item.path}
                            className={`px-6 py-2 rounded-full transition-all ${isActive ? "bg-black text-white" : "text-black"
                                }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="max-w-5xl mx-auto mt-12 px-6">
                <Outlet />
            </div>
        </div>
    );
};

export default NavbarComp;

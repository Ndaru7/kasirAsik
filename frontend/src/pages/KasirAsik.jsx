import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

const KasirAsik = () => {
    const location = useLocation();

    const menuItems = [
        { label: "ADMIN", path: "/admin" },
        { label: "KASIR", path: "/kasir" },
    ];

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="flex flex-col items-center justify-center py-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-12">Kasir Asik</h1>

                <nav className="flex flex-col gap-6 w-full max-w-md">
                    {menuItems.map((item, idx) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={idx}
                                to={item.path}
                                className={`w-full py-4 px-6 text-center rounded-lg shadow-md text-lg font-semibold transition-all duration-300 border border-gray-300
                                    ${isActive
                                        ? "bg-black text-white"
                                        : "bg-white text-black hover:bg-black hover:text-white"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default KasirAsik;
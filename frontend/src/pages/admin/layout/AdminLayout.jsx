import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

            <div className="flex-1 flex flex-col">
                <Navbar onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
                <div className="p-6 bg-gray-100 flex-1 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;

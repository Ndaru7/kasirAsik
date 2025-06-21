import { createBrowserRouter } from "react-router-dom";
import NavbarComp from "./components/NavbarComp"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import HistoryPage from "./pages/HistoryPage"
import AboutPage from "./pages/AboutPage"
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/ProductList";
import CategoryList from "./pages/admin/CategoryList";
import HomeAdmin from "./pages/admin/HomeAdmin";
import EditProduct from "./pages/admin/product/EditProduct";
import KasirAsik from "./pages/KasirAsik";
import DashboardLayout from "./pages/admin/Dashboard";




const router = createBrowserRouter([
    {
        path: '/',
        element: <KasirAsik />,
    },
    {
        path: '/admin',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <ProductList />
            },
            {
                path: '/admin/products',
                element: <ProductList />
            },
            {
                path: '/admin/products/:id',
                element: <EditProduct />
            },
            {
                path: '/admin/category',
                element: <CategoryList />
            },
        ]
    },
    {
        path: '/kasir',
        element: <NavbarComp />,
        children: [
            {
                path: '/kasir/home',
                element: <HomePage />
            },
            {
                path: '/kasir/products',
                element: <ProductPage />
            },
            {
                path: '/kasir/history',
                element: <HistoryPage />
            },
            {
                path: '/kasir/about',
                element: <AboutPage />
            },
        ]
    },
],
)


export default router;
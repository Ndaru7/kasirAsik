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




const router = createBrowserRouter([{
    path: '',
    element: <Dashboard/>,
    children: [
        {
            path: '/',
            element: <HomeAdmin/>
        },
        {
            path: '/products',
            element: <ProductList/>
        },
        {
            path: '/category',
            element: <CategoryList/>
        },
        {
            path: '/about',
            element: <AboutPage/>
        }
    ],
}])


export default router;
import { createBrowserRouter } from "react-router-dom";
import NavbarComp from "./components/NavbarComp"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import HistoryPage from "./pages/HistoryPage"
import AboutPage from "./pages/AboutPage"
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/ProductList";




const router = createBrowserRouter([{
    path: '',
    element: <Dashboard/>,
    children: [
        {
            path: '/',
            element: <HomePage/>
        },
        {
            path: '/products',
            element: <ProductList/>
        },
        {
            path: '/history',
            element: <HistoryPage/>
        },
        {
            path: '/about',
            element: <AboutPage/>
        }
    ],
}])


export default router;
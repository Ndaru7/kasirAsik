import { createBrowserRouter } from "react-router-dom";
import NavbarComp from "./components/NavbarComp"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import HistoryPage from "./pages/HistoryPage"
import AboutPage from "./pages/AboutPage"




const router = createBrowserRouter([{
    path: '',
    element: <NavbarComp/>,
    children: [
        {
            path: '/',
            element: <HomePage/>
        },
        {
            path: '/products',
            element: <ProductPage/>
        },
        {
            path: '/history',
            element: <HistoryPage/>
        },
        {
            path: '/about',
            element: <AboutPage/>
        }
    ]
}])


export default router;
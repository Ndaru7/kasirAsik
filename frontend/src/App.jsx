import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'
import Login from "./pages/Login";
import CashierDashboard from "./pages/cashier/CashierDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Products from "./pages/admin/product/Products";
import Category from "./pages/admin/category/Category";
import Users from "./pages/admin/users/Users";
import { useAuth } from './context/AuthContext';
import EditProduct from './pages/admin/product/EditProduct';
import EditUser from './pages/admin/users/EditUser';
import History from './pages/cashier/history/History';
import ProductsList from './pages/cashier/products/ProductsList';
import About from './pages/cashier/about/About';
import HistoryDetail from './pages/cashier/history/HistoryDetail';
import HistoryReport from './pages/admin/history transaction/HistoryReport';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';



function App() {
  const { user, loading } = useAuth();

  const AdminRoute = ({ children }) => {
    if (loading) return <div className="p-6">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'admin') return <Navigate to="/login" />;
    return children;
  };
  const CashierRoute = ({ children }) => {
    if (loading) return <div className="p-6">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'kasir') return <Navigate to="/login" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* ROUTE ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <Products />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <Category />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users/:uuid"
          element={
            <AdminRoute>
              <EditUser />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/history-transaction"
          element={
            <AdminRoute>
              <HistoryReport />
            </AdminRoute>
          }
        />
        {/* CASHIER ROUTE */}
        <Route
          path="/cashier/dashboard"
          element={
            <CashierRoute>
              <CashierDashboard />
            </CashierRoute>
          }
        />
        <Route
          path="/cashier/history"
          element={
            <CashierRoute>
              <History />
            </CashierRoute>
          }
        />
        <Route
          path="/cashier/products"
          element={
            <CashierRoute>
              <ProductsList />
            </CashierRoute>
          }
        />
        <Route
          path="/cashier/about"
          element={
            <CashierRoute>
              <About />
            </CashierRoute>
          }
        />
        <Route
          path="/cashier/history-detail/:transaction_id"
          element={
            <CashierRoute>
              <HistoryDetail />
            </CashierRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App

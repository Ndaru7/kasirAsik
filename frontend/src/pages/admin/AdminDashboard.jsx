import AdminLayout from "./layout/AdminLayout";
import SplitText from "./animation/SplitText";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import myApi from "../api/Api";
import { useEffect, useState } from "react";
import StatsCard from "./components/charts/StatsCard";
import MonthlyTarget from "./components/charts/MonthlyTarget";
import MonthlySalesChart from "./components/charts/MonthlySalesChart";
import TopProductsTable from "./components/table/TopProductsTable";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [products, setProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthlyTarget, setMonthlyTarget] = useState(5000000);
  const [monthlyOrdersData, setMonthlyOrdersData] = useState([]);

  // Token User
  const token = localStorage.getItem('token');

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  useEffect(() => {
    getTransaction();
    getProducts();
    getSummaryTransaction();
  }, []);

  const getTransaction = async () => {
    const response = await axios.get(myApi + `kasir/transaction/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    setData(response.data.data);
  };

  const getProducts = async () => {
    const response = await axios.get(myApi + `kasir/products/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    setProducts(response.data);
  };

  const getSummaryTransaction = async () => {
    const response = await axios.get(myApi + `/transactions-summary`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });

    setTotalOrders(response.data.totalData);

    // Hitung total pendapatan
    const total = response.data.data.reduce((acc, trx) => acc + trx.total_price, 0);
    setTotalRevenue(total);

    // Buat 12 bulan terakhir
    const monthMap = {};
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = date.toLocaleString("id-ID", { month: "short", year: "numeric" });
      monthMap[label] = 0;
    }

    // Isi data transaksi ke dalam map
    response.data.data.forEach((trx) => {
      const trxDate = new Date(trx.createdAt);
      const label = trxDate.toLocaleString("id-ID", { month: "short", year: "numeric" });

      if (monthMap[label] !== undefined) {
        monthMap[label] += 1;
      }
    });

    const formatted = Object.entries(monthMap).map(([month, orders]) => ({
      month,
      orders,
    }));

    setMonthlyOrdersData(formatted);
  };


  return (
    <AdminLayout>
      <div className="p-0 m-0">
        <SplitText
          text={`Hello, ${user?.username}`}
          className="text-2xl font-bold"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <p className="text-sm">Welcome to the admin dashboard.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 p-0 m-0 bg-white items-start">
          <StatsCard title="Products" value={products.count} percent="+11.01%" isPositive />
          <StatsCard title="Orders" value={totalOrders} percent="-9.05%" isPositive={false} />
          Target Perbulan

          <div className="lg:col-span-2">
            Chart Bulanan
          </div>

          <div className="w-full">
            Top produk
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

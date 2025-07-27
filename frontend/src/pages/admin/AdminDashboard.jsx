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
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orderGrowth, setOrderGrowth] = useState(0);
  const [revenueGrowth, setRevenueGrowth] = useState(0);
  const [monthlyTarget, setMonthlyTarget] = useState(5000000);
  const [monthlyOrdersData, setMonthlyOrdersData] = useState([]);
  const token = localStorage.getItem("token");

  const handleAnimationComplete = () => {
    console.log("Animated!");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [trxRes, prodRes] = await Promise.all([
        axios.get(myApi + "kasir/transaction/", {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.get(myApi + "kasir/products/", {
          headers: { Authorization: `Token ${token}` },
        }),
      ]);

      const trxData = trxRes.data;
      const prodData = prodRes.data;

      setTransactions(
        trxData.flatMap(trx => trx.items.map(item => ({ ...item, createdAt: trx.date })))
      );
      setProducts(prodData);

      const thisMonth = new Date().getMonth();
      const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;

      let currRevenue = 0, lastRevenue = 0;
      let currOrders = 0, lastOrders = 0;

      const monthMap = {};
      const now = new Date();
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const label = date.toLocaleString("id-ID", { month: "short", year: "numeric" });
        monthMap[label] = 0;
      }

      trxData.forEach(trx => {
        const trxDate = new Date(trx.date);
        const month = trxDate.getMonth();
        const label = trxDate.toLocaleString("id-ID", { month: "short", year: "numeric" });

        if (monthMap[label] !== undefined) monthMap[label]++;

        const isThisMonth = month === thisMonth;
        const isLastMonth = month === lastMonth;

        if (isThisMonth) {
          currRevenue += trx.total;
          currOrders++;
        } else if (isLastMonth) {
          lastRevenue += trx.total;
          lastOrders++;
        }
      });

      setTotalOrders(currOrders);
      setTotalRevenue(currRevenue);

      // Hitung growth
      const orderGrowthPercent = lastOrders > 0 ? ((currOrders - lastOrders) / lastOrders) * 100 : 100;
      const revenueGrowthPercent = lastRevenue > 0 ? ((currRevenue - lastRevenue) / lastRevenue) * 100 : 100;

      setOrderGrowth(orderGrowthPercent);
      setRevenueGrowth(revenueGrowthPercent);

      // Format monthly chart data
      const monthlyData = Object.entries(monthMap).map(([month, orders]) => ({
        month,
        orders,
      }));
      setMonthlyOrdersData(monthlyData);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-4 items-start">
          <StatsCard title="Products" value={products.count} percent="+0%" isPositive />
          <StatsCard
            title="Orders"
            value={totalOrders}
            percent={`${orderGrowth.toFixed(1)}%`}
            isPositive={orderGrowth >= 0}
          />
          <StatsCard
            title="Revenue"
            value={`Rp ${totalRevenue.toLocaleString("id-ID")}`}
            percent={`${revenueGrowth.toFixed(1)}%`}
            isPositive={revenueGrowth >= 0}
          />

          <div className="lg:col-span-2">
            <MonthlySalesChart data={monthlyOrdersData} />
          </div>

          <MonthlyTarget totalRevenue={totalRevenue} target={monthlyTarget} />

          <div className="lg:col-span-3">
            <TopProductsTable data={transactions} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

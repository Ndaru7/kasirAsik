import React, { useEffect, useState } from 'react';
import CashierLayout from '../layout/CashierLayout';
import axios from 'axios';
import myApi from '../../api/Api';
import { useNavigate } from 'react-router';

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);

  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getTransactions();
  }, [currentPage, sort, order, startDate, endDate]);

  const getTransactions = async () => {
    try {
      const res = await axios.get(
        `${myApi}/transactions-summary?page=${currentPage}&limit=${limit}&sort=${sort}&order=${order}&startDate=${startDate}&endDate=${endDate}`,
        { withCredentials: true }
      );
      setTransactions(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setSort('createdAt');
    setOrder('desc');
    setCurrentPage(1);
  };

  return (
    <CashierLayout>
      <div className="border border-black p-6 space-y-4">
        {/* Filter Ringkas */}
        <div className="flex flex-wrap gap-2 items-center text-sm">
          <label>Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setCurrentPage(1);
              setStartDate(e.target.value);
            }}
            className="border border-black rounded px-2 py-1"
          />
          <span>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setCurrentPage(1);
              setEndDate(e.target.value);
            }}
            className="border border-black rounded px-2 py-1"
          />
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-black rounded px-2 py-1"
          >
            <option value="createdAt">Date</option>
            <option value="total_price">Total Price</option>
          </select>
          <select
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-black rounded px-2 py-1"
          >
            <option value="desc">↓</option>
            <option value="asc">↑</option>
          </select>

          <button
            onClick={handleReset}
            className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition"
          >
            Reset
          </button>
        </div>

        {/* Tabel */}
        <div className="border p-6 bg-[#f9f0e7] rounded-md">
          <table className="w-full table-auto border-separate border-spacing-y-4">
            <thead>
              <tr className="bg-black text-white rounded-full text-left">
                <th className="py-2 px-6 rounded-l-full">NO</th>
                <th className="py-2 px-6">DATE</th>
                <th className="py-2 px-6">TOTAL ITEMS</th>
                <th className="py-2 px-6">TOTAL PRICE</th>
                <th className="py-2 px-6 rounded-r-full">DETAIL PRODUCT</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No data found                  
                    </td>
                </tr>
              ) : (
                transactions.map((item, idx) => (
                  <tr key={item.id} className="text-black font-semibold">
                    <td className="px-6 py-2">{(currentPage - 1) * limit + idx + 1}</td>
                    <td className="px-6 py-2">
                      {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-2">{item.totalItems}</td>
                    <td className="px-6 py-2">{item.total_price}</td>
                    <td className="px-6 py-2 text-blue-300 hover:underline cursor-pointer">
                      <button onClick={() => navigate(`/cashier/history-detail/${item.id}`)}>details</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-black text-white px-4 py-2 rounded-full disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-black font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-black text-white px-4 py-2 rounded-full disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </CashierLayout>
  );
};

export default History;

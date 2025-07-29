import React, { useEffect, useState } from 'react';
import CashierLayout from '../layout/CashierLayout';
import axios from 'axios';
import myApi from '../../api/Api';
import { useNavigate } from 'react-router';

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  const [sort, setSort] = useState('date');
  const [order, setOrder] = useState('desc');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  // Data hasil filter, sort, dan pagination
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactions, sort, order, startDate, endDate, currentPage]);

  const getTransactions = async () => {
    try {
      const res = await axios.get(`${myApi}kasir/transaction/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const applyFilters = () => {
    let data = [...transactions];

    // Filter berdasarkan tanggal
    if (startDate) {
      data = data.filter((t) => new Date(t.date) >= new Date(startDate));
    }
    if (endDate) {
      data = data.filter((t) => new Date(t.date) <= new Date(endDate));
    }

    // Sort
    data.sort((a, b) => {
      let valA = sort === 'date' ? new Date(a.date) : a.total;
      let valB = sort === 'date' ? new Date(b.date) : b.total;
      return order === 'asc' ? valA - valB : valB - valA;
    });

    setFilteredData(data);
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setSort('date');
    setOrder('desc');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / limit);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

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
            <option value="date">Date</option>
            <option value="total">Total Price</option>
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
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No data found
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, idx) => {
                  const totalItems = item.items.reduce(
                    (acc, curr) => acc + curr.qty,
                    0
                  );
                  return (
                    <tr key={item.id} className="text-black font-semibold">
                      <td className="px-6 py-2">
                        {(currentPage - 1) * limit + idx + 1}
                      </td>
                      <td className="px-6 py-2">
                        {new Date(item.date).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-2">{totalItems}</td>
                      <td className="px-6 py-2">Rp. {item.total.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-2 text-blue-300 hover:underline cursor-pointer">
                        <button
                          onClick={() =>
                            navigate(`/cashier/history-detail/${item.id}`)
                          }
                        >
                          details
                        </button>
                      </td>
                    </tr>
                  );
                })
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
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

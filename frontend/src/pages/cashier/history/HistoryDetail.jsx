import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CashierLayout from '../layout/CashierLayout';
import { useNavigate, useParams } from 'react-router';
import myApi from '../../api/Api';

const HistoryDetail = () => {
  const { transaction_id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getTransactionDetails();
  }, []);

  const getTransactionDetails = async () => {
    try {
      const response = await axios.get(`${myApi}/transaction-details/${transaction_id}`, {
        withCredentials: true
      });
      setDetails(response.data);
      console.log(response.data)
    } catch (err) {
      console.error('Gagal mengambil detail transaksi:', err);
    }
  };

  return (
    <CashierLayout>
      <div className="border border-black p-10 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Transaction Product Details #{transaction_id}</h2>

        <div className="border p-6 bg-[#f9f0e7] rounded-md">
          <table className="w-full table-auto border-separate border-spacing-y-4">
            <thead>
              <tr className="bg-black text-white rounded-full text-left">
                <th className="py-3 px-6 rounded-l-full">NO</th>
                <th className="py-3 px-6">PRODUCT NAME</th>
                <th className="py-3 px-6">QTY</th>
                <th className="py-3 px-6">UNIT PRICE</th>
                <th className="py-3 px-6 rounded-r-full">SUB-TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {details.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              ) : (
                details.map((item, index) => (
                  <tr key={index} className="text-black font-semibold">
                    <td className="px-6 py-2">{index + 1}</td>
                    <td className="px-6 py-2">{item.product?.name}</td>
                    <td className="px-6 py-2">{item.quantity}</td>
                    <td className="px-6 py-2">{item.price_each}</td>
                    <td className="px-6 py-2">{item.subtotal}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
          >
            Kembali
          </button>
        </div>
      </div>
    </CashierLayout>
  );
};

export default HistoryDetail;

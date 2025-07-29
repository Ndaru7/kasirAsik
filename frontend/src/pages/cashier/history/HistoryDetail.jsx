import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CashierLayout from '../layout/CashierLayout';
import { useNavigate, useParams } from 'react-router';
import myApi from '../../api/Api';

const HistoryDetail = () => {
  const { transaction_id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const token = localStorage.getItem('token');

  const formatRupiah = (number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);

  useEffect(() => {
    getTransactionDetails();
  }, []);

  const getTransactionDetails = async () => {
    try {
      const response = await axios.get(`${myApi}kasir/transaction/${transaction_id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setTransaction(response.data);
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
              {!transaction ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              ) : (
                transaction.items.map((item, index) => {
                  const unitPrice = item.product?.price || 0;
                  const qty = item.qty || 0;
                  const subTotal = unitPrice * qty;

                  return (
                    <tr key={index} className="text-black font-semibold">
                      <td className="px-6 py-2">{index + 1}</td>
                      <td className="px-6 py-2">{item.product?.name}</td>
                      <td className="px-6 py-2">{qty}</td>
                      <td className="px-6 py-2">{formatRupiah(unitPrice)}</td>
                      <td className="px-6 py-2">{formatRupiah(subTotal)}</td>
                    </tr>
                  );
                })
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

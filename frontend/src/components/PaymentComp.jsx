import React, { useEffect, useState } from 'react';
import qris from "./assets/qris.png"
import { addTransaction } from '../api/transactionAPI';


function PaymentComp({ isOpen, onClose, totalAmount,items }) {
  const [uangMasuk, setUangMasuk] = useState('');
  const [uangKembalian, setUangKembalian] = useState(0);
  const [pesan, setPesan] = useState('');
  const [bayar, setBayar] = useState([]);

  useEffect(() => {
    if (uangMasuk === '') {
      setUangKembalian(0);
      setPesan('');
      return;
    }

    const masuk = parseInt(uangMasuk);
    if (isNaN(masuk)) {
      setPesan('Masukkan angka yang valid.');
      setUangKembalian(0);
      return;
    }

    if (masuk < totalAmount) {
      setPesan('Uang kurang.');
      setUangKembalian(0);
    } else {
      const kembali = masuk - totalAmount;
      setUangKembalian(kembali);
      setPesan('');
    }
  }, [uangMasuk, totalAmount]);

  const handleBatal = () => {
    setUangMasuk('');
    setUangKembalian(0);
    setPesan('');
    onClose(); // kembali ke modal cart
  };

  const handleBayar = async () => {
    if (uangMasuk === '' || parseInt(uangMasuk) < totalAmount) {
      setPesan('Uang kurang.');
      return;
    }
    const payload = {
      items: items.map((item) => ({
        id_product : item.id,
        qty : item.qty
      }))
    };
    try {
      const response = await addTransaction(payload);
      alert("Pembayaran berhasill")
    } catch (error) {
      console.log("Pembayaran Gagal !!", error)
      setPesan("Terjadi Kesalahan saat menyimpan transaksi");
    }

  };

  //Pembayaran masih belum berfungsi, bagian handleBayar

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-[#1e1c1c] text-white p-6 rounded-3xl w-[90%] max-w-4xl flex flex-col md:flex-row items-center gap-6 relative">
        {/* QR */}
        <div className="bg-white rounded-2xl p-4 w-full md:w-1/2 flex flex-col items-center">
          <img
            src={qris}
            alt="QR Code"
            className="w-48 h-48 mb-4 object-cover"
          />
          <p className="text-sm text-black font-bold">SUPPORTED BY:</p>
          <div className="flex justify-center gap-4 mt-2">
            <span>💸</span>
            <span className="text-black font-extrabold text-lg">QRIS</span>
            <span>💳</span>
          </div>
        </div>

        {/* PAYMENT DETAIL */}
        <div className="flex flex-col w-full md:w-1/2 gap-3">
          <div className="flex justify-between text-sm font-bold">
            <span>TOTAL PEMBAYARAN</span>
            <span className="bg-[#f6f0e8] text-black py-1 px-3 rounded-full">
              Rp. {totalAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span>UANG MASUK</span>
            <input
              type="number"
              value={uangMasuk}
              onChange={(e) => setUangMasuk(e.target.value)}
              className="bg-[#f6f0e8] text-black py-1 px-3 rounded-full text-right w-40"
              placeholder="Rp. ..."
            />
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span>UANG KEMBALIAN</span>
            <span className="bg-[#f6f0e8] text-black py-1 px-3 rounded-full">
              Rp. {uangKembalian.toLocaleString()}
            </span>
          </div>

          {/* PESAN */}
          {pesan && <p className="text-red-400 text-xs italic">{pesan}</p>}

          <div className="flex justify-between mt-6">
            <button
              onClick={handleBatal}
              className="bg-red-600 text-white px-6 py-2 rounded-full"
            >
              BATAL
            </button>
            <button
              onClick={handleBayar}
              className="bg-green-600 text-white px-6 py-2 rounded-full"
            >
              BAYAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentComp;

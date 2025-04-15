import React, { useState } from 'react'

function TransactionComp({ isOpen, onClose }) {
    const [jumlah, setJumlah] = useState(2);
    const hargaSatuan = 26000;
    const total = jumlah * hargaSatuan;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#0d0b0c] text-white p-6 rounded-2xl w-full max-w-md relative">
                <button className="absolute top-4 right-4 text-xl" onClick={onClose}>
                    X
                </button>

                <div className="mb-4">
                    <label className="block text-sm font-semibold">ID / NAMA BARANG</label>
                    <input
                        className="mt-1 p-2 w-full bg-[#f8f0eb] text-black rounded-full font-semibold"
                        value="GG SURYA 12 MRH"
                        disabled
                    />
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <label className="text-sm font-semibold">JUMLAH</label>
                        <div className="flex items-center bg-[#f8f0eb] text-black px-3 py-1 rounded-full font-bold">
                            <button onClick={() => setJumlah(jumlah > 1 ? jumlah - 1 : 1)}>-</button>
                            <span className="mx-3">{jumlah}</span>
                            <button onClick={() => setJumlah(jumlah + 1)}>+</button>
                        </div>
                    </div>

                    <div className="text-right">
                        <label className="text-sm font-semibold mr-2">TOTAL</label>
                        <span className="bg-[#f8f0eb] text-black px-4 py-1 rounded-full font-bold">
                            {total.toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="flex justify-between">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-bold">
                        TAMBAH BARANG
                    </button>
                    <button className="bg-[#f8f0eb] text-black px-4 py-2 rounded-full font-bold">
                        BAYAR
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TransactionComp

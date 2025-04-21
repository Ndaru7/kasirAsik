import React, { useEffect, useState } from 'react'
import { getDetailTransaction } from '../api/detailTransaction';

const HistoryPage = () => {

    const [history, setHistory] = useState([]);
    useEffect(() => {
        getDetailTransaction().then(data => setHistory(data));
    }, [])

    return (
        <div className="border border-black p-10">
            <div className="border p-6 bg-[#f9f0e7]">
                <table className="w-full table-auto border-separate border-spacing-y-4">
                    <thead>
                        <tr className="bg-black text-white rounded-full text-left">
                            <th className="py-3 px-6 rounded-l-full">NO</th>
                            <th className="py-3 px-6">TANGGAL</th>
                            <th className="py-3 px-6">ID TRANSAKSI</th>
                            <th className="py-3 px-6">ID PRODUK</th>
                            <th className="py-3 px-6 rounded-r-full">QTY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={item.id} className="text-black font-semibold">
                                <td className="px-6 py-2">{index + 1}</td>
                                <td className="px-6 py-2">{item.transaction.date}</td>
                                <td className="px-6 py-2">{item.id}</td>
                                <td className="px-6 py-2">{item.transaction.cart.product.name}</td>
                                <td className="px-6 py-2">{item.transaction.cart.qty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HistoryPage

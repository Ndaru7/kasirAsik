import React, { useEffect, useState } from 'react'

const HistoryPage = () => {

    const [history, setHistory] = useState([]);
    useEffect(() => {
        //data API ular
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
                                <td className="px-6 py-2">{item.createdAt}</td>
                                <td className="px-6 py-2">{item.id_transaction}</td>
                                <td className="px-6 py-2">{item.id_product}</td>
                                <td className="px-6 py-2">{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HistoryPage

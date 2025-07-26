import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import axios from 'axios'
import myApi from '../../api/Api'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const HistoryReport = () => {
    const [transactions, setTransactions] = useState([])
    const [expandedRow, setExpandedRow] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        getHistoryTransaction();
    }, []);

    const getHistoryTransaction = async () => {
        try {
            const response = await axios.get(
                `${myApi}kasir/transaction/?start=${startDate}&end=${endDate}`,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            );
            setTransactions(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleToggleDetail = (id) => {
        if (expandedRow === id) {
            setExpandedRow(null);
        } else {
            setExpandedRow(id);
        }
    };

    const exportToExcelFull = async () => {
        const summarySheet = transactions.map((trx, index) => ({
            No: index + 1,
            TransactionID: trx.id,
            Date: new Date(trx.date).toLocaleDateString(),
            'Total Price (IDR)': trx.total
        }));

        const detailSheet = transactions.flatMap((trx) =>
            trx.items.map((item) => ({
                TransactionID: trx.id,
                Date: new Date(trx.date).toLocaleDateString(),
                Product: item.product?.name,
                Qty: item.qty,
                'Unit Price': item.product?.price,
                'Sub Total': item.qty * item.product?.price,
            }))
        );

        const workbook = XLSX.utils.book_new();
        const worksheetSummary = XLSX.utils.json_to_sheet(summarySheet);
        XLSX.utils.book_append_sheet(workbook, worksheetSummary, 'Transaction Summary');

        const worksheetDetails = XLSX.utils.json_to_sheet(detailSheet);
        XLSX.utils.book_append_sheet(workbook, worksheetDetails, 'Transaction Details');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `Full_Transaction_Report_${new Date().toISOString().split("T")[0]}.xlsx`);
    };

    return (
        <>
            <AdminLayout>
                <h1 className="text-2xl font-bold mb-4">Products</h1>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border p-2 rounded-md"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border p-2 rounded-md"
                        />
                        <button
                            onClick={getHistoryTransaction}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Filter
                        </button>
                        <button
                            onClick={exportToExcelFull}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Export Excel (Detail)
                        </button>
                    </div>

                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
                            Our products
                            <p className="mt-1 text-sm font-normal text-gray-500">Browse a list of Flowbite products...</p>
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">No</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Total Price</th>
                                <th className="px-6 py-3"><span className="sr-only">Edit</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((trx, index) => (
                                <React.Fragment key={trx.id}>
                                    <tr className="bg-white border-b border-gray-200">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{new Date(trx.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">Rp. {trx.total.toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4 space-x-4">
                                            <button
                                                onClick={() => handleToggleDetail(trx.id)}
                                                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            >
                                                Detail
                                            </button>
                                        </td>
                                    </tr>

                                    {expandedRow === trx.id && (
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <td colSpan="4" className="px-6 py-4">
                                                <table className="w-full text-sm text-left text-gray-500 border">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                                        <tr>
                                                            <th className="px-4 py-2">No</th>
                                                            <th className="px-4 py-2">Product Name</th>
                                                            <th className="px-4 py-2">Qty</th>
                                                            <th className="px-4 py-2">Unit Price</th>
                                                            <th className="px-4 py-2">Sub Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {trx.items.map((item, idx) => (
                                                            <tr key={item.id} className="bg-white border-b">
                                                                <td className="px-4 py-2">{idx + 1}</td>
                                                                <td className="px-4 py-2">{item.product?.name}</td>
                                                                <td className="px-4 py-2">{item.qty}</td>
                                                                <td className="px-4 py-2">Rp. {item.product?.price.toLocaleString('id-ID')}</td>
                                                                <td className="px-4 py-2">Rp. {(item.qty * item.product?.price).toLocaleString('id-ID')}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminLayout>
        </>
    )
}

export default HistoryReport;

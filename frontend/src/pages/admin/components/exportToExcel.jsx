import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const exportToExcel = () => {
  const exportData = transactions.map((trx, index) => ({
    No: (currentPage - 1) * limit + index + 1,
    Date: new Date(trx.createdAt).toLocaleDateString(),
    'Total Items': trx.totalItems,
    'Total Price (IDR)': trx.total_price
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transaction Report");

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(blob, `Transaction_Report_${new Date().toISOString().split("T")[0]}.xlsx`);
};


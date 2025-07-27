const TopProductsTable = ({ data }) => {
  const productMap = {};

  data.forEach(item => {
    const productName = item.product?.name || "Unknown";
    if (!productMap[productName]) {
      productMap[productName] = 0;
    }
    productMap[productName] += item.qty;
  });

  const sortedProducts = Object.entries(productMap)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5); // Ambil top 5

  return (
    <div className="bg-white shadow-md rounded-xl p-4 h-[300px] overflow-auto">
      <h2 className="text-lg font-semibold mb-2">Top Products</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-1">Product</th>
            <th className="pb-1 text-right">qty Sold</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((item, index) => (
            <tr key={index} className="border-b last:border-none">
              <td className="py-1">{item.name}</td>
              <td className="py-1 text-right">{item.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProductsTable;

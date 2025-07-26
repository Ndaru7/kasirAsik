import React, { useEffect, useState } from 'react'
import CashierLayout from '../layout/CashierLayout'
import axios from 'axios';
import myApi from '../../api/Api';


const ProductsList = () => {
  const [categoryActive, setCategoryActive] = useState(null)
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  // Filter produk saat categoryActive berubah
  useEffect(() => {
    if (categoryActive !== null) {
      const filtered = products.filter(p => p.category?.id === categoryActive);
      setFilteredProducts(filtered);
    }
  }, [categoryActive, products]);


  const getCategory = async () => {
    const response = await axios.get(myApi + '/category', {
      withCredentials: true
    })
    setCategory(response.data)
    console.log(response.data)
  }
  const getProducts = async () => {
    const response = await axios.get(myApi + '/products', {
      params:{
        limit: 50 //change if the product does not appear in the table, 50 > bigger means increasing output
      },
      withCredentials: true
    })
    setProducts(response.data.data)
    console.log(response.data.data)
  }
  return (
    <CashierLayout>
      <div className="border border-black p-10">
        <div className="p-6 bg-[#f9f0e7] min-h-screen">
          {categoryActive && (
            <div className="mb-4 text-sm font-semibold text-gray-600">
              PRODUCTS / {category.find(cat => cat.id === categoryActive)?.name}
            </div>
          )}
          {!categoryActive && (
            <div className="border p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {category.map((kategori) => (
                  <button
                    key={kategori.id}
                    onClick={() => setCategoryActive(kategori.id)}
                    className="bg-black text-white font-semibold py-4 rounded-2xl"
                  >
                    {kategori.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          {categoryActive && (
            <div className="border p-6">
              <button
                onClick={() => setCategoryActive(null)}
                className="text-sm text-blue-600 mb-4 hover:underline"
              >
                ← Back to Category
              </button>
              {filteredProducts.length > 0 ? (
                <div className="border p-6">
                  <table className="w-full table-auto border-separate border-spacing-y-4">
                    <thead>
                      <tr className="bg-black text-white rounded-full text-left">
                        <th className="py-3 px-6 rounded-l-full">NO</th>
                        <th className="py-3 px-6">PRODUCT</th>
                        <th className="py-3 px-6">PRICE</th>
                        <th className="py-3 px-6 rounded-r-full">QTY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product, index) => (
                        <tr key={product.id} className="text-black font-semibold">
                          <td className="px-6 py-2">{index + 1}</td>
                          <td className="px-6 py-2">{product.name}</td>
                          <td className="px-6 py-2">{product.price}</td>
                          <td className="px-6 py-2">{product.stock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">There are no products for this category yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </CashierLayout>
  )
}

export default ProductsList
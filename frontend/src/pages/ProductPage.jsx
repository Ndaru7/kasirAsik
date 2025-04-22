import React, { useEffect, useState } from 'react'
import { getCategory } from '../api/categoryAPI';
import { getProducts } from '../api/productAPI';

const ProductPage = () => {
    const [kategoriAktif, setKategoriAktif] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        getCategory().then(data => setCategory(data));
        getProducts().then(data => setProducts(data));
        //Data dari API Asik
    }, []);
    
    console.log(category)
    console.log(products)
    useEffect(() => {
        if (kategoriAktif !== null) {
            const filtered = products.filter(product => product.category?.id === kategoriAktif);
            setFilteredProducts(filtered);
        }
    }, [kategoriAktif, products])



    return (
        <div className="border border-black p-10">
            <div className="p-6 bg-[#f9f0e7] min-h-screen">
                {kategoriAktif && (
                    <div className="mb-4 text-sm font-semibold text-gray-600">
                        PRODUK / {category.find(cat => cat.id === kategoriAktif)?.name}
                    </div>
                )}
                {!kategoriAktif && (
                    <div className="border p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {category.map((kategori) => (
                                <button
                                    key={kategori.id}
                                    onClick={() => setKategoriAktif(kategori.id)}
                                    className="bg-black text-white font-semibold py-4 rounded-2xl"
                                >
                                    {kategori.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {kategoriAktif && (
                    <div className="border p-6">
                        <button
                            onClick={() => setKategoriAktif(null)}
                            className="text-sm text-blue-600 mb-4 hover:underline"
                        >
                            ← Kembali ke kategori
                        </button>
                        {filteredProducts.length > 0 ? (
                            <div className="border p-6">
                                <table className="w-full table-auto border-separate border-spacing-y-4">
                                    <thead>
                                        <tr className="bg-black text-white rounded-full text-left">
                                            <th className="py-3 px-6 rounded-l-full">NO</th>
                                            <th className="py-3 px-6">PRODUK</th>
                                            <th className="py-3 px-6">HARGA</th>
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
                            <p className="text-gray-500">Belum ada produk untuk kategori ini.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductPage;

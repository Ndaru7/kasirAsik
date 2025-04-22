import React, { useEffect, useState } from 'react'
import { getProducts } from '../api/productAPI';
import PaymentComp from './PaymentComp';


function TransactionComp({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState([]);
    const [productReady, setProductReady] = useState([]);
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        getProducts().then(data => setProductReady(data))
    }, [])
    const dataProduk = productReady;
    // console.log(dataProduk)

    const filteredProducts = dataProduk
        .filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 10); //batas max 10 item saja

    const addToCart = (product) => {
        const exist = cart.find((item) => item.id === product.id);
        if (exist) {
            setCart(
                cart.map((item) =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                )
            );
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
    };

    const updateQty = (id, amount) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, qty: Math.max(1, item.qty + amount) } : item
                )
                .filter((item) => item.qty > 0)
        );
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

    const handleClose = () => {
        // Reset keranjang & pencarian saat keluar
        setCart([]);
        setSearchTerm("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-[#f6f0e8] text-black p-6 rounded-2xl w-[90%] max-w-5xl flex flex-col space-y-4 relative">
                <button
                    className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full"
                    onClick={handleClose}
                >
                    Back
                </button>

                <div className="flex gap-6">
                    {/* SEARCH */}
                    <div className="flex-1 border border-black p-4 rounded-2xl">
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-2 pl-4 pr-10 rounded-full border border-black font-bold text-black bg-white"
                            />
                            <span className="absolute right-3 top-2.5 text-black">🔍</span>
                        </div>

                        <ul className="space-y-2 font-semibold max-h-64 overflow-y-auto">
                            {filteredProducts.map((product) => (
                                <li
                                    key={product.id}
                                    className="cursor-pointer hover:underline flex justify-between items-center"
                                    onClick={() => addToCart(product)}
                                >
                                    <span>{product.name}</span>
                                    <span className="text-sm italic text-gray-600">{product.stock}</span>
                                </li>
                            ))}
                        </ul>


                        <p className="text-xs mt-4 italic font-semibold text-gray-700">
                            *Search by name / product code
                        </p>
                    </div>

                    {/* CART  */}
                    <div className="flex-1 border border-black p-4 rounded-2xl">
                        <div className="grid grid-cols-4 font-bold text-sm border-b pb-2 mb-2">
                            <span>KODE / NAMA BARANG</span>
                            <span className="text-center">QTY</span>
                            <span className="text-right">HARGA</span>
                            <span className="text-center">Aksi</span>
                        </div>

                        <ul className="space-y-2 font-semibold max-h-64 overflow-y-auto">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-4 items-center text-sm"
                                >
                                    <span>{item.name}</span>
                                    <div className="flex items-center justify-center space-x-2">
                                        <button
                                            className="px-2 bg-black text-white rounded-full"
                                            onClick={() => updateQty(item.id, -1)}
                                        >
                                            -
                                        </button>
                                        <span>{item.qty}</span>
                                        <button
                                            className="px-2 bg-black text-white rounded-full"
                                            onClick={() => updateQty(item.id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="text-right">
                                        {(item.qty * item.price).toLocaleString()}
                                    </span>
                                    <div className="flex justify-center">
                                        <button
                                            className="text-red-600 font-bold"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            ❌
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </ul>

                        <div className="flex justify-between items-center mt-6 font-bold">
                            <span>TOTAL</span>
                            <span>{total.toLocaleString()}</span>
                        </div>

                        <div className="mt-4 text-xs italic font-semibold">
                            *Default qty value = 1
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-black text-white px-6 py-2 rounded-full font-semibold"
                                onClick={() => setShowPayment(true)}
                            >
                                BAYAR
                            </button>

                            <PaymentComp
                                isOpen={showPayment}
                                onClose={() => setShowPayment(false)}
                                totalAmount={total}
                                items = {cart}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionComp

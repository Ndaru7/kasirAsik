import React, { useState } from 'react'


const dummyProducts = [
    { id: 1, name: "GG SURYA 12 MRH", price: 26000, qty: 35 },
    { id: 2, name: "GG SURYA 12 CKLT", price: 26000, qty: 12 },
    { id: 3, name: "GG SURYA 16 MRH", price: 27000, qty: 88 },
    { id: 4, name: "GG SURYA 16 CKLT", price: 27000, qty: 41 },
    { id: 5, name: "Susu Fisallia", price: 4500, qty: 66 },
    { id: 6, name: "Yakult Montelli", price: 9000, qty: 19 },
    { id: 7, name: "Gorengan Jinzhou", price: 1500, qty: 91 },
    { id: 8, name: "Criwis Verina", price: 3000, qty: 47 },
    { id: 9, name: "Indomie Goreng", price: 3500, qty: 86 },
    { id: 10, name: "Indomie Rebus Ayam", price: 3500, qty: 3 },
    { id: 11, name: "Aqua 600ml", price: 4000, qty: 75 },
    { id: 12, name: "Teh Pucuk 350ml", price: 5000, qty: 60 },
    { id: 13, name: "Ultrajaya Coklat", price: 6000, qty: 39 },
    { id: 14, name: "SilverQueen Kecil", price: 10500, qty: 53 },
    { id: 15, name: "Taro Snack Rumput Laut", price: 7500, qty: 8 },
    { id: 16, name: "Chitato Sapi Panggang", price: 8500, qty: 22 },
    { id: 17, name: "Kopi Kapal Api", price: 1500, qty: 1 },
    { id: 18, name: "Good Day Mocacinno", price: 3000, qty: 96 },
    { id: 19, name: "Luwak White Koffie", price: 3500, qty: 24 },
    { id: 20, name: "Roti Sari Roti Coklat", price: 6000, qty: 55 },
    { id: 21, name: "Roti Tawar Sari Roti", price: 9500, qty: 89 },
    { id: 22, name: "Sambal ABC Sachet", price: 1000, qty: 5 },
    { id: 23, name: "Kecap Bango Kecil", price: 6500, qty: 71 },
    { id: 24, name: "Minyak Goreng 1L", price: 18000, qty: 10 },
    { id: 25, name: "Beras Ramos 2kg", price: 29000, qty: 17 },
    { id: 26, name: "Gula Pasir 1kg", price: 14000, qty: 26 },
    { id: 27, name: "Garam Dapur Refina", price: 3000, qty: 90 },
    { id: 28, name: "Sabun Lifebuoy Merah", price: 3500, qty: 68 },
    { id: 29, name: "Shampoo Pantene 70ml", price: 7500, qty: 48 },
    { id: 30, name: "Pepsodent 75gr", price: 9500, qty: 15 },
    { id: 31, name: "Rinso Cair 800ml", price: 17000, qty: 76 },
    { id: 32, name: "Sikat Gigi Formula", price: 6000, qty: 84 },
    { id: 33, name: "Tissue Paseo 250 Sheet", price: 12000, qty: 92 },
    { id: 34, name: "Senter Mini LED", price: 15000, qty: 43 },
    { id: 35, name: "Baterai ABC AA 2pcs", price: 9000, qty: 7 },
    { id: 36, name: "Lilin Cap Menara", price: 7000, qty: 100 },
    { id: 37, name: "Obat Nyamuk Bakar", price: 4000, qty: 4 },
    { id: 38, name: "Baygon Aerosol", price: 25000, qty: 37 },
    { id: 39, name: "Sapu Lidi", price: 11000, qty: 23 },
    { id: 40, name: "Pel Lantai SuperMop", price: 32000, qty: 67 },
    { id: 41, name: "Botol Minum 500ml", price: 8000, qty: 20 },
    { id: 42, name: "Gunting Kecil", price: 6000, qty: 79 },
    { id: 43, name: "Pensil 2B", price: 1500, qty: 99 },
    { id: 44, name: "Pulpen Standard", price: 2000, qty: 58 },
    { id: 45, name: "Buku Tulis 38 Lbr", price: 4000, qty: 18 },
    { id: 46, name: "Lakban Coklat Besar", price: 8500, qty: 13 },
    { id: 47, name: "Masker Medis 3 Ply", price: 2500, qty: 80 },
    { id: 48, name: "Hand Sanitizer 100ml", price: 12000, qty: 9 },
    { id: 49, name: "Korek Gas Tokai", price: 3000, qty: 62 },
    { id: 50, name: "Sabun Cuci Piring Sunlight", price: 7000, qty: 42 },
];


function TransactionComp({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState([]);

    const filteredProducts = dummyProducts
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
                                    <span className="text-sm italic text-gray-600">{product.qty}</span>
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

                        <div className="space-y-2 max-h-64 overflow-y-auto">
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
                        </div>

                        <div className="flex justify-between items-center mt-6 font-bold">
                            <span>TOTAL</span>
                            <span>{total.toLocaleString()}</span>
                        </div>

                        <div className="mt-4 text-xs italic font-semibold">
                            *Default qty value = 1
                        </div>

                        <div className="flex justify-end mt-4">
                            <button className="bg-black text-white px-6 py-2 rounded-full font-semibold">
                                BAYAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionComp

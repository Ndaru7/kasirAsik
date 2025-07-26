import React, { useState, useEffect } from 'react';
import axios from 'axios';
import myApi from '../../api/Api';

const Cashier = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paidAmount, setPaidAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get(myApi + '/products', {
      params:{
        limit: 100 //change if the product does not appear in the table, 50 > bigger means increasing output
      },
      withCredentials: true,
    });
    setProducts(response.data.data);
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLocaleLowerCase())
    )
    .slice(0, 100);

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    const newQty = exist ? exist.qty + 1 : 1;

    if (newQty > product.stock) {
      setError('Stok tidak mencukupi');
      return;
    }

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: newQty } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setError('');
  };

  const updateQty = (id, amount) => {
    const product = products.find((p) => p.id === id);
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + amount);
        if (newQty > product.stock) {
          setError('Stok tidak mencukupi');
          return item;
        }
        return { ...item, qty: newQty };
      }
      return item;
    });
    setCart(updatedCart);
    setError('');
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleClose = () => {
    setCart([]);
    setSearch('');
    setPaidAmount('');
    setShowPayment(false);
    setError('');
    onClose();
  };

  const handlePayment = async () => {
    if (!paidAmount || parseInt(paidAmount) < total) {
      setError('Nominal pembayaran kurang');
      return;
    }
    try {
      await axios.post(myApi + '/transactions', {
        user_id: 1, // hardcoded untuk contoh
        items: cart.map((item) => ({ product_id: item.id, quantity: item.qty })),
        paid_amount: parseInt(paidAmount),
      }, { withCredentials: true });

      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (err) {
      console.error(err);
      setError('Gagal melakukan transaksi');
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-[#f6f0e8] text-black p-6 rounded-2xl w-[90%] max-w-5xl flex flex-col space-y-4 relative">
          <button
            className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full"
            onClick={handleClose}
          >
            Back
          </button>

          {error && <p className="text-red-600 font-semibold text-sm text-center">{error}</p>}

          {!showPayment ? (
            <div className="flex gap-6">
              {/* SEARCH */}
              <div className="flex-1 border border-black p-4 rounded-2xl">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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

              {/* CART */}
              <div className="flex-1 border border-black p-4 rounded-2xl">
                <div className="grid grid-cols-4 font-bold text-sm border-b pb-2 mb-2">
                  <span>CODE /PRODUCT NAME</span>
                  <span className="text-center">QTY</span>
                  <span className="text-right">PRICE</span>
                  <span className="text-center">ACTION</span>
                </div>

                <ul className="space-y-2 font-semibold max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="grid grid-cols-4 items-center text-sm">
                      <span>{item.name}</span>
                      <div className="flex items-center justify-center space-x-2">
                        <button className="px-2 bg-black text-white rounded-full" onClick={() => updateQty(item.id, -1)}>-</button>
                        <span>{item.qty}</span>
                        <button className="px-2 bg-black text-white rounded-full" onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>
                      <span className="text-right">{(item.qty * item.price).toLocaleString()}</span>
                      <div className="flex justify-center">
                        <button className="text-red-600 font-bold" onClick={() => removeFromCart(item.id)}>❌</button>
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
                    PAY
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Metode Pembayaran</h2>
              <p className="text-lg font-semibold">Total: Rp {total.toLocaleString()}</p>

              <input
                type="number"
                placeholder="Nominal Dibayarkan"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                className="border px-4 py-2 w-full rounded-md"
              />
              {paidAmount && parseInt(paidAmount) >= total && (
                <p className="text-green-600">Kembalian: Rp {(parseInt(paidAmount) - total).toLocaleString()}</p>
              )}

              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setShowPayment(false)}
                >
                  Batal
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  onClick={handlePayment}
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cashier;

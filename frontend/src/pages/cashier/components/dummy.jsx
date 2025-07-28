import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dummy = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [change, setChange] = useState(null);

  // Ambil data produk dari backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/kasir/products/', {
          headers: {
            Authorization: `Token ${token}`,
          }
        });
        setProducts(res.data);
      } catch (error) {
        console.error('Gagal mengambil produk:', error);
      }
    };

    fetchProducts();
  }, [token]);

  // Tambahkan produk ke cart
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCart = cartItems.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const handlePayment = async () => {
    try {
      const transactionRes = await axios.post(
        'http://localhost:8000/kasir/transaction/',
        {
          items: cartItems.map(item => ({
            id_product: item.id,
            qty: item.qty
          }))
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const transactionId = transactionRes.data.id;

      const paymentRes = await axios.post(
        'http://localhost:8000/kasir/payment/',
        {
          id_transaction: transactionId,
          amount: parseInt(amount)
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setChange(paymentRes.data.change);
      setAlertVisible(true);
      setCartItems([]);
      setAmount('');

      // Sembunyikan alert & tutup modal setelah 3 detik
      setTimeout(() => {
        setAlertVisible(false);
        setIsCartOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Gagal memproses pembayaran', error);
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="border rounded p-4 shadow-sm">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">Rp {product.price.toLocaleString()}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 w-full bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Tambah ke Cart
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700"
      >
        Buka Cart ({cartItems.length})
      </button>

      {/* ✅ Alert Success Floating */}
      {alertVisible && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-[50%]">
          <div
            className="p-4 text-green-800 border border-green-300 rounded-lg bg-green-50 shadow-lg"
            role="alert"
          >
            <div className="flex items-center">
              <svg className="shrink-0 w-4 h-4 me-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <h3 className="text-lg font-medium">Pembayaran Berhasil</h3>
            </div>
            <div className="mt-2 mb-2 text-sm">
              Transaksi selesai. Kembalian: <strong>Rp {change?.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Modal Cart */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Cart</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Cart kosong.</p>
            ) : (
              <>
                <ul className="mb-4 space-y-2 max-h-60 overflow-y-auto">
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex justify-between border-b pb-1">
                      <span>{item.name} x {item.qty}</span>
                      <span>Rp {item.price.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-semibold mb-2">Total: Rp {totalPrice.toLocaleString()}</p>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded mb-2"
                  placeholder="Masukkan jumlah bayar"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
                <button
                  onClick={handlePayment}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-2"
                >
                  Bayar
                </button>
              </>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dummy;

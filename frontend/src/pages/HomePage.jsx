import React, { useState } from 'react'
import TransactionComp from '../components/TransactionComp';

function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="border border-black p-10">
            <h1 className="text-5xl font-bold mb-6">Kasir Kita</h1>
            <p className="text-xl mb-10">
                Untuk Nusa dan bangsa yang lebih maju <br /> dan minim bug
            </p>
            <div className="flex justify-end space-x-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black text-white px-6 py-2 rounded-full transition-all"
                >
                    TRANSAKSI
                </button>

            </div>

            <TransactionComp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

export default HomePage

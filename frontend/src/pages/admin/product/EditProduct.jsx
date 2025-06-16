import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EditProduct = () => {
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        getProductById();
    }, [])
    const getProductById = async (id) => {
        const response = await axios.get(`http://localhost:8000/kasir/products/${id}`)
        setName(response.data.name)
        setPrice(response.data.price)
        setStock(response.data.stock)
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8000/kasir/products/${id}`, {
                name,
                price: Number(price),
                stock: parseInt(stock),
                id_category: parseInt(category)
            })
            navigate('/products')
        } catch (error) {
            console.log(error.message)
        }
    }

    // BELUM JADI , ENDPOINT TIDAK BISA DIPANGGIL TERUTAMA CATEGORY

    return (
        <>


            <form class="max-w-sm mx-auto" onSubmit={updateProduct}>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div class="col-span-2 sm:col-span-1">
                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="RP. XXXX" required="" />
                </div>
                <div class="col-span-2 sm:col-span-1">
                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ">
                        <option selected="">Select category</option>
                        {/* {selectedCategory.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))} */}
                    </select>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </>
    )
}

export default EditProduct

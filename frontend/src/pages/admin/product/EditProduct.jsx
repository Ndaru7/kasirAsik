import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditProduct = () => {
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState([])
    const { id } = useParams()

    useEffect(() => {
        getProductById();
        getCategory();
    }, [])
    const getProductById = async () => {
        const response = await axios.get(`http://localhost:8000/kasir/products/${id}`)
        console.log(response.data)
        setName(response.data.name)
        setPrice(response.data.price)
        setStock(response.data.stock)
        setCategory(response.data.category)
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
    // console.log(selectedCategory)
    const getCategory = async () => {
        const response = await axios.get('http://localhost:8000/kasir/category/')
        setSelectedCategory(response.data)
    }

    // BELUM JADI , ENDPOINT TIDAK BISA DIPANGGIL TERUTAMA CATEGORY

    return (
        <>


            <form className="max-w-sm mx-auto" onSubmit={updateProduct}>
                <div className='mb-5'>
                    <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900">Nama </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 " />
                </div>
                <div className='mb-5'>
                    <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900">Price </label>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 " />
                </div>
                <div className='mb-5'>
                    <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900">Stock </label>
                    <input value={stock} onChange={(e) => setStock(e.target.value)} type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 " />
                </div>
                <div className='mb-5'>
                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 ">Select your country</label>
                    <select value={category} onChange={(e)=> setCategory(e.target.value)}class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        <option value={category}>{category}</option>
                    {selectedCategory.map((s)=>(
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                    </select>
                </div>
                <button type="submit" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Update</button>
            </form>
        </>
    )
}

export default EditProduct

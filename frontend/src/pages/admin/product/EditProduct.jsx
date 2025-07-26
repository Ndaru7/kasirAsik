import React, { useEffect, useState } from 'react'
import axios from 'axios'
import myApi from '../../api/Api'
import AdminLayout from '../layout/AdminLayout'
import { useNavigate, useParams } from 'react-router'



const EditProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')
    const [selectedCategory, setSelectedCategory] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();

    // Token User
    const token = localStorage.getItem('token');
    useEffect(() => {
        getProductById();
        getCategory();
    }, [])

    const getProductById = async () => {
        const response = await axios.get(myApi + `kasir/products/${id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        console.log(response.data)
        setName(response.data.name)
        setPrice(response.data.price)
        setStock(response.data.stock)
        setCategory(response.data.category_id)
    }
    const getCategory = async () => {
        const response = await axios.get(myApi + 'kasir/category/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        setSelectedCategory(response.data)
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(myApi + `kasir/products/${id}/`, {
                name,
                price,
                stock,
                category_id: category
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            navigate('/admin/products')
        } catch (error) {
            console, log(error.message)
        }
    }
    return (
        <AdminLayout>
            <>
                <form class="max-w-sm mx-auto" onSubmit={updateProduct}>
                    <div class="mb-5">
                        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Name Product </label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div class="mb-5">
                        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div class="mb-5">
                        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Stock</label>
                        <input value={stock} onChange={(e) => setStock(e.target.value)} type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className='mb-5'>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Select Category</option>
                            {selectedCategory.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-5'>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                    </div>
                </form>

            </>
        </AdminLayout>
    )
}

export default EditProduct

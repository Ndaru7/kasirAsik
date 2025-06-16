import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    // const [result, setResult] = useState()
    const [count, setCount] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getProducts();
        getCategory();
    }, [page])
    const limit = 20;
    const offset = (page - 1) * limit

    const getProducts = async () => {
        const response = await axios.get('http://localhost:8000/kasir/products/', {
            params: {
                offset,
                limit
            }
        })
        setProducts(response.data.results)
        setTotalPages(Math.ceil(response.data.count / limit));
        setCount(response.data.count);

    }
    const addProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/kasir/products/', {
                name,
                price: Number(price),
                stock: parseInt(stock),
                id_category: parseInt(category)
            })
            setName('')
            setPrice('')
            setStock('')
            setCategory('')
            setShowModalAdd(false)
            getProducts()
        } catch (error) {
            console.log('Error:', error.response?.data || error.message)
        }
    }



    const getCategory = async () => {
        const response = await axios.get('http://localhost:8000/kasir/category/');
        setSelectedCategory(response.data)
    }

    const deleteProduct = async (id) => {
        e.preventDefault();
        await axios.delete(`http://localhost:8000/kasir/products/${id}`)
        getProducts();
        alert('Product Berhasil dihapus !!')
    }
    return (
        <>

            <div>
                <div>
                    <button onClick={() => setShowModalAdd(true)} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add Product</button>

                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3 rounded-s-lg">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Qty
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 rounded-e-lg">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 rounded-e-lg">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item, idx) => (
                                <tr key={idx} className="bg-white text-black">
                                    <td className="px-6 py-4">
                                        {(page - 1) * limit + idx + 1}
                                    </td>

                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.stock}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.category.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.price}
                                    </td>
                                    <td className="px-6 py-4 space-x-5">
                                        <Link to={`/product/${item.id}`} className='text-blue-800 cursor-pointer hover:text-blue-400'>Edit</Link>
                                        <a onClick={() => deleteProduct(item.id)} className='text-red-800 cursor-pointer hover:text-red-300'>Delete</a>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                        <tfoot>
                            <tr className="font-semibold text-gray-900 bg-gray-50">
                                <th scope="row" className="px-6 py-3 text-base">Total</th>
                                <td className="px-6 py-3">{count}</td>
                                <td></td>
                                <td></td>
                                <td className="px-6 py-3">21,000</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div>
                    {/* PAGINATION ASIK*/}
                    <div className='flex justify-center mt-4 space-x-2'>
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
                        >
                            Prev
                        </button>
                        {
                            [...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i + 1)}
                                    className={`px-4 py-2 rounded ${page === i + 1 ? "bg-blue-500" : "bg-gray-100"}`}
                                >
                                    {i + 1}
                                </button>
                            ))
                        }

                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                            className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
                        >
                            Next
                        </button>

                    </div>
                </div>
            </div>
            {/* MODAL COMPONENT ADD */}

            {showModalAdd && (
                <>
                    {/* <!-- Main modal --> */}
                    <div id="crud-modal" tabindex="-1" aria-hidden="true" class="flex bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-4 w-full max-w-md max-h-full">
                            {/* <!-- Modal content --> */}
                            <div class="relative bg-white rounded-lg shadow-sm">
                                {/* <!-- Modal header --> */}
                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
                                    <h3 class="text-lg font-semibold text-gray-900 ">
                                        Create New Product
                                    </h3>
                                    <button onClick={() => setShowModalAdd(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/* <!-- Modal body --> */}
                                <form class="p-4 md:p-5" onSubmit={addProduct}>
                                    <div class="grid gap-4 mb-4 grid-cols-2">
                                        <div class="col-span-2">
                                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Nama Produk" />
                                        </div>
                                        <div class="col-span-2 sm:col-span-1">
                                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                                            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="RP. XXXX" required="" />
                                        </div>
                                        <div class="col-span-2 sm:col-span-1">
                                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                                            <select value={category} onChange={(e) => setCategory(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ">
                                                <option selected="">Select category</option>
                                                {selectedCategory.map((c) => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div class="col-span-2">
                                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Stock</label>
                                            <input value={stock} onChange={(e) => setStock(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Contoh: 10, 20, 30, ..." />
                                        </div>
                                    </div>
                                    <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                        Add new product
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default ProductList

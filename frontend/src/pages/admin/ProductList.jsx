import React, { useEffect, useState } from 'react'
import axios from 'axios'
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        getProducts();
        addProduct();
    }, [])

    const getProducts = async () => {
        const response = await axios.get('http://localhost:8000/kasir/products/')
        setProducts(response.data)
    }
    const addProduct = async(e) =>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/kasir/products/',{
                name,
                price,
                stock
            })
            setShowModalAdd(false);
            getProducts();
            setName('')
            setPrice('')
            setStock('')
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>

            <div>
                <div>
                </div>
                <div>
                    <button onClick={()=>setShowModalAdd(true)} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add Product</button>

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
                                        {idx + 1}
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
                                    <td className="px-6 py-4">
                                        <a href="" className='text-blue-600 cursor-pointer'>Edit</a>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                        <tfoot>
                            <tr className="font-semibold text-gray-900 bg-gray-50">
                                <th scope="row" className="px-6 py-3 text-base">Total</th>
                                <td className="px-6 py-3"></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="px-6 py-3">21,000</td>
                            </tr>
                        </tfoot>
                    </table>
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
                                    <button onClick={()=>setShowModalAdd(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
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
                                            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type product name" />
                                        </div>
                                        <div class="col-span-2 sm:col-span-1">
                                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                                            <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="$2999" required="" />
                                        </div>
                                        <div class="col-span-2 sm:col-span-1">
                                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                                            <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ">
                                                <option selected="">Select category</option>
                                                <option value="TV">TV/Monitors</option>
                                                <option value="PC">PC</option>
                                                <option value="GA">Gaming/Console</option>
                                                <option value="PH">Phones</option>
                                            </select>
                                        </div>
                                        <div class="col-span-2">
                                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 ">Product Description</label>
                                            <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>
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

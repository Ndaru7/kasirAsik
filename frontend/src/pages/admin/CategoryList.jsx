import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CategoryList = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState([])
    const [showModalAdd, setShowModalAdd] = useState(false)

    useEffect(() => {
        getCategory();
    }, [])

    const getCategory = async () => {
        const response = await axios.get('http://localhost:8000/kasir/category/')
        setCategory(response.data)
    }
    const addCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/kasir/category/', {
                name
            })
            getCategory()
            setShowModalAdd(false)
            setName('')
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <>
            <div>
                <div>
                    <button onClick={() => setShowModalAdd(true)} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add Category</button>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3 rounded-s-lg">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 rounded-e-lg">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.map((item, idx) => (
                                <tr key={idx} className="bg-white text-black">
                                    <td className="px-6 py-4">
                                        {idx + 1}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4 space-x-5">
                                        <a className='text-blue-800 cursor-pointer hover:text-blue-400'>Edit</a>
                                        <a className='text-red-800 cursor-pointer hover:text-red-300'>Delete</a>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                        <tfoot>
                            <tr className="font-semibold text-gray-900 bg-gray-50">
                                <th scope="row" className="px-6 py-3 text-base">Total</th>
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
                                        Create New Category
                                    </h3>
                                    <button onClick={() => setShowModalAdd(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/* <!-- Modal body --> */}
                                <form class="p-4 md:p-5" onSubmit={addCategory}>
                                    <div class="grid gap-4 mb-4 grid-cols-2">
                                        <div class="col-span-2">
                                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Nama Produk" />
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

export default CategoryList

import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import axios from 'axios'
import myApi from '../../api/Api'


const Category = () => {
  const [category, setCategory] = useState([])
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [name, setName] = useState('')
  // Token User
  const token = localStorage.getItem('token');

  useEffect(() => {
    getCategory();
  }, [])

  const getCategory = async () => {
    const response = await axios.get(myApi + 'kasir/category/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    setCategory(response.data)
  }
  const addCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(myApi + 'kasir/category/', {
        name
      }, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      getCategory()
      setShowModalAdd(false)
      setName('')
    } catch (error) {
      console.log(error.message)
    }

  }
  const deleteCategory = async (id) => {
    try {
      await axios.delete(myApi + `kasir/category/${id}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      getCategory();
      alert('Category deleted !!')
    } catch (error) {

    }
  }
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Category</h1>
      <div>
        <div className='grid justify-items-end'>
          <button onClick={() => setShowModalAdd(true)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add Category</button>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                  No
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 rounded-e-lg">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {category.map((item, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-6 py-4">
                    {idx + 1}
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {item.name}
                  </th>
                  <td className="px-6 py-4">
                    <button onClick={() => deleteCategory(item.id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-gray-900 ">
                <th scope="row" className="px-6 py-3 text-base">Total</th>
                <th scope="row" className="px-6 py-3 text-base"></th>
                <td className="px-6 py-3">3</td>
              </tr>
            </tfoot>
          </table>
        </div>
        {/* Modal Add Category */}
        {showModalAdd && (
          <>
            <div id="crud-modal" tabindex="-1" aria-hidden="true" className="flex bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div className="relative p-4 w-full max-w-md max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow-sm ">
                  {/* <!-- Modal header --> */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 ">
                      Create New Category
                    </h3>
                    <button onClick={() => setShowModalAdd(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-toggle="crud-modal">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <form className="p-4 md:p-5" onSubmit={addCategory}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type Category" />
                      </div>
                    </div>
                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Add
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </AdminLayout>

  )
}

export default Category
import { useEffect, useState } from 'react'
import axios from 'axios'
import myApi from '../../api/Api'
import AdminLayout from '../layout/AdminLayout'
import { Link } from 'react-router'


const Products = () => {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('')

  const [selectedCategory, setSelectedCategory] = useState([])

  const [showModalAdd, setShowModalAdd] = useState(false)

  // Pagination
  const [count, setCount] = useState(20)
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [limit] = useState(20)
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(count / limit)
  // Token User
  const token = localStorage.getItem('token');

  useEffect(() => {
    getProducts();
    getCategory();
  }, [offset])

  const getProducts = async () => {
    const response = await axios.get(`${myApi}kasir/products/`, {
      params: {
        limit,
        offset,
        search
      },
      headers: {
        Authorization: `Token ${token}`
      }
    });
    // console.log(response.data.results)
    setProducts(response.data.results);
    setCount(response.data.count)
    setNext(response.data.next)
    setPrevious(response.data.previous)

  }

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${myApi}kasir/products/`, {
        name,
        price,
        stock,
        id_category: category
      }, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      getProducts()
      setShowModalAdd(false)
      setName('')
      setCategory('')
      setPrice('')
      setStock('')
    } catch (error) {
      console.log(error.message)
    }
  }
  const getCategory = async () => {
    const response = await axios.get(`${myApi}kasir/category/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    console.log(response.data)
    setSelectedCategory(response.data)
  }

  const handleNext = () => {
    if (next) {
      setOffset(offset + limit)
    }
  }
  const handlePrevious = () => {
    if (previous) {
      setOffset(Math.max(offset - limit, 0));
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    setOffset((pageNumber - 1) * limit);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setOffset(0);         // reset ke halaman pertama
    setCurrentPage(1);    // reset page
    getProducts(0, search); // kirim search dan offset baru
  };



  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${myApi}kasir/products/${id}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      getProducts();
      alert('Product Deleted !!')
    } catch (error) {
      console.log(error.message)
      alert('Remove Product Failed ...')
    }
  }
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div>

      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className='flex flex-row justify-between'>
          <div>
            <button onClick={() => setShowModalAdd(true)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add Product</button>

          </div>
          <div className='order-last'>

            <form onSubmit={handleSearch} className="max-w-md w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Search
                </button>
              </div>
            </form>

          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white ">
            Our products
            <p className="mt-1 text-sm font-normal text-gray-500 ">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer">
                Category
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer">
                Stock
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, idx) => (
              <tr key={idx} className="bg-white border-b  border-gray-200">
                <td className="px-6 py-4">
                  {(currentPage - 1) * limit + idx + 1}                
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.name}
                </th>
                <td className="px-6 py-4">
                  {item.category?.name || "XXXXX"}
                </td>
                <td className="px-6 py-4">
                  {item.stock}
                </td>
                <td className="px-6 py-4">
                  Rp. {item.price.toLocaleString('id-ID')}
                </td>
                <td className="px-6 py-4 space-x-4">
                  <Link to={`/admin/products/${item.id}`}>
                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type='button'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    </button>
                  </Link>
                  <button onClick={() => deleteProduct(item.id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={handlePrevious}
          disabled={!previous}
          className={`px-4 py-2 rounded-lg text-sm ${previous
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Previous
        </button>

        {/* Tombol halaman angka */}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1.5 rounded-lg text-sm ${currentPage === page
                ? 'bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={!next}
          className={`px-4 py-2 rounded-lg text-sm ${next
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Next
        </button>
      </div>


      <p className="text-center text-sm text-gray-600 mt-2">
        Showing {offset + 1} to {Math.min(offset + limit, count)} of {count} products
      </p>

      {/* Modal Add */}
      {showModalAdd && (
        <>
          <div className="flex bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow-sm">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 ">
                    Create New Product
                  </h3>
                  <button onClick={() => setShowModalAdd(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <form className="p-4 md:p-5" onSubmit={addProduct}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                      <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type product name" />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label for="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                      <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Rp 50.000" />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label for="category" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ">
                        <option selected="">Select category</option>
                        {selectedCategory.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                      <input value={stock} onChange={(e) => setStock(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="ex : 1,2,3 or more..." />
                    </div>
                  </div>
                  <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add new product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  )
}

export default Products
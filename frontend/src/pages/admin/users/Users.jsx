import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import axios from 'axios'
import myApi from '../../api/Api'
import { Link } from 'react-router'


const Users = () => {
  const [users, setUsers] = useState([])
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [confPassword, setConfPassword] = useState('')

  useEffect(() => {
    getUsers();

  }, [])

  const getUsers = async () => {
    const response = await axios.get(myApi + '/users', {
      withCredentials: true
    })
    console.log(response.data)
    setUsers(response.data)
  }

  const addUsers = async (e) => {
    e.preventDefault();
    try {
      await axios.post(myApi + '/users', {
        name,
        password,
        confPassword,
        email,
        role
      }, {
        withCredentials: true
      })
      getUsers();
      setShowModalAdd(false)
      setName('')
      setPassword('')
      setEmail('')
      setRole('')
      setConfPassword('')
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteUser = async (id) => {
    try {
      await axios.delete(myApi + `/users/${id}`, {
        withCredentials: true
      })
      getUsers();
      alert('User Berhasil di hapus 🙏')
    } catch (error) {
      console.log(error.message)

    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Users Control</h1>
      <p>Add Users </p>
      <div>
        <div className='grid justify-items-end'>
          <button onClick={() => setShowModalAdd(true)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add User</button>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                  No
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Password
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 rounded-e-lg">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-6 py-4">
                    {idx + 1}
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {item.name}
                  </th>
                  <td className="px-6 py-4">
                    ******
                  </td>
                  <td className="px-6 py-4">
                    {item.email}
                  </td>
                  <td className="px-6 py-4">
                    {item.role}
                  </td>
                  <td className="px-6 py-4 space-x-4">
                    <Link to={`/admin/users/${item.uuid}`} >
                      <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </button>
                    </Link>
                    <button onClick={()=>deleteUser(item.id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
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
        {showModalAdd && (
          <>
            {/* Modal Add Category */}
            <div className="flex bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div className="relative p-4 w-full max-w-md max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow-sm ">
                  {/* <!-- Modal header --> */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 ">
                      Register as a User
                    </h3>
                    <button onClick={() => setShowModalAdd(false)} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div className="p-4 md:p-5">
                    <form className="space-y-4" onSubmit={addUsers} >
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="yi long ma" required />
                      </div>
                      <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " required />
                      </div>
                      <div>
                        <label for="confPassword" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                        <input value={confPassword} onChange={(e) => setConfPassword(e.target.value)} type="password" name="password" id="confPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " required />
                      </div>
                      <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="name@company.com" required />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ">
                          <option value={'admin'}>Admin</option>
                          <option value={'cashier'}>Cashier</option>
                        </select>
                      </div>
                      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Account</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </AdminLayout>
  )
}

export default Users
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import myApi from '../../api/Api'
import AdminLayout from '../layout/AdminLayout'

const EditUser = () => {
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState()
    const { id, uuid } = useParams();
    const navigate = useNavigate()
    const [role, setRole] = useState('')


    useEffect(() => {
        getUserById();
    }, [])

    const getUserById = async () => {
        const response = await axios.get(myApi + `/users/${uuid}`, {
            withCredentials: true
        })
        console.log(response.data);
        setName(response.data.name)
        setEmail(response.data.email)
        setPassword('')
        setConfPassword('')
        setRole(response.data.role)
    }
    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(myApi + `/users/${uuid}`, {
                name,
                email,
                password,
                confPassword,
                role
            }, {
                withCredentials: true
            })
            navigate('/admin/users')
        } catch (error) {
            console.log(error.message)

        }
    }
    return (
        <AdminLayout>
            <form class="max-w-sm mx-auto" onSubmit={updateUser}>
                <div class="mb-5">
                    <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Name Product </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text"  class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div class="mb-5">
                    <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div class="mb-5">
                    <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Conf Password</label>
                    <input type='password' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div class="mb-5">
                    <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"  class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className='mb-5'>
                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Role</label>
                    <input value={role} onChange={(e) => setRole(e.target.value)} type="text"  class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly/>

                </div>
                <div className='mb-5'>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                </div>
            </form>
        </AdminLayout>
    )
}

export default EditUser

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Login ke Django
      const res = await axios.post('http://localhost:8000/kasir/auth/login/', {
        username,
        password,
      });

      // Simpan token di localStorage
      localStorage.setItem('token', res.data.token);

      // Simpan user ke context
      setUser(res.data.user);

      // Arahkan sesuai role
      const role = res.data.user.role;
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'kasir') {
        navigate('/cashier/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Login gagal');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

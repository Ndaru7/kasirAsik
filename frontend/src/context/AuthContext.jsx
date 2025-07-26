import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get('http://localhost:8000/kasir/me/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUser(res.data[0]); // karena response berupa array
    } catch (err) {
      console.error('Gagal mengambil data user:', err);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post('http://localhost:8000/kasir/auth/logout/', {}, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      } catch (err) {
        console.error('Gagal logout:', err);
      }
    }

    // Hapus token dan user dari state
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

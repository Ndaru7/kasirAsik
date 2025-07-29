import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { FaXTwitter } from 'react-icons/fa6'; // Icon X (Twitter)
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/kasir/auth/login/', {
        username,
        password,
      });

      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);

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
  const handleGoogle = () => {
    alert(`Sorry we didn't get there:)`)
  }
  const handleX = () => {
    alert(`yilong ma's app is for cn only`)

  }

  const handleBack = () => navigate('/'); // Ubah ke '/dashboard' jika perlu

  return (
    <div className="flex min-h-screen">
      {/* Kiri - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 lg:px-32 bg-white">
        <button onClick={handleBack} className="text-sm text-gray-600 mb-6 hover:underline flex items-center">
          <span className="mr-2">←</span> Back to dashboard
        </button>

        <div className="mb-6">
          <h2 className="text-3xl font-semibold mb-2">Sign In</h2>
          <p className="text-sm text-gray-500">Enter your email and password to sign in!</p>
        </div>

        {/* Tombol Social Login */}
        <div className="flex gap-4 mb-4">
          <button onClick={handleGoogle} className="flex items-center justify-center w-1/2 border px-4 py-2 rounded hover:bg-gray-100">
            <FcGoogle className="text-xl mr-2" />
            Sign in with Google
          </button>
          <button onClick={handleX} className="flex items-center justify-center w-1/2 border px-4 py-2 rounded hover:bg-gray-100">
            <FaXTwitter className="text-xl mr-2" />
            Sign in with X
          </button>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="text-sm font-medium">Email *</label>
            <input
              type="text"
              placeholder="info@gmail.com"
              className="w-full border px-3 py-2 rounded mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password *</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border px-3 py-2 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Sign in
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      {/* Kanan - Desain */}
      <div className="hidden md:flex w-1/2 bg-[#1E1E4B] items-center justify-center text-white p-8">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4 flex items-center justify-center">
            <span className="bg-blue-500 px-2 py-1 rounded mr-2">📊</span> Kasir Yaping
          </div>
          <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. A vero quod est libero quidem. Tempora voluptas, placeat mollitia numquam doloribus commodi? Deleniti eveniet reiciendis corrupti doloremque assumenda minus excepturi officiis at aperiam pariatur rerum iste, architecto autem perferendis quos fugit cumque veniam reprehenderit dicta quis corporis! Nisi corporis voluptate odit officiis earum. Quasi voluptas deserunt temporibus, iste, voluptatem vitae nostrum sequi iusto laborum earum nobis nisi ducimus enim porro. Vero neque incidunt, earum aliquid quis similique officiis fugiat, amet saepe unde perferendis eveniet nemo iure! Optio delectus eligendi harum. Vero magni saepe velit soluta culpa nulla, eligendi numquam eos, eaque enim aliquid. Laborum dignissimos aliquam eaque facilis repellendus culpa deserunt explicabo sequi itaque numquam! Sit nihil nemo, molestiae eos nostrum illo autem repudiandae ea maiores tenetur, facilis nisi! Eum fugit voluptatem eaque ratione, nam consequuntur aliquid quos fugiat corporis dolores non. Distinctio, velit maiores doloribus facilis illum laborum blanditiis ipsum similique dolorum sint molestias perspiciatis dolorem quaerat officiis cum eaque dolor nisi soluta id repellat odit. Magnam ipsum similique ut beatae nisi minus omnis voluptatum sunt pariatur cum quaerat labore quam vero dolorem unde fuga optio vel, aspernatur dolores velit hic, facilis eum. In magni iure voluptatum tempore amet animi excepturi accusantium exercitationem quos laudantium vero labore hic suscipit explicabo, ratione reprehenderit fugit, id mollitia rem? Architecto rem quaerat saepe vel atque doloribus neque placeat quas assumenda maiores, harum animi expedita deserunt consequuntur illo eum possimus. Aperiam deserunt temporibus quasi maiores culpa eum debitis quidem dolores, dolorum doloremque repellat quas iusto, fuga fugiat sed illo non, voluptate repudiandae? Aliquam officiis, necessitatibus eos aut tenetur temporibus iure iusto dignissimos facilis natus explicabo provident sunt ipsam a reprehenderit rem maxime nemo sit facere quod eius qui ipsa laboriosam. Eveniet itaque possimus, quas nesciunt fugit ipsam quae repellat debitis nihil nemo sunt odio blanditiis repudiandae aliquam? Odit accusamus, obcaecati accusantium itaque qui, facere sint laudantium recusandae molestiae optio quis, quidem aut quae ipsam? Nostrum unde delectus repellendus fugiat hic quae obcaecati ducimus doloremque eaque possimus. Voluptates animi laborum repellendus totam. Tempora nisi excepturi laborum sed, mollitia facere ab aut omnis perferendis alias officiis asperiores quae laudantium, sint nesciunt. Consequuntur modi debitis earum numquam ut obcaecati? Praesentium eveniet magni officiis expedita totam tempora architecto dolore, ut laudantium repellat, optio quae aliquid fuga sequi modi cupiditate nemo quos. Deleniti minus dolore illum quasi libero. Earum distinctio cupiditate expedita dignissimos reprehenderit quidem odio cumque voluptas placeat? Non, modi officia ullam eligendi quos ea sunt consectetur, est ipsa harum neque quis itaque maiores exercitationem. Atque, earum! Quia omnis cumque error nobis atque veniam, sunt eius impedit suscipit, consequatur accusamus doloribus saepe non soluta assumenda illo est? Incidunt, et deleniti ducimus adipisci laborum sapiente tempora illo, ab alias repellat suscipit nam ut tempore error autem quibusdam qui? Vitae, provident? Quibusdam distinctio pariatur quas voluptates ea animi, quasi, quam, nostrum nulla obcaecati alias ullam placeat at architecto! Illo, suscipit doloremque. Officia non assumenda vero itaque iusto magnam quia sed at dolores. Tempore ex velit enim harum quas quod fuga.<br />
            <strong>
              ~ my Project Leader
            </strong></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

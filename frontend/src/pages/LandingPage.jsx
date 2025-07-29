import { Link } from "react-router"

const LandingPage = () => {
    return (
        <div>
            <div className="min-h-screen bg-gray-100">
                <header className="flex justify-between items-center p-6 bg-white shadow-md">
                    <h1 className="text-2xl font-bold text-gray-800">Kasir Kita</h1>
                    <Link to={'/login'} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        Login
                    </Link>
                </header>

                <main className="flex justify-center items-center h-[80vh] text-center">
                    <h2 className="text-3xl text-gray-600">Selamat datang di Kasir Kita</h2>
                </main>
            </div>
        </div>
    )
}

export default LandingPage
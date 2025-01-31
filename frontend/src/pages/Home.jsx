import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RBAC System
            </h1>
            <div className="flex items-center space-x-6">
              {user ? (
                <>
                  <span className="text-gray-700 font-medium">
                    Welcome, {user.username}!
                  </span>
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-blue-600 font-medium text-lg transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Link
            to="/admin"
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-8 text-center">
              <h3 className="text-white text-2xl font-bold mb-4">
                Admin Panel
              </h3>
              <p className="text-blue-100">Manage system settings and users</p>
            </div>
          </Link>
          <Link
            to="/manager"
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-8 text-center">
              <h3 className="text-white text-2xl font-bold mb-4">
                Manager Panel
              </h3>
              <p className="text-green-100">Oversee team operations</p>
            </div>
          </Link>
          <Link
            to="/user"
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-8 text-center">
              <h3 className="text-white text-2xl font-bold mb-4">User Panel</h3>
              <p className="text-purple-100">Access your dashboard</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

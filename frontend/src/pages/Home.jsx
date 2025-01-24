import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">RBAC System</h1>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">Welcome, {user.username}!</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>
                <Link to="/register" className="text-green-500">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin"
            className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center hover:bg-blue-600"
          >
            Admin Panel
          </Link>
          <Link
            to="/manager"
            className="bg-green-500 text-white p-6 rounded-lg shadow-md text-center hover:bg-green-600"
          >
            Manager Panel
          </Link>
          <Link
            to="/user"
            className="bg-purple-500 text-white p-6 rounded-lg shadow-md text-center hover:bg-purple-600"
          >
            User Panel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
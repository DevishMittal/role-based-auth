import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, password, role);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
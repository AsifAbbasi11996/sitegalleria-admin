import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/adminUserApi";
import toast from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // 👈 for checkbox
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);

      // Save login state, token, and username
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminUsername", response.data.admin.username);
      toast.success(`${response.data.admin.username} login successfully`, { duration: 5000 })
      navigate("/admin/navbar/logo");
    } catch (err) {
      console.error("Login failed", err);
      const message =
        err.response?.data?.message || "Invalid username/email or password";
      setError(message);
      toast.error(message, { duration: 5000 })
    }
  };

  return (
    <div className="h-[93vh] flex items-center justify-center sm:bg-gray-100 sm:px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="sm:text-2xl text-xl font-bold text-center mb-6">Admin Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="md:text-base text-sm">Email or Username</label>
            <input
              type="text"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-2"
              required
            />
          </div>
          <div>
            <label className="md:text-base text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"} // 👈 toggle type
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-2"
              required
            />
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-sm">
                Show Password
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

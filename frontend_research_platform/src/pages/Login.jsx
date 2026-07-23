import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const token = await loginUser(formData);
            login(token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data || "Invalid credentials. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
            <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-center mb-2 text-slate-900">Welcome Back</h1>
                <p className="text-sm text-slate-500 text-center mb-8">Access the secure research repository platform</p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-5 border border-red-100 font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-600 mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                            className="w-full border border-slate-300 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-600 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="w-full border border-slate-300 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3.5 rounded-xl font-semibold hover:bg-blue-700 shadow-md active:scale-[0.99] transition disabled:opacity-50"
                    >
                        {loading ? "Verifying Identity..." : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-600 mt-6">
                    New here? <Link to="/register" className="text-blue-600 hover:underline font-medium">Create an account</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;       
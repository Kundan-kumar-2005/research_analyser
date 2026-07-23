import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        departmentId: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });
        try {
            const response = await registerUser(formData);
            setMessage({ type: "success", text: response || "Registration complete! Routing to login..." });
            setFormData({ username: "", email: "", password: "", departmentId: "" });
            setTimeout(() => navigate("/login"), 1500);
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data || "Registration failed." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-4">
            <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-center mb-2 text-slate-900">Create Account</h1>
                <p className="text-sm text-slate-500 text-center mb-6">Register identity credentials to coordinate papers</p>

                {message.text && (
                    <div className={`p-3 rounded-lg text-sm mb-5 border font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">Department ID Matrix Reference</label>
                        <input
                            type="number"
                            name="departmentId"
                            placeholder="e.g. 1, 2"
                            value={formData.departmentId}
                            onChange={handleChange}
                            required
                            className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 text-white p-3.5 rounded-xl font-semibold hover:bg-emerald-700 transition shadow-md disabled:opacity-50"
                    >
                        {loading ? "Registering Records..." : "Complete Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-600 mt-6">
                    Already registered? <Link to="/login" className="text-blue-600 hover:underline font-medium">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
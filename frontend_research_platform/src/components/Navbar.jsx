import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-slate-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/dashboard" className="text-2xl font-bold text-blue-400 tracking-tight">
                    Research Platform
                </Link>

                {isAuthenticated && (
                    <div className="flex items-center gap-6 text-sm font-medium">
                        <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
                        <Link to="/papers" className="hover:text-blue-400 transition">Papers</Link>
                        <Link to="/upload" className="hover:text-blue-400 transition">Upload</Link>
                        <Link to="/admin" className="hover:text-blue-400 transition">Admin</Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700 font-semibold shadow-md shadow-red-900/20 active:scale-[0.98] transition-all"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
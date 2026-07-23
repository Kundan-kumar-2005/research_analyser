import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Papers from "./pages/Papers";
import UploadPaper from "./pages/UploadPaper";
import PaperDetails from "./pages/PaperDetails";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
                <Routes>
                    {/* Open Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Shielded Paths */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/papers" element={<ProtectedRoute><Papers /></ProtectedRoute>} />
                    <Route path="/papers/:id" element={<ProtectedRoute><PaperDetails /></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
                    <Route path="/upload" element={<ProtectedRoute><UploadPaper /></ProtectedRoute>} />

                    {/* Catch-all Wildcard Route */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
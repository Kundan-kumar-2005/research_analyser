import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
    const [stats, setStats] = useState({ total: 0, approved: 0, rejected: 0, pending: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getDashboardStats();
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch engine stats configurations", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading Workspace Metrics...</div>;

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Workspace Overview</h1>
            <p className="text-slate-500 text-sm mb-8">System tracking matrices across your platform execution tracks</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Repository Papers</h2>
                    <p className="text-4xl font-extrabold text-slate-900 mt-2">{stats.total}</p>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6">
                    <h2 className="text-emerald-600 text-xs font-semibold uppercase tracking-wider">Approved Items</h2>
                    <p className="text-4xl font-extrabold text-emerald-700 mt-2">{stats.approved}</p>
                </div>

                <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-6">
                    <h2 className="text-rose-600 text-xs font-semibold uppercase tracking-wider">Rejected Items</h2>
                    <p className="text-4xl font-extrabold text-rose-700 mt-2">{stats.rejected}</p>
                </div>

                <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6">
                    <h2 className="text-amber-600 text-xs font-semibold uppercase tracking-wider">Pending Moderation</h2>
                    <p className="text-4xl font-extrabold text-amber-700 mt-2">{stats.pending}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
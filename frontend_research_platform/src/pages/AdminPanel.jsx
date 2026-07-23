import { useEffect, useState } from "react";
import { getAllPapers } from "../services/paperService";
import { approvePaper, rejectPaper, deletePaper } from "../services/adminService";

function AdminPanel() {
    const [papers, setPapers] = useState([]);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        loadPapers();
    }, []);

    const loadPapers = async () => {
        try {
            const data = await getAllPapers();
            setPapers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAction = async (actionFn, id, successMsg) => {
        setActionLoading(true);
        try {
            await actionFn(id);
            alert(successMsg);
            loadPapers();
        } catch (error) {
            console.error(error);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-slate-900">Administrative Moderation Terminal</h1>
                <p className="text-slate-500 text-sm">Review, evaluate status workflows, or hard delete catalog contents.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                <th className="p-4 pl-6">Research Document Title</th>
                                <th className="p-4">Owner Address</th>
                                <th className="p-4">Verification Status</th>
                                <th className="p-4 pr-6 text-right">Moderation Controls</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {papers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center p-8 text-slate-400">No managed file objects available inside target index parameters.</td>
                                </tr>
                            ) : (
                                papers.map((paper) => (
                                    <tr key={paper.id} className="hover:bg-slate-50/50 transition">
                                        <td className="p-4 pl-6 font-semibold text-slate-900">{paper.title}</td>
                                        <td className="p-4 text-slate-600">@{paper.uploadedBy?.username || "anonymous"}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${paper.paperStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-700' : paper.paperStatus === 'REJECTED' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>
                                                {paper.paperStatus || "SUBMITTED"}
                                            </span>
                                        </td>
                                        <td className="p-4 pr-6 text-right space-x-2 whitespace-nowrap">
                                            <button 
                                                disabled={actionLoading}
                                                onClick={() => handleAction(approvePaper, paper.id, "Paper Approved Successfully")}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                disabled={actionLoading}
                                                onClick={() => handleAction(rejectPaper, paper.id, "Paper Marked as Rejected")}
                                                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                                            >
                                                Reject
                                            </button>
                                            <button 
                                                disabled={actionLoading}
                                                onClick={() => handleAction(deletePaper, paper.id, "Document Dropped Completely")}
                                                className="border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPapers, downloadPaper, searchPapers } from "../services/paperService";

function Papers() {
    const [papers, setPapers] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPapers();
    }, []);

    const loadPapers = async () => {
        setLoading(true);
        try {
            const data = await getAllPapers();
            setPapers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!keyword.trim()) {
            loadPapers();
            return;
        }
        setLoading(true);
        try {
            const data = await searchPapers(keyword);
            setPapers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const statusBadge = (status) => {
        switch(status) {
            case "APPROVED":
                return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-full">Approved</span>;
            case "REJECTED":
                return <span className="bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold px-3 py-1 rounded-full">Rejected</span>;
            default:
                return <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-3 py-1 rounded-full">Submitted</span>;
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Research Repository</h1>
                    <p className="text-slate-500 text-sm mt-1">Explore and access peer-reviewed structural updates</p>
                </div>
                <Link to="/upload" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm shadow-sm transition">
                    + Submit a Paper
                </Link>
            </div>

            <div className="flex gap-3 bg-white p-3 border border-slate-200 rounded-2xl shadow-sm mb-8">
                <input
                    type="text"
                    placeholder="Search by title, abstract or department catalog indexing keywords..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="bg-slate-50 p-3 flex-1 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                />
                <button onClick={handleSearch} className="bg-slate-900 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-slate-800 transition">
                    Search
                </button>
                <button onClick={() => { setKeyword(""); loadPapers(); }} className="border border-slate-200 text-slate-700 text-sm font-medium px-5 py-3 rounded-xl hover:bg-slate-50 transition">
                    Reset
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-400 animate-pulse">Scanning core document database indices...</div>
            ) : papers.length === 0 ? (
                <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <p className="text-slate-400 text-sm">No items matching parameters found inside the cluster index.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {papers.map((paper) => (
                        <div key={paper.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start gap-2 mb-3">
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                                        {paper.department?.name || "General"}
                                    </span>
                                    {statusBadge(paper.paperStatus)}
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{paper.title}</h2>
                                <p className="text-slate-400 text-xs mb-4">📅 Release Year: {paper.publicationYear}</p>
                            </div>
                            
                            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                                <Link to={`/papers/${paper.id}`} className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm py-2.5 rounded-xl transition">
                                    View Details
                                </Link>
                                <button onClick={() => downloadPaper(paper.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition">
                                    Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Papers;
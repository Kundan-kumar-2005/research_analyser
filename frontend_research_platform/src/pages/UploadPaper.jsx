import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadPaper } from "../services/paperService";

function UploadPaper() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [abstractText, setAbstractText] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("abstractText", abstractText);
            formData.append("publicationYear", publicationYear);
            formData.append("file", file);

            await uploadPaper(formData);
            setMessage({ type: "success", text: "Manuscript cataloged to data cluster successfully!" });
            
            setTitle("");
            setAbstractText("");
            setPublicationYear("");
            setFile(null);
            setTimeout(() => navigate("/papers"), 1500);
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data || "Pipeline block error during file streaming upload." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-8">
            <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Publish Research Manuscript</h1>
                <p className="text-slate-500 text-sm mb-6">Upload abstract parameters and structured document file binaries.</p>

                {message.text && (
                    <div className={`p-4 rounded-xl text-sm mb-6 border font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-600 mb-2">Paper Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter the document title"
                            required
                            className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-600 mb-2">Abstract Summary text</label>
                        <textarea
                            value={abstractText}
                            onChange={(e) => setAbstractText(e.target.value)}
                            placeholder="Summarize methodology scope contexts here..."
                            rows="5"
                            required
                            className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-600 mb-2">Publication Year</label>
                        <input
                            type="number"
                            value={publicationYear}
                            onChange={(e) => setPublicationYear(e.target.value)}
                            placeholder="e.g. 2026"
                            required
                            className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-600 mb-2">Manuscript File Payload (PDF / DOCX)</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                            className="w-full border border-dashed border-slate-300 rounded-xl p-4 text-sm bg-slate-50/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-semibold p-3.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition"
                    >
                        {loading ? "Streaming document upload track..." : "Publish Document to Repository"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UploadPaper;
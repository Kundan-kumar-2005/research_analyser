import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPaperById } from "../services/paperService";
import { addReview, getReviewsByPaper } from "../services/reviewService";

function PaperDetails() {
    const { id } = useParams();
    const [paper, setPaper] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadPaper();
    }, [id]);

    const loadPaper = async () => {
        try {
            const data = await getPaperById(id);
            setPaper(data);
            const reviewData = await getReviewsByPaper(id);
            setReviews(reviewData);
        } catch (error) {
            console.error(error);
        }
    };

    const submitReview = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        setSubmitting(true);
        try {
            await addReview(id, { comment, rating: parseInt(rating) });
            const updatedReviews = await getReviewsByPaper(id);
            setReviews(updatedReviews);
            setComment("");
            setRating(5);
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    if (!paper) return <div className="max-w-4xl mx-auto p-8 text-center text-slate-400 animate-pulse">Loading document data records...</div>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <Link to="/papers" className="text-sm text-blue-600 hover:underline mb-6 inline-block font-medium">
                &larr; Back to Repository Directory
            </Link>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-6">{paper.title}</h1>
                
                <div className="mb-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Abstract Summary</h3>
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
                        {paper.abstractText}
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 bg-slate-50/50 p-5 rounded-xl border border-slate-100 text-sm">
                    <div>
                        <span className="block text-xs text-slate-400 font-medium">Department</span>
                        <span className="font-semibold text-slate-800">{paper.department?.name || "Unassigned"}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-slate-400 font-medium">Release Year</span>
                        <span className="font-semibold text-slate-800">{paper.publicationYear}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-slate-400 font-medium">Contributor Author</span>
                        <span className="font-semibold text-slate-800">@{paper.uploadedBy?.username || "anonymous"}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-slate-400 font-medium">Original File Document Name</span>
                        <span className="font-mono text-xs text-slate-600 block truncate">{paper.originalFileName || "N/A"}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-slate-400 font-medium">Verification Status Flag</span>
                        <span className={`font-bold ${paper.paperStatus === 'APPROVED' ? 'text-emerald-600' : paper.paperStatus === 'REJECTED' ? 'text-rose-600' : 'text-amber-600'}`}>
                            {paper.paperStatus || "SUBMITTED"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Reviews Block */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-950 mb-6">Peer Evaluation & Reviews</h2>

                <form onSubmit={submitReview} className="space-y-4 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase text-slate-600">Append Evaluation Log</h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="sm:w-1/4">
                            <select 
                                value={rating} 
                                onChange={(e) => setRating(e.target.value)}
                                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-sm font-medium text-slate-800"
                            >
                                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                            </select>
                        </div>
                        <input
                            type="text"
                            placeholder="Provide constructive text assessment statements..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="flex-1 bg-white border border-slate-300 rounded-xl p-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                        <button 
                            type="submit" 
                            disabled={submitting} 
                            className="bg-blue-600 text-white font-medium text-sm px-6 py-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition"
                        >
                            {submitting ? "Posting..." : "Submit"}
                        </button>
                    </div>
                </form>

                <div className="space-y-4">
                    {reviews.length === 0 ? (
                        <p className="text-slate-400 text-sm text-center py-4">No reviews assigned to this execution node matrix target folder yet.</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="border border-slate-100 p-5 rounded-xl bg-slate-50/50">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-amber-500 font-bold text-sm">{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</span>
                                    <span className="text-xs text-slate-400 font-medium">Reviewer Account: @{review.user?.username || "peer"}</span>
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed">{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default PaperDetails;
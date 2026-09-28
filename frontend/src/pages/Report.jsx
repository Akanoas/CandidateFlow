import { useEffect, useState } from "react";
import api, { errorMessage } from "../api/api";
import { Alert, Loading } from "../components/Feedback.jsx";

const formatGeneratedAt = (date) =>
    new Intl.DateTimeFormat(undefined, {
        dateStyle: "full",
        timeStyle: "medium",
    }).format(date);

export default function Report() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [generatedAt, setGeneratedAt] = useState(null);

    useEffect(() => {
        const loadReport = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await api.get("/candidates");
                setItems(response.data || []);
                setGeneratedAt(new Date());
            } catch (e) {
                setError(errorMessage(e));
            } finally {
                setLoading(false);
            }
        };

        loadReport();
    }, []);

    return (
        <div className="p-4 p-lg-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <div className="eyebrow">RECRUITING OPERATIONS</div>
                    <h1 className="page-title mb-1">Candidate Pipeline Report</h1>
                    <p className="text-muted mb-0">
                        Current candidate directory for recruiting operations.
                    </p>
                </div>
                <div className="text-md-end">
                    <div className="small text-muted text-uppercase fw-semibold">Generated</div>
                    <div className="fw-semibold" aria-live="polite">
                        {generatedAt ? formatGeneratedAt(generatedAt) : "Generating report…"}
                    </div>
                </div>
            </div>

            <Alert message={error} />

            {loading ? (
                <Loading text="Generating candidate pipeline report…" />
            ) : (
                <div className="card border-0 shadow-sm table-card">
                    <div className="card-body border-bottom p-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
                        <div>
                            <div className="fw-semibold">Candidate pipeline</div>
                            <div className="small text-muted">
                                {items.length} {items.length === 1 ? "candidate" : "candidates"} included in this report
                            </div>
                        </div>
                        <span className="badge text-bg-primary px-3 py-2">Live data</span>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Location</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.length ? (
                                items.map((candidate) => (
                                    <tr key={candidate.id}>
                                        <td className="fw-semibold">
                                            {candidate.firstName} {candidate.lastName}
                                        </td>
                                        <td>{candidate.email}</td>
                                        <td>{candidate.location || "—"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-muted py-5">
                                        No candidates are available for this report.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

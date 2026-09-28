import { useEffect, useMemo, useState } from "react";
import api, { errorMessage } from "../api/api";
import { Alert, Loading } from "../components/Feedback.jsx";
import { CandidateModal } from "../components/EntityModal.jsx";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";

export default function Candidates() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [record, setRecord] = useState(null);
    const [modal, setModal] = useState(false);
    const [modalError, setModalError] = useState("");
    const [remove, setRemove] = useState(null);
    const [busy, setBusy] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const load = async () => {
        setLoading(true);
        setError("");
        try {
            setItems((await api.get("/candidates")).data || []);
        } catch (e) {
            setError(errorMessage(e));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const filteredItems = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return items;

        return items.filter((candidate) => {
            const firstName = (candidate.firstName || "").toLowerCase();
            const lastName = (candidate.lastName || "").toLowerCase();
            return firstName.includes(query) || lastName.includes(query);
        });
    }, [items, searchTerm]);

    const save = async (value) => {
        setBusy(true);
        setModalError("");
        try {
            if (value.id) {
                await api.put(`/candidates/${value.id}`, value);
            } else {
                await api.post("/candidates", value);
            }
            setModal(false);
            await load();
        } catch (e) {
            setModalError(errorMessage(e));
        } finally {
            setBusy(false);
        }
    };

    const del = async () => {
        setBusy(true);
        try {
            await api.delete(`/candidates/${remove.id}`);
            setRemove(null);
            await load();
        } catch (e) {
            setError(errorMessage(e));
            setRemove(null);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="p-4 p-lg-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <div className="eyebrow">TALENT DIRECTORY</div>
                    <h1 className="page-title mb-0">Candidates</h1>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setRecord(null);
                        setModalError("");
                        setModal(true);
                    }}
                >
                    <i className="bi bi-plus-lg me-2" />
                    Add candidate
                </button>
            </div>

            <Alert message={error} />

            {loading ? (
                <Loading text="Loading candidates…" />
            ) : (
                <div className="card border-0 shadow-sm table-card">
                    <div className="card-body border-bottom p-3">
                        <label htmlFor="candidate-search" className="form-label fw-semibold mb-2">
                            Search candidates
                        </label>
                        <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search" aria-hidden="true" />
              </span>
                            <input
                                id="candidate-search"
                                className="form-control"
                                type="search"
                                placeholder="Search by first name or last name"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                aria-describedby="search-result-count"
                            />
                            {searchTerm && (
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setSearchTerm("")}
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <div id="search-result-count" className="small text-muted mt-2" aria-live="polite">
                            {filteredItems.length} {filteredItems.length === 1 ? "candidate" : "candidates"} shown
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th className="text-end">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredItems.length ? (
                                filteredItems.map((candidate) => (
                                    <tr key={candidate.id}>
                                        <td className="fw-semibold">
                                            {candidate.firstName} {candidate.lastName}
                                        </td>
                                        <td>{candidate.email}</td>
                                        <td>{candidate.phone || "—"}</td>
                                        <td>{candidate.location || "—"}</td>
                                        <td className="text-end">
                                            <button
                                                className="btn btn-sm btn-light border me-2"
                                                type="button"
                                                aria-label={`Edit ${candidate.firstName} ${candidate.lastName}`}
                                                onClick={() => {
                                                    setRecord(candidate);
                                                    setModalError("");
                                                    setModal(true);
                                                }}
                                            >
                                                <i className="bi bi-pencil" />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                type="button"
                                                aria-label={`Delete ${candidate.firstName} ${candidate.lastName}`}
                                                onClick={() => setRemove(candidate)}
                                            >
                                                <i className="bi bi-trash" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted py-5">
                                        {items.length
                                            ? "No candidates match your search. Try a different first or last name."
                                            : "No candidates yet. Add the first candidate."}
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {modal && (
                <CandidateModal
                    record={record}
                    onClose={() => setModal(false)}
                    onSave={save}
                    apiError={modalError}
                    busy={busy}
                />
            )}

            <ConfirmDeleteModal
                show={Boolean(remove)}
                title="Delete candidate"
                name={remove ? `${remove.firstName} ${remove.lastName}` : ""}
                onCancel={() => setRemove(null)}
                onConfirm={del}
                busy={busy}
            />
        </div>
    );
}

import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function AppShell() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const leave = () => {
        logout();
        navigate("/login");
    };

    const nav = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

    return (
        <div className="d-flex min-vh-100">
            <aside className="command-sidebar p-3 d-flex flex-column">
                <div className="brand mb-4">
                    <i className="bi bi-layers-fill me-2" />
                    CandidateFlow
                </div>
                <div className="small text-white-50 mb-3">OPERATIONS COMMAND CENTER</div>

                <nav className="nav nav-pills flex-column gap-1" aria-label="Main navigation">
                    <NavLink className={nav} to="/dashboard">
                        <i className="bi bi-grid-1x2-fill me-2" />
                        Dashboard
                    </NavLink>
                    <NavLink className={nav} to="/candidates">
                        <i className="bi bi-people-fill me-2" />
                        Candidates
                    </NavLink>
                    <NavLink className={nav} to="/jobs">
                        <i className="bi bi-briefcase-fill me-2" />
                        Job Openings
                    </NavLink>
                    <NavLink className={nav} to="/reports/candidate-pipeline">
                        <i className="bi bi-file-earmark-bar-graph-fill me-2" />
                        Pipeline Report
                    </NavLink>
                </nav>

                <div className="mt-auto border-top border-secondary pt-3">
                    <div className="small text-white-50">SIGNED IN AS</div>
                    <div className="text-white text-truncate">{user?.email}</div>
                    <span className="badge text-bg-primary mt-2">{user?.role || "USER"}</span>
                    <button className="btn btn-outline-light btn-sm w-100 mt-3" onClick={leave}>
                        <i className="bi bi-box-arrow-right me-2" />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-grow-1 command-main">
                <Outlet />
            </main>
        </div>
    );
}

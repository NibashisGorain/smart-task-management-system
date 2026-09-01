import { useNavigate } from "react-router-dom";


function Navbar({ darkMode, setDarkMode }) {
    const navigate = useNavigate();
    const name = localStorage.getItem("name");

    const handleLogout = () => {
        toast.dismiss();
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">
                <span className="navbar-brand fw-bold">
                    📋 Smart Task Manager
                </span>

                <span className="text-white fw-semibold fs-5">
                  👋 Welcome back, {name}
                </span>

                <button
                  className="btn btn-outline-warning"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? "☀" : "🌙"}
                </button>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
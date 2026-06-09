import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Account created successfully 🚀");

      // optional auto-login style UX
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #e0e7ff, #f8fafc)",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2 className="text-center fw-bold mb-2">
          Smart Task Manager
        </h2>

        <p className="text-center text-muted mb-4">
          Create your account and get started
        </p>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted">
            Already have an account?{" "}
          </span>

          <Link to="/" className="text-decoration-none fw-semibold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
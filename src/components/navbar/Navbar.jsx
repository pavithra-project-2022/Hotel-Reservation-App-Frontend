import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogOut = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    try {
      dispatch({ type: "LOGOUT", payload: false });
      navigate("/login");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">SmartBooking</span>
        </Link>
        {user ? (
          <div className="navItems">
            <span className="navButton" style={{ color: "inherit" }}>
              {user.username}{" "}
            </span>
            <span
              className="navButton"
              style={{ color: "inherit" }}
              onClick={handleLogOut}
            >
              Logout
            </span>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register" className="navButton" style={{ color: "inherit", textDecoration: "none" }}>Register</Link>
            <Link
              to="/login"
              style={{ color: "inherit", textDecoration: "none" }}
              className="navButton"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

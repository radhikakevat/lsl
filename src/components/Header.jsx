import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
// import { setAuthenticated, setUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    logoutUser();
    // dispatch(setAuthenticated(false));
    // dispatch(setUser(null));
    navigate("/login");
  };

  return (
    <div style={styles.header}>
      <div>
        <strong>MultiTenant App</strong>
      </div>
      <div>
        {user?.name} | <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "60px",
    width: "100%",
    backgroundColor: "#0d6efd",
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "0 1rem",
    zIndex: 1000,
  },
};

export default Header;

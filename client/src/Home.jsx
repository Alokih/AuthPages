import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const isLoggedIn = localStorage.getItem("userId");

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    localStorage.removeItem("userId");
    document.location.reload();
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Welcome, User!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>HomePage</h2>
          <Link to="/login">Login</Link>
          <br></br>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Home;

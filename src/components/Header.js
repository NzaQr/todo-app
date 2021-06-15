import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUsername(name);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("name", username);
  }, [username]);

  return (
    <div className="header-container">
      <form onSubmit={handleSubmit}>
        <p className="form-title">Welcome, </p> {""}
        <input
          className="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Header;

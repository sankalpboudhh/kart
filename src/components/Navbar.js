import React, { useContext, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { ThemeContext } from "../ThemeContext.js";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
  };

  const { theme, toggleTheme, user, backendAPI, toggleBackendAPI } =
    useContext(ThemeContext);
  return (
    <div className="header">
      <div className="header-item">
        <NavLink to="/">
          <strong>Awesome Blog</strong>
        </NavLink>
      </div>
      <div className="head-item">
        <form onSubmit={handleSubmit}>
          <input
            name="query"
            type="text"
            placeholder="search blog"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button>GO!!</button>
        </form>
      </div>
      <div className="header-item">
        {user ? (
          <>
            <NavLink to="/profile" activeClassName="active">
              {user.name}
            </NavLink>{" "}
            <NavLink to="/create" activeClassName="active">
              Create Post
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
        )}{" "}
        <button onClick={toggleTheme}>
          {theme === "dark" ? "Theme:dark" : "Theme:light"}
        </button>
        <button onClick={toggleBackendAPI}>
          {backendAPI === "/api" ? "API:Real" : "API:Mock"}
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Popular from "../Pages/Popular";
import UpcomingMovies from "../Pages/UpcomingMovies";
import TopRatedMovies from "../Pages/TopRatedMovies";
import Home from "../Pages/Home";
import MovieDetail from "./MovieDetail";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [input, setInput] = useState("");

  function handleInput(e) {
    setInput(e.target.value);
  }

  return (
    <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/Home">MovieDb</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/popular">Popular</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/top-rated">Top Rated</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/upcoming">Upcoming</NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={input}
                onChange={handleInput}
              />
              <NavLink
                className="btn btn-outline-success"
                to={`/search?query=${encodeURIComponent(input)}`}
              >
                Search
              </NavLink>
            </form>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top-rated" element={<TopRatedMovies />} />
        <Route path="/upcoming" element={<UpcomingMovies />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/search" element={<SearchBar/>} />
      </Routes>
    </BrowserRouter>
  );
}

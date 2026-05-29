import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import './style.css';

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="nav">
            <div className="nav-left">
                <h3>AnimeFusion</h3>
            </div>
            <button
                className="nav-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
            >
                {menuOpen ? <FiX /> : <FiMenu />}
            </button>
            <div className={`nav-center${menuOpen ? ' open' : ''}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/genres" onClick={() => setMenuOpen(false)}>Genres</Link>
                <Link to="/latest" onClick={() => setMenuOpen(false)}>Latest</Link>
                <Link to="/mylist" onClick={() => setMenuOpen(false)}>My List</Link>
            </div>
        </nav>
    );
}

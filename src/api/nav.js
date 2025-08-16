
    import { Link } from "react-router-dom";
    import './style.css';
    
    export default function Nav() {
        return (
            <nav className="nav">
                <div className="nav-left">
                    <h3>AnimeFusion</h3>
                </div>
                <div className="nav-center">
                    <Link to="/">Home</Link>
                    <Link to="/genres">Genres</Link>
                    <Link to="/latest">Latest</Link>
                    <Link to="/mylist">My List</Link>
                </div>
             
            </nav>
        );
    }
    
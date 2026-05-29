import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { add2, remove } from "./action";
import { FiHeart, FiX } from "react-icons/fi";
import "./style.css"

export default function Mylist() {
    const my_list = useSelector(data => data.mylist)
    const dis = useDispatch()

    if (my_list.length === 0) {
        return (
            <div className="anime-app">
                <h1 className="title">My List</h1>
                <div className="empty-state">
                    <div className="empty-state-icon"><FiHeart /></div>
                    <h3>Your list is empty</h3>
                    <p>Click the "Add to List" button on any anime to save it here</p>
                </div>
            </div>
        );
    }

    return (
        <div className="anime-app">
            <h1 className="title">My List ({my_list.length})</h1>
            <div className="anime-grid">
                {
                    my_list.map((p) => {
                        return (
                            <div className="pp" key={p.mal_id} style={{ position: 'relative' }}>
                                <button
                                    className="remove-btn"
                                    onClick={() => dis(remove(p))}
                                    aria-label="Remove from list"
                                >
                                    <FiX />
                                </button>
                                <div className="anca">
                                    <img
                                        src={p.images.jpg.image_url}
                                        alt={p.title}
                                        className="aim"
                                    />
                                    <div className="adet">
                                        <h3 className="at">{p.title}</h3>
                                        <p className="as">Source: {p.source}</p>
                                        <p className="asc">Score: {p.score}</p>
                                        <p className="ae">Episodes: {p.episodes}</p>
                                        <p className="ae">rating: {p.rating}</p>

                                        <Link to={`/plusinfo/${p.mal_id}`} onClick={() => dis(add2(p))}>
                                            <button className="btn2">plus d'information</button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    )
}

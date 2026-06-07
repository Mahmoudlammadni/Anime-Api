import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add2, remove } from "../redux/action";
import { useTheme } from '../context/ThemeContext';
import { FiHeart, FiX } from "react-icons/fi";
import "../styles/style.css"

export default function MyList() {
    const { t } = useTheme();
    const my_list = useSelector(data => data.mylist)
    const dis = useDispatch()
    const navigate = useNavigate()

    if (my_list.length === 0) {
        return (
            <div className="anime-app">
                <h1 className="title">{t('myList')}</h1>
                <div className="empty-state">
                    <div className="empty-state-icon"><FiHeart /></div>
                    <h3>{t('emptyList')}</h3>
                    <p>Click the "Add to List" button on any anime to save it here</p>
                </div>
            </div>
        );
    }

    return (
        <div className="anime-app">
            <h1 className="title">{t('myList')} ({my_list.length})</h1>
            <div className="anime-grid">
                {
                    my_list.map((p) => (
                        <div
                            className="pp"
                            key={p.mal_id}
                            style={{ position: 'relative', cursor: 'pointer' }}
                            onClick={() => navigate(`/anime/${p.mal_id}`)}
                        >
                            <button
                                className="remove-btn"
                                onClick={(e) => { e.stopPropagation(); dis(remove(p)); }}
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
                                    <p className="as">{t('source')}: {p.source}</p>
                                    <p className="asc">{t('score')}: {p.score}</p>
                                    <p className="ae">{t('episodes')}: {p.episodes}</p>
                                    <p className="ae">{t('rating')}: {p.rating}</p>

                                    <button
                                        className="btn2"
                                        onClick={(e) => { e.stopPropagation(); dis(add2(p)); navigate(`/anime/${p.mal_id}`); }}
                                    >
                                        {t('moreInfo')}
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

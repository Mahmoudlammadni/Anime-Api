import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { remove } from "../redux/action";
import { useTheme } from '../context/ThemeContext';
import { FiHeart } from "react-icons/fi";
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
                            className="latest-card"
                            key={p.mal_id}
                            onClick={() => navigate(`/anime/${p.mal_id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="latest-img-wrap">
                                <img
                                    src={p.images?.jpg?.image_url}
                                    alt={p.title}
                                    className="latest-img"
                                />
                                <button
                                    className="latest-fav in-list"
                                    onClick={(e) => { e.stopPropagation(); dis(remove(p)); }}
                                    title={t('remove')}
                                >
                                    <FiHeart />
                                </button>
                            </div>
                            <div className="latest-info">
                                <h3 className="latest-title">{p.title}</h3>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/action";
import { FiAlertCircle, FiInbox, FiHeart } from "react-icons/fi";
import { animeService } from "../services/jikanApi";
import { useTheme } from '../context/ThemeContext';
import "../styles/style.css";

const MAX_ANIME = 25;

export default function Latest() {
  const { t } = useTheme();
  const navigate = useNavigate();
  const dis = useDispatch();
  const myList = useSelector((data) => data.mylist);
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    animeService.getTop("airing")
      .then((d) => {
        setAnimeList((d.data || []).slice(0, MAX_ANIME));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="anime-app">
        <h1 className="title">{t('latest')}</h1>
        <div className="loading-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skeleton-image" />
              <div className="skeleton-text">
                <div className="skeleton skeleton-title" />
                <div className="skeleton skeleton-subtitle" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="anime-app">
        <h1 className="title">{t('latest')}</h1>
        <div className="error-state">
          <div className="error-state-icon"><FiAlertCircle /></div>
          <h3>{t('failedToLoad')}</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (animeList.length === 0) {
    return (
      <div className="anime-app">
        <h1 className="title">{t('latest')}</h1>
        <div className="empty-state">
          <div className="empty-state-icon"><FiInbox /></div>
          <h3>{t('noResults')}</h3>
          <p>No airing anime found at this time</p>
        </div>
      </div>
    );
  }

  return (
    <div className="anime-app">
      <h1 className="title">{t('latest')}</h1>
      <div className="anime-grid">
        {animeList.map((anime) => {
          const inList = myList.some((item) => item.mal_id === anime.mal_id);
          return (
            <div
              className="latest-card"
              key={anime.mal_id}
              onClick={() => navigate(`/anime/${anime.mal_id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="latest-img-wrap">
                <img
                  src={anime.images?.jpg?.image_url}
                  alt={anime.title}
                  className="latest-img"
                />
                <button
                  className={`latest-fav${inList ? ' in-list' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (inList) {
                      dis(remove(anime));
                    } else {
                      dis(add(anime));
                    }
                  }}
                  title={inList ? t('inList') : t('addToList')}
                >
                  <FiHeart />
                </button>
              </div>
              <div className="latest-info">
                <h3 className="latest-title">{anime.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
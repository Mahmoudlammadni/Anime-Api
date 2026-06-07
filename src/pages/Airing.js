import { useState, useEffect } from "react";
import { FiAlertCircle, FiInbox } from "react-icons/fi";
import { animeService } from "../services/jikanApi";
import { useTheme } from '../context/ThemeContext';
import AnimeCard from "../components/AnimeCard";

export default function Airing() {
  const { t } = useTheme();
  const [anime, setanime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    animeService.getTop('airing')
      .then((d) => {
        setanime(d.data || []);
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
        <h1 className="title">{t('airingNow')}</h1>
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
        <h1 className="title">{t('airingNow')}</h1>
        <div className="error-state">
          <div className="error-state-icon"><FiAlertCircle /></div>
          <h3>{t('failedToLoad')}</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

 

  return (
    <div className="anime-app">
      <h1 className="title">{t('airingNow')}</h1>
      {anime.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><FiInbox /></div>
          <h3>{t('noAired')}</h3>
          <p>Check back later for new releases</p>
        </div>
      ) : (
        <div className="anime-grid">
          {anime.map((p) => (
            <AnimeCard anime={p} key={p.mal_id} />
          ))}
        </div>
      )}
    </div>
  );
}

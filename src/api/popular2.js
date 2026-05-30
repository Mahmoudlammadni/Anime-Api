import { useState, useEffect } from "react";
import { FiAlertCircle, FiInbox } from "react-icons/fi";
import { animeService } from "./jikanApi";
import { useTheme } from './ThemeContext';
import AffAnime from "./affichage";

export default function Popular2() {
  const { t } = useTheme();
  const [anime, setanime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    animeService.getTop('bypopularity')
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
        <h1 className="title">{t('popularNow')}</h1>
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
        <h1 className="title">{t('popularNow')}</h1>
        <div className="error-state">
          <div className="error-state-icon"><FiAlertCircle /></div>
          <h3>{t('failedToLoad')}</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const filtered = anime.filter(
    (o) =>
      o.rating &&
      o.rating !== "R - 17+ (violence & profanity)" &&
      o.rating !== "R+ - Mild Nudity" &&
      o.rating !== "Rx - Hentai" &&
      o.rating !== "OVA"
  );

  return (
    <div className="anime-app">
      <h1 className="title">{t('popularNow')}</h1>
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><FiInbox /></div>
          <h3>{t('noResults')}</h3>
          <p>Try again later</p>
        </div>
      ) : (
        <div className="anime-grid">
          {filtered.map((p) => (
            <AffAnime anime={p} key={p.mal_id} />
          ))}
        </div>
      )}
    </div>
  );
}

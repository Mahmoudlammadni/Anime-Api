import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiClock, FiFilm, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { animeService } from './jikanApi';
import { useTheme } from './ThemeContext';
import { translateText } from './translate';
import './style.css';

export default function AnimeDetails() {
  const { id } = useParams();
  const { t, lang } = useTheme();
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [staff, setStaff] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [translatedSynopsis, setTranslatedSynopsis] = useState(null);
  const [translatingSynopsis, setTranslatingSynopsis] = useState(false);
  const [translatedBg, setTranslatedBg] = useState(null);
  const [translatingBg, setTranslatingBg] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTranslatedSynopsis(null);
    setTranslatedBg(null);

    Promise.all([
      animeService.getDetails(id),
      animeService.getCharacters(id),
      animeService.getStaff(id),
      animeService.getRecommendations(id),
    ])
      .then(([animeRes, charRes, staffRes, recRes]) => {
        if (!animeRes.data) throw new Error('Anime not found');
        setAnime(animeRes.data);
        setCharacters(charRes.data || []);
        setStaff(staffRes.data || []);
        setRecommendations(recRes.data?.slice(0, 12) || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleTranslateSynopsis = async () => {
    if (!anime?.synopsis || translatingSynopsis || translatedSynopsis) return;
    setTranslatingSynopsis(true);
    const result = await translateText(anime.synopsis, lang);
    setTranslatedSynopsis(result);
    setTranslatingSynopsis(false);
  };

  const handleTranslateBg = async () => {
    if (!anime?.background || translatingBg || translatedBg) return;
    setTranslatingBg(true);
    const result = await translateText(anime.background, lang);
    setTranslatedBg(result);
    setTranslatingBg(false);
  };

  if (loading) {
    return (
      <div className="details-page">
        <div className="details-hero-skeleton">
          <div className="skeleton skeleton-hero" />
        </div>
        <div className="anime-app">
          <div className="skeleton skeleton-title-bar" />
          <div className="skeleton skeleton-text-block" />
          <div className="skeleton skeleton-text-block" />
          <div className="details-section">
            <div className="skeleton skeleton-section-title" />
            <div className="characters-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton skeleton-character-card" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const isRateLimit = error.includes('429');
    return (
      <div className="details-page">
        <div className="anime-app">
          <Link to="/" className="back-link"><FiArrowLeft /> {t('backToHome')}</Link>
          <div className="error-state">
            <div className="error-state-icon"><FiAlertCircle /></div>
            <h3>{isRateLimit ? t('tooManyRequests') : t('failedToLoad')}</h3>
            <p>
              {isRateLimit
                ? t('rateLimitMsg')
                : error}
            </p>
            <button className="btn" onClick={() => window.location.reload()} style={{ marginTop: 16 }}>
              {t('tryAgain')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!anime) return null;

  const bannerUrl = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;
  const trailer = anime.trailer;

  const formatStatus = (status) => {
    if (!status) return t('unknown');
    return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
  };

  const getSeasonYear = () => {
    const parts = [];
    if (anime.season) parts.push(anime.season.charAt(0).toUpperCase() + anime.season.slice(1));
    if (anime.year) parts.push(anime.year);
    return parts.length ? parts.join(' ') : null;
  };

  return (
    <div className="details-page">
      <div
        className="details-hero"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      >
        <div className="details-hero-overlay" />
        <div className="details-hero-content">
          <Link to="/" className="back-link"><FiArrowLeft /> {t('back')}</Link>
          <div className="details-hero-info">
            <h1 className="details-hero-title">{anime.title}</h1>
            {anime.title_japanese && (
              <p className="details-hero-jp">{anime.title_japanese}</p>
            )}
            {anime.title_english && anime.title_english !== anime.title && (
              <p className="details-hero-en">{anime.title_english}</p>
            )}
            <div className="details-hero-meta">
              {anime.score && (
                <span className="meta-badge score">
                  <FiStar /> {anime.score}
                </span>
              )}
              {anime.episodes && (
                <span className="meta-badge">
                  <FiFilm /> {anime.episodes} eps
                </span>
              )}
              {anime.status && (
                <span className="meta-badge">
                  <FiClock /> {formatStatus(anime.status)}
                </span>
              )}
              {getSeasonYear() && (
                <span className="meta-badge">{getSeasonYear()}</span>
              )}
              {anime.type && (
                <span className="meta-badge">{anime.type}</span>
              )}
            </div>
            {anime.genres?.length > 0 && (
              <div className="details-hero-genres">
                {anime.genres.map((g) => (
                  <span key={g.mal_id} className="genre-tag">{g.name}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="anime-app">
        <div className="details-body">
          <div className="details-main">
            <section className="details-section">
              <h2>{t('synopsis')}</h2>
              <p className="details-synopsis">{translatedSynopsis || anime.synopsis || t('noSynopsis')}</p>
              {translatedSynopsis && (
                <button className="trans-btn" onClick={() => setTranslatedSynopsis(null)}>
                  {t('original')}
                </button>
              )}
              {!translatedSynopsis && anime.synopsis && lang !== 'en' && (
                <button className="trans-btn" onClick={handleTranslateSynopsis} disabled={translatingSynopsis}>
                  {translatingSynopsis ? '...' : t('translate')}
                </button>
              )}
              {anime.background && (
                <>
                  <h3>{t('background')}</h3>
                  <p className="details-background">{translatedBg || anime.background}</p>
                  {translatedBg && (
                    <button className="trans-btn" onClick={() => setTranslatedBg(null)}>
                      {t('original')}
                    </button>
                  )}
                  {!translatedBg && lang !== 'en' && (
                    <button className="trans-btn" onClick={handleTranslateBg} disabled={translatingBg}>
                      {translatingBg ? '...' : t('translate')}
                    </button>
                  )}
                </>
              )}
            </section>

            <div className="details-info-grid">
              {anime.rating && (
                <div className="info-item">
                  <strong>{t('rating')}</strong>
                  <span>{anime.rating}</span>
                </div>
              )}
              {anime.source && (
                <div className="info-item">
                  <strong>{t('source')}</strong>
                  <span>{anime.source}</span>
                </div>
              )}
              {anime.duration && (
                <div className="info-item">
                  <strong>{t('duration')}</strong>
                  <span>{anime.duration}</span>
                </div>
              )}
              {(anime.studios?.length > 0) && (
                <div className="info-item">
                  <strong>{t('studios')}</strong>
                  <span>{anime.studios.map((s) => s.name).join(', ')}</span>
                </div>
              )}
              {(anime.themes?.length > 0 || anime.demographics?.length > 0) && (
                <div className="info-item">
                  <strong>{t('themes')}</strong>
                  <span>
                    {[...(anime.themes || []), ...(anime.demographics || [])]
                      .map((t) => t.name)
                      .join(', ')}
                  </span>
                </div>
              )}
            </div>

            {trailer?.embed_url && (
              <section className="details-section">
                <h2>{t('trailer')}</h2>
                <div className="trailer-wrapper">
                  <iframe
                    src={trailer.embed_url}
                    title="Anime Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </section>
            )}

            {characters.length > 0 && (
              <section className="details-section">
                <h2>{t('characters')} ({characters.length})</h2>
                <div className="characters-scroll">
                  {characters.map((char) => (
                    <div key={char.character.mal_id} className="character-card">
                      <img
                        src={char.character.images?.jpg?.image_url}
                        alt={char.character.name}
                        className="character-image"
                      />
                      <div className="character-info">
                        <p className="character-name">{char.character.name}</p>
                        <p className="character-role">{char.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {staff.length > 0 && (
              <section className="details-section">
                <h2>{t('staff')} ({staff.length})</h2>
                <div className="staff-grid">
                  {staff.slice(0, 20).map((person, i) => (
                    <div key={`${person.person.mal_id}-${i}`} className="staff-card">
                      <img
                        src={person.person.images?.jpg?.image_url}
                        alt={person.person.name}
                        className="staff-image"
                      />
                      <div className="staff-info">
                        <p className="staff-name">{person.person.name}</p>
                        <p className="staff-role">
                          {person.positions?.slice(0, 2).join(', ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {recommendations.length > 0 && (
              <section className="details-section">
                <h2>{t('youMayAlsoLike')}</h2>
                <div className="recommendations-scroll">
                  {recommendations.map((rec) => {
                    const entry = rec.entry;
                    return (
                      <Link
                        to={`/anime/${entry.mal_id}`}
                        key={entry.mal_id}
                        className="rec-card"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <img
                          src={entry.images?.jpg?.image_url}
                          alt={entry.title}
                          className="rec-image"
                        />
                        <p className="rec-title">{entry.title}</p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

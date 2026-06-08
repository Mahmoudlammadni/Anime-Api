import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import AnimeCard from '../components/AnimeCard';
import '../styles/style.css';

export default function Home(props) {
    const { t } = useTheme();
    const [filters, setFilters] = useState({
        genre: '',
        rating: '',
        score: '',
        type: '',
        search: '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };
    const filteredAnime = props.animeData.filter(anime => {
        return (
            (filters.genre ? anime.genres?.some(g => g.name === filters.genre) : true) &&
            (filters.rating ? anime.rating?.includes(filters.rating) : true) &&
            (filters.score ? anime.score >= filters.score : true) &&
            (filters.type ? anime.type === filters.type : true) &&
            (filters.search ? anime.title.toLowerCase().includes(filters.search.toLowerCase()) : true)
        );
    });

    

    return (
        <div className="anime-app">
            <div className="hero-section">
                <h1 className="hero-title">{t('discover')}</h1>
                <p className="hero-subtitle">{t('heroSubtitle')}</p>
            </div>

            <div className="category-nav">
                <Link to={'/pop'}><button className='popular'>{t('popular')}</button></Link>
                <Link to={'/ar'}><button className='ar'>{t('airing')}</button></Link>
                <Link to={'/up'}><button className='up'>{t('upcoming')}</button></Link>
            </div>

            <div className="filter-container">
                <input
                    type="text"
                    placeholder={t('search')}
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    className="search-bar"
                />

                <div className="filters">
                    <label>
                        {t('genreLabel')}
                        <select name="genre" onChange={handleFilterChange}>
                            <option value="">{t('all')}</option>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Drama">Drama</option>
                        </select>
                    </label>

                    <label>
                        {t('ratingLabel')}
                        <select name="rating" onChange={handleFilterChange}>
                            <option value="">{t('all')}</option>
                            <option value="PG-13">PG-13</option>
                            <option value="R - 17+">R - 17+</option>
                        </select>
                    </label>

                    <label>
                        {t('scoreLabel')}
                        <select name="score" onChange={handleFilterChange}>
                            <option value="">{t('all')}</option>
                            <option value="8">8+</option>
                            <option value="9">9+</option>
                        </select>
                    </label>

                    <label>
                        {t('typeLabel')}
                        <select name="type" onChange={handleFilterChange}>
                            <option value="">{t('all')}</option>
                            <option value="TV">TV</option>
                            <option value="Movie">Movie</option>
                        </select>
                    </label>
                </div>
            </div>

            {props.animeData.length === 0 ? (
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
            ) : filteredAnime.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon"><FiSearch /></div>
                    <h3>{t('noResults')}</h3>
                    <p>{t('tryAdjusting')}</p>
                </div>
            ) : (
                <div className="anime-grid">
                    {filteredAnime.map((anime) => (
                        <AnimeCard anime={anime} key={anime.mal_id} />
                    ))}
                </div>
            )}
        </div>
    );
}

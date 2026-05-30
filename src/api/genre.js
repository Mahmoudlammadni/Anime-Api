import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useTheme } from './ThemeContext';
import './style.css';

export default function Genre_an(props) {
    const { t } = useTheme();
    const navigate = useNavigate()
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
            (filters.genre ? anime.genres.some(g => g.name === filters.genre) : true) &&
            (filters.rating ? anime.rating.includes(filters.rating) : true) &&
            (filters.score ? anime.score >= filters.score : true) &&
            (filters.type ? anime.type === filters.type : true) &&
            (filters.search ? anime.title.toLowerCase().includes(filters.search.toLowerCase()) : true)
        );
    });

    const filteredList = filteredAnime.filter(
        (o) => o.rating !== "R - 17+ (violence & profanity)" && o.rating !== "R+ - Mild Nudity"
    );

    return (
        <div className="anime-app">
            <h1 className="title">{t('selectGenre')}</h1>

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
                        Genre:
                        <select name="genre" onChange={handleFilterChange}>
                            <option value="">All</option>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Drama">Drama</option>
                        </select>
                    </label>

                    <label>
                        Rating:
                        <select name="rating" onChange={handleFilterChange}>
                            <option value="">All</option>
                            <option value="PG-13">PG-13</option>
                            <option value="R - 17+">R - 17+</option>
                        </select>
                    </label>

                    <label>
                        Score:
                        <select name="score" onChange={handleFilterChange}>
                            <option value="">All</option>
                            <option value="8">8+</option>
                            <option value="9">9+</option>
                        </select>
                    </label>

                    <label>
                        Type:
                        <select name="type" onChange={handleFilterChange}>
                            <option value="">All</option>
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
            ) : filteredList.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon"><FiSearch /></div>
                    <h3>{t('noResults')}</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            ) : (
                <div className="anime-grid">
                    {filteredList.map(anime => (
                        <div key={anime.mal_id} className="anime-card" onClick={() => navigate(`/anime/${anime.mal_id}`)} style={{cursor: 'pointer'}}>
                            <img src={anime.images.jpg.image_url} alt={anime.title} className="anime-image" />
                            <div className="anime-details">
                                <h3 className="anime-title">{anime.title}</h3>
                                <p className="anime-genres">
                                    {anime.genres.map(g => g.name).join(', ')}
                                </p>
                                <p>{t('score')}: {anime.score}</p>
                                <p>{t('type')}: {anime.type}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

 
import React, { useState } from 'react';
import './style.css';

export default function Genre_an(props) {
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

    return (
        <div className="anime-app">
            <h1 className="title">Anime Search</h1>

            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Search anime..."
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
<div></div>
            <div className="anime-grid">
                {filteredAnime.filter((o)=>o.rating!=="R - 17+ (violence & profanity)"&& o.rating!=="R+ - Mild Nudity"
          ).map(anime => (
                    <div key={anime.mal_id} className="anime-card">
                        <img src={anime.images.jpg.image_url} alt={anime.title} className="anime-image" />
                        <div className="anime-details">
                            <h3 className="anime-title">{anime.title}</h3>
                            <p className="anime-genres">
                                {anime.genres.map(g => g.name).join(', ')}
                            </p>
                            <p>Score: {anime.score}</p>
                            <p>Type: {anime.type}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

  
 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add, add2 } from '../redux/action';
import { useTheme } from '../context/ThemeContext';
import { translateText } from '../utils/translate';
import { FiHeart } from 'react-icons/fi';
import '../styles/style.css'

export default function AnimeCard(props) {
    const dis = useDispatch()
    const navigate = useNavigate()
    const { t, lang } = useTheme()
    const myList = useSelector((data) => data.mylist)
    const id = props.anime.mal_id
    const [translatedTitle, setTranslatedTitle] = useState(null)
    const [translating, setTranslating] = useState(false)
    const isInList = myList.some((item) => item.mal_id === id)

    const handleTranslate = async (e) => {
        e.stopPropagation()
        if (translatedTitle || translating) return
        setTranslating(true)
        const result = await translateText(props.anime.title, lang)
        setTranslatedTitle(result)
        setTranslating(false)
    }

    const handleAddToList = (e) => {
        e.stopPropagation()
        if (!isInList) {
            dis(add(props.anime))
        }
    }

    return (
        <div className="pp" onClick={() => navigate(`/anime/${id}`)} style={{ cursor: 'pointer' }}>
            <div className="anca">
                <img
                    src={props.anime.images.jpg.image_url}
                    alt={props.anime.title}
                    className="aim"
                />
                <div className="adet">
                    <h3 className="at">{translatedTitle || props.anime.title}</h3>
                    {translatedTitle && (
                        <button className="trans-btn" onClick={(e) => { e.stopPropagation(); setTranslatedTitle(null) }}>
                            {t('original')}
                        </button>
                    )}
                    {!translatedTitle && lang !== 'en' && (
                        <button className="trans-btn" onClick={handleTranslate} disabled={translating}>
                            {translating ? '...' : t('translate')}
                        </button>
                    )}
                    <p className="as">{t('source')}: {props.anime.source}</p>
                    <p className="asc">{t('score')}: {props.anime.score}</p>
                    <p className="ae">{t('episodes')}: {props.anime.episodes}</p>
                    <p className="ae">{t('rating')}: {props.anime.rating}</p>

                    <div className="card-actions">
                        <button
                            className={`fav-btn${isInList ? ' in-list' : ''}`}
                            onClick={handleAddToList}
                            title={isInList ? 'In your list' : 'Add to list'}
                        >
                            <FiHeart />
                            {isInList ? t('inList') || 'In List' : t('addToList') || 'Add to List'}
                        </button>
                        <button className="btn2" onClick={(e) => { e.stopPropagation(); dis(add2(props.anime)); navigate(`/anime/${id}`); }}>
                            {t('moreInfo')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

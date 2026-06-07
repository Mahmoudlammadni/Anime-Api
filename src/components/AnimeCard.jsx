import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../redux/action';
import { useTheme } from '../context/ThemeContext';
import { translateText } from '../utils/translate';
import { FiHeart } from 'react-icons/fi';
import '../styles/style.css'

export default function AnimeCard(props) {
    const dis = useDispatch()
    const navigate = useNavigate()
    const { t, lang } = useTheme()
    const myList = useSelector((data) => data.mylist)
    const id = props.anime?.mal_id
    const [translatedTitle, setTranslatedTitle] = useState(null)
    const [translating, setTranslating] = useState(false)
    const isInList = myList.some((item) => item.mal_id === id)

    useEffect(() => {
        if (!props.anime?.title || lang === 'en') {
            setTranslatedTitle(null)
            setTranslating(false)
            return
        }
        setTranslating(true)
        translateText(props.anime.title, lang)
            .then(setTranslatedTitle)
            .catch(() => setTranslatedTitle(null))
            .finally(() => setTranslating(false))
    }, [lang, props.anime?.title])

    const handleToggleList = (e) => {
        e.stopPropagation()
        if (isInList) {
            dis(remove(props.anime))
        } else {
            dis(add(props.anime))
        }
    }

    const displayTitle = translating ? '...' : (translatedTitle || props.anime?.title)

    return (
        <div className="latest-card" onClick={() => navigate(`/anime/${id}`)} style={{ cursor: 'pointer' }}>
            <div className="latest-img-wrap">
                <img
                    src={props.anime?.images?.jpg?.image_url}
                    alt={props.anime?.title}
                    className="latest-img"
                />
                <button
                    className={`latest-fav${isInList ? ' in-list' : ''}`}
                    onClick={handleToggleList}
                    title={isInList ? t('inList') : t('addToList')}
                >
                    <FiHeart />
                </button>
            </div>
            <div className="latest-info">
                <h3 className="latest-title">{displayTitle}</h3>
                {translatedTitle && (
                    <button className="latest-orig" onClick={(e) => { e.stopPropagation(); setTranslatedTitle(null) }}>
                        {t('original')}
                    </button>
                )}
            </div>
        </div>
    );
}

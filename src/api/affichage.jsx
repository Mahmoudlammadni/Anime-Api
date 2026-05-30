import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add2 } from './action';
import { add } from './action';
import { useTheme } from './ThemeContext';
import { translateText } from './translate';
import './style.css'

export default function Aff_anime(props) {
    const dis = useDispatch()
    const navigate = useNavigate()
    const { t, lang } = useTheme()
    const id = props.anime.mal_id
    const [translatedTitle, setTranslatedTitle] = useState(null)
    const [translating, setTranslating] = useState(false)

    const handleTranslate = async (e) => {
        e.stopPropagation()
        if (translatedTitle || translating) return
        setTranslating(true)
        const result = await translateText(props.anime.title, lang)
        setTranslatedTitle(result)
        setTranslating(false)
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

                    <button className="btn2" onClick={(e) => { e.stopPropagation(); dis(add2(props.anime)); navigate(`/anime/${id}`); }}>{t('moreInfo')}</button>
                </div>

            </div>
            <button className="btn" onClick={(e) => { e.stopPropagation(); dis(add(props.anime)); }} style={{ width: "100%", display: "none" }}>click</button>

        </div>
    );
}

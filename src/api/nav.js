import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "./ThemeContext";
import './style.css';

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, lang, toggleTheme, setLang, t } = useTheme();

    return (
        <nav className="nav">
            <div className="nav-left">
                <h3>{t('brand')}</h3>
            </div>
            <button
                className="nav-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
            >
                {menuOpen ? <FiX /> : <FiMenu />}
            </button>
            <div className={`nav-center${menuOpen ? ' open' : ''}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>{t('home')}</Link>
                <Link to="/genres" onClick={() => setMenuOpen(false)}>{t('genres')}</Link>
                <Link to="/latest" onClick={() => setMenuOpen(false)}>{t('latest')}</Link>
                <Link to="/mylist" onClick={() => setMenuOpen(false)}>{t('myList')}</Link>
            </div>
            <div className="nav-right">
                <div className="lang-group">
                    <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>EN</button>
                    <button className={`lang-btn${lang === 'fr' ? ' active' : ''}`} onClick={() => setLang('fr')}>FR</button>
                    <button className={`lang-btn${lang === 'ar' ? ' active' : ''}`} onClick={() => setLang('ar')}>AR</button>
                </div>
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'dark' ? <FiSun /> : <FiMoon />}
                    {theme === 'dark' ? t('light') : t('dark')}
                </button>
            </div>
        </nav>
    );
}

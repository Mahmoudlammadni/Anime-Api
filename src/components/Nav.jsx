import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import '../styles/style.css';

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
                <div className="select-wrap">
                    <select
                        className="lang-select"
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                        aria-label={t('langLabel')}
                    >
                        <option value="en">EN</option>
                        <option value="fr">FR</option>
                        <option value="ar">AR</option>
                    </select>
                </div>
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'dark' ? <FiSun /> : <FiMoon />}
                    {theme === 'dark' ? t('light') : t('dark')}
                </button>
            </div>
        </nav>
    );
}

import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import "../styles/style.css";

export default function NotFound() {
  const { t } = useTheme();
  return (
    <div className="anime-app">
      <div className="empty-state" style={{ minHeight: '60vh' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--accent)', marginBottom: '8px' }}>404</h1>
        <h3>{t('pageNotFound')}</h3>
        <Link to="/" className="btn" style={{ marginTop: '20px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <FiHome /> {t('backToHome')}
        </Link>
      </div>
    </div>
  );
}
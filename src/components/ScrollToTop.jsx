import { useState, useEffect } from 'react';
import { FiChevronUp } from 'react-icons/fi';
import '../styles/style.css';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', toggle, { passive: true });
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-to-top${visible ? ' visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FiChevronUp />
    </button>
  );
}

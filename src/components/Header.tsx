import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ORG_NAME, PHONE_DISPLAY, PHONE_HREF } from '../data/constants';
import { useModal } from '../context/ModalContext';
import { ContactQuestionContent } from './InfoModals';
import './Header.css';

const NAV_LINKS = [
  { label: 'Поездки', hash: '#trips' },
  { label: 'О службе', hash: '#about' },
  { label: 'В первый раз', hash: '#first-time' },
  { label: 'Отзывы', hash: '#reviews' },
  { label: 'Контакты', hash: '#contacts' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useModal();

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" onClick={() => setMenuOpen(false)}>
          <svg viewBox="0 0 48 48" aria-hidden="true" className="site-header__flame">
            <path fill="#6E2A34" d="M24 3c7 7 13 16 13 24.5C37 35.9 31.2 42 24 42s-13-6.1-13-14.5C11 22 13 18 16 15c-1 5 1 8.5 4 9.5C19 15.5 20 9 24 3Z" />
            <path fill="#B4863C" d="M24.5 17c3 4.5 4.5 7.5 4.5 11a5 5 0 1 1-10 0c0-2 .8-3.8 1.8-5.3.2 2 1.3 3.6 2.7 4.1-1-3.7-.6-6.9 1-9.8Z" />
          </svg>
          <span>{ORG_NAME}</span>
        </Link>

        <nav className="site-header__nav site-header__nav--desktop" aria-label="Основная навигация">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.hash}>
                <Link to={`/${link.hash}`}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a href={PHONE_HREF} className="site-header__phone">
            {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            className="btn btn--primary btn--sm site-header__ask"
            onClick={() => openModal(<ContactQuestionContent />, 'Задать вопрос')}
          >
            Задать вопрос
          </button>
          <button
            type="button"
            className="site-header__burger"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`site-header__nav-mobile${menuOpen ? ' is-open' : ''}`}
        aria-label="Мобильная навигация"
        hidden={!menuOpen}
      >
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.hash}>
              <Link to={`/${link.hash}`} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a href={PHONE_HREF} className="site-header__phone site-header__phone--mobile">
          {PHONE_DISPLAY}
        </a>
      </nav>
    </header>
  );
}

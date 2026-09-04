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
          <img src={`${import.meta.env.BASE_URL}logo-mark.jpg`} alt="" className="site-header__logo" />
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

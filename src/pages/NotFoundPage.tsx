import { Link } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_HREF } from '../data/constants';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import './NotFoundPage.css';

export default function NotFoundPage() {
  useDocumentMeta('Страница не найдена — Неопалимая Купина', 'Запрошенная страница не найдена на сайте паломнической службы «Неопалимая Купина».');

  return (
    <main id="main-content" className="not-found">
      <div className="container not-found__inner">
        <p className="section-kicker">404</p>
        <h1>Страница не найдена</h1>
        <p>
          Похоже, такой страницы не существует — возможно, ссылка устарела или в адресе есть опечатка. Вернитесь на
          главную или позвоните нам, если искали конкретную поездку.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary">
            На главную
          </Link>
          <a href={PHONE_HREF} className="btn btn--secondary">
            Позвонить: {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </main>
  );
}

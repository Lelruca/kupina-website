import { Link } from 'react-router-dom';
import { ORG_NAME, PHONE_DISPLAY, PHONE_HREF, PICKUP_POINTS } from '../data/constants';
import { useModal } from '../context/ModalContext';
import { BookingRulesContent, PrivacyPolicyContent } from './InfoModals';
import './Footer.css';

const NAV_LINKS = [
  { label: 'Поездки', hash: '#trips' },
  { label: 'О службе', hash: '#about' },
  { label: 'В первый раз', hash: '#first-time' },
  { label: 'Отзывы', hash: '#reviews' },
  { label: 'Контакты', hash: '#contacts' },
];

export default function Footer() {
  const { openModal } = useModal();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <p className="site-footer__brand">{ORG_NAME}</p>
          <p className="site-footer__tagline">Паломническая служба</p>
          <a href={PHONE_HREF} className="site-footer__phone">
            {PHONE_DISPLAY}
          </a>
        </div>

        <div>
          <h3>Навигация</h3>
          <ul className="site-footer__list">
            {NAV_LINKS.map((link) => (
              <li key={link.hash}>
                <Link to={`/${link.hash}`}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Места посадки</h3>
          <ul className="site-footer__list">
            {PICKUP_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Документы</h3>
          <ul className="site-footer__list">
            <li>
              <button type="button" className="site-footer__link" onClick={() => openModal(<PrivacyPolicyContent />, 'Политика конфиденциальности')}>
                Политика конфиденциальности
              </button>
            </li>
            <li>
              <button type="button" className="site-footer__link" onClick={() => openModal(<BookingRulesContent />, 'Правила бронирования и возврата')}>
                Правила бронирования и возврата
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <p className="demo-callout site-footer__requisites">
          Реквизиты организации — заглушка для демонстрации: ООО/ИП «___», ИНН __________, ОГРН __________, юридический
          адрес: __________. Перед публикацией сайта нужно заменить на настоящие данные владельцев службы.
        </p>
        <p className="site-footer__copy">
          © {year} {ORG_NAME}. Демонстрационная версия сайта — материалы носят иллюстративный характер.
        </p>
      </div>
    </footer>
  );
}

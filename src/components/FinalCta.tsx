import { Link } from 'react-router-dom';
import { MESSENGER_PENDING_MESSAGE, PHONE_DISPLAY, PHONE_HREF } from '../data/constants';
import { useToast } from '../context/ToastContext';
import './FinalCta.css';

export default function FinalCta() {
  const { showToast } = useToast();

  return (
    <section className="section final-cta" id="contacts" aria-label="Контакты">
      <div className="container final-cta__inner">
        <p className="section-kicker final-cta__kicker">Начать проще, чем кажется</p>
        <h2 className="final-cta__title">Возможно, ваша первая поездка начинается здесь</h2>
        <a href={PHONE_HREF} className="final-cta__phone">
          {PHONE_DISPLAY}
        </a>
        <div className="final-cta__actions">
          <button type="button" className="btn btn--secondary final-cta__btn" onClick={() => showToast(MESSENGER_PENDING_MESSAGE)}>
            Написать в Telegram
          </button>
          <button type="button" className="btn btn--secondary final-cta__btn" onClick={() => showToast(MESSENGER_PENDING_MESSAGE)}>
            Написать в WhatsApp
          </button>
          <Link to="/#trips" className="btn btn--primary final-cta__btn">
            Посмотреть расписание
          </Link>
        </div>
      </div>
    </section>
  );
}

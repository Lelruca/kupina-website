import { Link } from 'react-router-dom';
import { PICKUP_POINTS } from '../data/constants';
import { useModal } from '../context/ModalContext';
import { ContactQuestionContent } from './InfoModals';
import PlaceholderPhoto from './PlaceholderPhoto';
import './Hero.css';

export default function Hero() {
  const { openModal } = useModal();

  return (
    <section className="hero" aria-label="Приветствие">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="section-kicker">Неопалимая Купина · паломническая служба</p>
          <h1 className="hero__title">Паломничество, в котором о вас заботятся</h1>
          <p className="hero__lead">
            Поездки по святым местам России с молитвой, содержательными экскурсиями и тёплым отношением к каждому.
            Для опытных паломников и тех, кто отправляется впервые.
          </p>
          <div className="hero__actions">
            <Link to="/#trips" className="btn btn--primary">
              Выбрать поездку
            </Link>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => openModal(<ContactQuestionContent />, 'Задать вопрос')}
            >
              Задать вопрос
            </button>
          </div>
          <p className="hero__pickup">Посадка: {PICKUP_POINTS.join(' · ')}</p>
        </div>
        <div className="hero__media">
          <PlaceholderPhoto category="monastery" alt="Демонстрационное фото: монастырь в утреннем свете" className="hero__photo" />
        </div>
      </div>
    </section>
  );
}

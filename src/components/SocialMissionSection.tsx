import { useModal } from '../context/ModalContext';
import { SocialMissionContent } from './InfoModals';
import Photo from './Photo';
import './SocialMissionSection.css';

export default function SocialMissionSection() {
  const { openModal } = useModal();

  return (
    <section className="section section--alt social-mission" aria-label="Социальная миссия">
      <div className="container social-mission__inner">
        <div className="social-mission__media">
          <Photo
            src="/photos/social-group.jpg"
            category="group"
            alt="Паломническая группа у Коломенского кремля. Фото из архива поездок службы"
            className="social-mission__photo"
          />
        </div>
        <div className="social-mission__text">
          <p className="section-kicker">Социальная миссия</p>
          <h2 className="section-title">Паломничество, доступное тем, кому оно особенно нужно</h2>
          <p>
            Мы хотим, чтобы поездка была по силам не только тем, кто может оплатить её без раздумий, но и тем, кому
            эта дорога особенно нужна — но не всегда по средствам.
          </p>
          <button
            type="button"
            className="btn btn--pine"
            onClick={() => openModal(<SocialMissionContent />, 'Паломничество, доступное каждому')}
          >
            Узнать подробнее
          </button>
        </div>
      </div>
    </section>
  );
}

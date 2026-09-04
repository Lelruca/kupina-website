import { Link, Navigate, useParams } from 'react-router-dom';
import { getTripBySlug } from '../data/trips';
import { globalFaq } from '../data/content';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useModal } from '../context/ModalContext';
import { formatPrice, seatsLabel } from '../utils/format';
import BookingForm from '../components/BookingForm';
import { NoDateContent } from '../components/InfoModals';
import Photo from '../components/Photo';
import Accordion from '../components/Accordion';
import './TripDetailPage.css';

export default function TripDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const trip = slug ? getTripBySlug(slug) : undefined;
  const { openModal } = useModal();

  useDocumentMeta(
    trip ? `${trip.title} — Неопалимая Купина` : 'Поездка не найдена — Неопалимая Купина',
    trip ? trip.shortDescription : 'Запрошенная поездка не найдена.'
  );

  if (!trip) {
    return <Navigate to="/404" replace />;
  }

  const departure = trip.departures[0];
  const openBooking = () => openModal(<BookingForm tripTitle={trip.title} />, `Бронирование: ${trip.title}`);
  const openNoDate = () => openModal(<NoDateContent tripTitle={trip.title} />, `Даты поездки: ${trip.title}`);
  const openPrimaryAction = departure ? openBooking : openNoDate;

  return (
    <main id="main-content" className="trip-detail">
      <div className="container trip-detail__breadcrumb">
        <Link to="/#trips">← Все поездки</Link>
      </div>

      <section className="trip-detail__hero container">
        <Photo src={trip.photo} category={trip.photoCategory} alt={trip.photoAlt} className="trip-detail__photo" />
        <div className="trip-detail__intro">
          <h1>{trip.title}</h1>
          <p className="trip-detail__desc">{trip.shortDescription}</p>
          <dl className="trip-detail__facts">
            <div>
              <dt>Дата</dt>
              <dd className={departure ? 'demo-note' : 'trip-detail__date-pending'}>
                {departure ? departure.date : 'Уточняется'}
              </dd>
            </div>
            <div>
              <dt>Продолжительность</dt>
              <dd>{trip.duration}</dd>
            </div>
            <div>
              <dt>Цена</dt>
              <dd className="trip-detail__price">
                {formatPrice(trip.price)} <span>{trip.priceNote}</span>
              </dd>
            </div>
            <div>
              <dt>Свободные места</dt>
              <dd>{departure ? `Осталось ${seatsLabel(departure.seatsLeft)}` : 'Появятся вместе с датой'}</dd>
            </div>
            <div>
              <dt>Сопровождающий</dt>
              <dd>{trip.guide}</dd>
            </div>
            <div>
              <dt>Посадка</dt>
              <dd>{trip.pickupPoints.join(', ')}</dd>
            </div>
          </dl>
          {!departure && (
            <p className="trip-detail__no-date-note">
              Этот маршрут уже проводился и снова появится в расписании, но точная дата на ближайшие месяцы пока не
              назначена.
            </p>
          )}
          <button type="button" className="btn btn--primary btn--block" onClick={openPrimaryAction}>
            {departure ? 'Забронировать место' : 'Узнать о датах'}
          </button>
        </div>
      </section>

      <section className="container trip-detail__section">
        <h2>Программа по дням</h2>
        <ol className="trip-detail__program">
          {trip.program.map((day) => (
            <li key={day.title}>
              <h3>{day.title}</h3>
              <p>{day.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container trip-detail__section">
        <h2>Святыни поездки</h2>
        <ul className="trip-detail__pill-list">
          {trip.shrines.map((shrine) => (
            <li key={shrine}>{shrine}</li>
          ))}
        </ul>
      </section>

      <section className="container trip-detail__section">
        <h2>Богослужения</h2>
        <p>{trip.services}</p>
      </section>

      <section className="container trip-detail__grid-section">
        <div>
          <h2>Что входит в стоимость</h2>
          <ul className="trip-detail__check-list">
            {trip.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Дополнительные расходы</h2>
          <ul className="trip-detail__check-list trip-detail__check-list--minus">
            {trip.extraCosts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container trip-detail__grid-section trip-detail__grid-section--three">
        <div>
          <h2>Проживание</h2>
          <p>{trip.accommodation}</p>
        </div>
        <div>
          <h2>Питание</h2>
          <p>{trip.meals}</p>
        </div>
        <div>
          <h2>Транспорт</h2>
          <p>{trip.transport}</p>
        </div>
      </section>

      <section className="container trip-detail__section">
        <h2>Уровень физической нагрузки</h2>
        <p>
          <span className="demo-note trip-detail__load-badge">{trip.physicalLoad}</span>
        </p>
        <p>{trip.physicalLoadNote}</p>
      </section>

      <section className="container trip-detail__section">
        <h2>Что взять с собой</h2>
        <ul className="trip-detail__check-list">
          {trip.packingList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="container trip-detail__section trip-detail__beginner">
        <h2>Если вы едете впервые</h2>
        <p>{trip.beginnerInfo}</p>
      </section>

      <section className="container trip-detail__section">
        <h2>Частые вопросы об этой поездке</h2>
        <Accordion items={trip.faq.length > 0 ? trip.faq : globalFaq.slice(0, 3)} namePrefix={`trip-faq-${trip.slug}`} />
      </section>

      <section className="container trip-detail__section">
        <h2>Условия отмены</h2>
        <p>{trip.cancellationPolicy}</p>
      </section>

      <section className="container trip-detail__cta">
        <p>{departure ? 'Готовы поехать?' : 'Хотите поехать, когда появится дата?'}</p>
        <button type="button" className="btn btn--primary" onClick={openPrimaryAction}>
          {departure ? 'Забронировать место' : 'Узнать о датах'}
        </button>
      </section>
    </main>
  );
}

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

  const hasDates = trip.departures.length > 0;
  const multiDate = trip.departures.length > 1;
  const anyAvailable = trip.departures.some((d) => d.seatsLeft > 0);
  const departure = trip.departures[0];

  const openBooking = () =>
    openModal(<BookingForm tripTitle={trip.title} departures={trip.departures} />, `Бронирование: ${trip.title}`);
  const openNoDate = () => openModal(<NoDateContent tripTitle={trip.title} />, `Даты поездки: ${trip.title}`);
  const openPrimaryAction = hasDates ? openBooking : openNoDate;
  const primaryActionLabel = !hasDates ? 'Узнать о датах' : anyAvailable ? 'Забронировать место' : 'Записаться в лист ожидания';
  const primaryActionClass = !hasDates || !anyAvailable ? 'btn--accent' : 'btn--primary';

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
              <dd className={hasDates ? 'demo-note' : 'trip-detail__value-pending'}>
                {!hasDates ? 'Уточняется' : multiDate ? trip.departures.map((d) => d.date).join(', ') : departure.date}
              </dd>
            </div>
            <div>
              <dt>Продолжительность</dt>
              <dd>{trip.duration}</dd>
            </div>
            <div>
              <dt>Цена</dt>
              {hasDates ? (
                <dd className="trip-detail__price">
                  {formatPrice(trip.price)} <span>{trip.priceNote}</span>
                </dd>
              ) : (
                <dd className="trip-detail__value-pending">Уточняется вместе с датой</dd>
              )}
            </div>
            <div>
              <dt>Свободные места</dt>
              <dd className={anyAvailable ? undefined : 'trip-detail__value-pending'}>
                {!hasDates
                  ? 'Появятся вместе с датой'
                  : multiDate
                    ? anyAvailable
                      ? 'Есть свободные места — выбор даты при бронировании'
                      : 'Мест нет ни на одну дату — лист ожидания'
                    : anyAvailable
                      ? `Осталось ${seatsLabel(departure.seatsLeft)}`
                      : 'Мест нет — лист ожидания'}
              </dd>
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
          {!hasDates && (
            <p className="trip-detail__no-date-note">
              Этот маршрут уже проводился и снова появится в расписании, но точная дата на ближайшие месяцы пока не
              назначена.
            </p>
          )}
          <button type="button" className={`btn ${primaryActionClass} btn--block`} onClick={openPrimaryAction}>
            {primaryActionLabel}
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
        <p>
          {!hasDates
            ? 'Хотите поехать, когда появится дата?'
            : anyAvailable
              ? 'Готовы поехать?'
              : 'Мест нет, но можно записаться в лист ожидания'}
        </p>
        <button type="button" className={`btn ${primaryActionClass}`} onClick={openPrimaryAction}>
          {primaryActionLabel}
        </button>
      </section>
    </main>
  );
}

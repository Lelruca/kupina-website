import { Link } from 'react-router-dom';
import type { Trip } from '../data/trips';
import { formatPrice, seatsLabel } from '../utils/format';
import { useModal } from '../context/ModalContext';
import BookingForm from './BookingForm';
import { NoDateContent } from './InfoModals';
import Photo from './Photo';
import './TripCard.css';

export default function TripCard({ trip }: { trip: Trip }) {
  const { openModal } = useModal();
  const departure = trip.departures[0];
  const lowSeats = departure ? departure.seatsLeft <= 3 : false;

  return (
    <article className={`trip-card${departure ? '' : ' trip-card--no-date'}`}>
      <div className="trip-card__media">
        <Photo src={trip.photo} category={trip.photoCategory} alt={trip.photoAlt} />
        <span className={`trip-card__date${departure ? ' demo-note' : ' trip-card__date--pending'}`}>
          {departure ? departure.date : 'Дата уточняется'}
        </span>
      </div>
      <div className="trip-card__body">
        <h3 className="trip-card__title">{trip.title}</h3>
        <p className="trip-card__desc">{trip.shortDescription}</p>

        <ul className="trip-card__tags">
          {trip.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <dl className="trip-card__meta">
          <div>
            <dt>Продолжительность</dt>
            <dd>{trip.duration}</dd>
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

        <div className="trip-card__footer">
          <div className="trip-card__price-row">
            <span className="trip-card__price">{formatPrice(trip.price)}</span>
            {departure ? (
              <span className={`trip-card__seats${lowSeats ? ' trip-card__seats--low' : ''}`}>
                Осталось {seatsLabel(departure.seatsLeft)}
              </span>
            ) : (
              <span className="trip-card__seats trip-card__seats--pending">Проводится периодически</span>
            )}
          </div>
          <div className="trip-card__actions">
            <Link to={`/trips/${trip.slug}`} className="btn btn--ghost btn--sm">
              Подробнее
            </Link>
            {departure ? (
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => openModal(<BookingForm tripTitle={trip.title} />, `Бронирование: ${trip.title}`)}
              >
                Забронировать
              </button>
            ) : (
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => openModal(<NoDateContent tripTitle={trip.title} />, `Даты поездки: ${trip.title}`)}
              >
                Узнать о датах
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

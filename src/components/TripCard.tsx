import { Link } from 'react-router-dom';
import type { Trip } from '../data/trips';
import { formatPrice, seatsLabel } from '../utils/format';
import { useModal } from '../context/ModalContext';
import BookingForm from './BookingForm';
import Photo from './Photo';
import './TripCard.css';

export default function TripCard({ trip }: { trip: Trip }) {
  const { openModal } = useModal();
  const lowSeats = trip.seatsLeft <= 3;

  return (
    <article className="trip-card">
      <div className="trip-card__media">
        <Photo src={trip.photo} category={trip.photoCategory} alt={trip.photoAlt} />
        <span className="trip-card__date demo-note">{trip.date}</span>
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
            <span className={`trip-card__seats${lowSeats ? ' trip-card__seats--low' : ''}`}>
              Осталось {seatsLabel(trip.seatsLeft)}
            </span>
          </div>
          <div className="trip-card__actions">
            <Link to={`/trips/${trip.slug}`} className="btn btn--ghost btn--sm">
              Подробнее
            </Link>
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={() => openModal(<BookingForm tripTitle={trip.title} />, `Бронирование: ${trip.title}`)}
            >
              Забронировать
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

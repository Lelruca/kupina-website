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
  const multiDate = trip.departures.length > 1;
  const anyAvailable = trip.departures.some((d) => d.seatsLeft > 0);
  const lowSeats = !multiDate && departure ? departure.seatsLeft > 0 && departure.seatsLeft <= 3 : false;
  const plentySeats = !multiDate && departure ? departure.seatsLeft >= 10 : false;

  const openBooking = () =>
    openModal(<BookingForm tripTitle={trip.title} departures={trip.departures} />, `Бронирование: ${trip.title}`);

  return (
    <article className={`trip-card${departure ? '' : ' trip-card--no-date'}`}>
      <div className="trip-card__media">
        <Photo src={trip.photo} category={trip.photoCategory} alt={trip.photoAlt} />
        {trip.departures.length > 0 ? (
          <div className="trip-card__dates">
            {trip.departures.map((d) => (
              <span key={d.date} className="trip-card__date demo-note">
                {d.date}
              </span>
            ))}
          </div>
        ) : (
          <div className="trip-card__dates">
            <span className="trip-card__date trip-card__date--pending">Дата уточняется</span>
          </div>
        )}
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
            {!departure ? (
              <span className="trip-card__seats trip-card__seats--pending">
                Цена и места — вместе с датой. Проводится периодически
              </span>
            ) : multiDate ? (
              <>
                <span className="trip-card__price">{formatPrice(trip.price)}</span>
                <span className={`trip-card__seats${anyAvailable ? '' : ' trip-card__seats--low'}`}>
                  {anyAvailable ? 'Несколько дат — выбор при бронировании' : 'Мест нет — лист ожидания'}
                </span>
              </>
            ) : (
              <>
                <span className="trip-card__price">{formatPrice(trip.price)}</span>
                <span
                  className={`trip-card__seats${!anyAvailable ? ' trip-card__seats--low' : lowSeats ? ' trip-card__seats--low' : plentySeats ? ' trip-card__seats--plenty' : ''}`}
                >
                  {anyAvailable ? `Осталось ${seatsLabel(departure.seatsLeft)}` : 'Мест нет'}
                </span>
              </>
            )}
          </div>
          <div className="trip-card__actions">
            <Link to={`/trips/${trip.slug}`} className="btn btn--ghost btn--sm">
              Подробнее
            </Link>
            {!departure ? (
              <button
                type="button"
                className="btn btn--accent btn--sm"
                onClick={() => openModal(<NoDateContent tripTitle={trip.title} />, `Даты поездки: ${trip.title}`)}
              >
                Узнать о датах
              </button>
            ) : anyAvailable ? (
              <button type="button" className="btn btn--primary btn--sm" onClick={openBooking}>
                Забронировать
              </button>
            ) : (
              <button type="button" className="btn btn--accent btn--sm" onClick={openBooking}>
                Лист ожидания
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

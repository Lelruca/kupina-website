import { useId, useState } from 'react';
import type { FormEvent } from 'react';
import type { TripDeparture } from '../data/trips';
import { BOOKING_DISABLED_MESSAGE, PHONE_DISPLAY, PHONE_HREF, PICKUP_POINTS } from '../data/constants';
import { seatsLabel } from '../utils/format';
import { useModal } from '../context/ModalContext';
import './BookingForm.css';

interface BookingFormProps {
  tripTitle?: string;
  /** Даты выезда маршрута. Если их больше одной, форма показывает выбор даты. */
  departures: TripDeparture[];
}

const CONTACT_METHODS = ['Телефонный звонок', 'WhatsApp', 'Telegram'] as const;

export default function BookingForm({ tripTitle, departures }: BookingFormProps) {
  const { closeModal } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const headingId = useId();
  // По умолчанию выбираем первую дату, на которую ещё есть места, а не обязательно самую раннюю.
  const defaultIndex = Math.max(
    departures.findIndex((d) => d.seatsLeft > 0),
    0
  );
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const selected = departures[selectedIndex];
  const isWaitlist = selected ? selected.seatsLeft <= 0 : false;
  const tripLabel = tripTitle ? `«${tripTitle}»${selected ? ` — ${selected.date}` : ''}` : '';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="booking-result">
        <h2 id={headingId} className="booking-title">
          Заявка не отправлена
        </h2>
        <p>{BOOKING_DISABLED_MESSAGE}</p>
        <div className="booking-result__actions">
          <a className="btn btn--primary" href={PHONE_HREF}>
            Позвонить: {PHONE_DISPLAY}
          </a>
          <button type="button" className="btn btn--ghost" onClick={closeModal}>
            Закрыть
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <h2 id={headingId} className="booking-title">
        {isWaitlist
          ? `Лист ожидания: поездка ${tripLabel || ''}`.trim()
          : tripTitle
            ? `Бронирование поездки ${tripLabel}`
            : 'Бронирование поездки'}
      </h2>
      <p className="demo-callout">
        {isWaitlist
          ? 'На эту дату мест уже нет. Демонстрационная форма: заявка в лист ожидания никуда не отправляется и не сохраняется. Если место освободится, служба свяжется с вами по указанному телефону.'
          : 'Демонстрационная форма: данные никуда не отправляются и не сохраняются.'}
      </p>

      {departures.length > 1 && (
        <fieldset className="booking-field">
          <legend>Дата поездки</legend>
          <div className="booking-radio-group booking-radio-group--stacked">
            {departures.map((d, index) => (
              <label key={d.date} className="booking-radio">
                <input
                  type="radio"
                  name="departureDate"
                  checked={index === selectedIndex}
                  onChange={() => setSelectedIndex(index)}
                />
                {d.date} — {d.seatsLeft <= 0 ? 'мест нет' : `осталось ${seatsLabel(d.seatsLeft)}`}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="booking-field">
        <label htmlFor="bf-name">Имя</label>
        <input id="bf-name" name="name" type="text" autoComplete="name" required placeholder="Как к вам обращаться" />
      </div>

      <div className="booking-field">
        <label htmlFor="bf-phone">Телефон</label>
        <input id="bf-phone" name="phone" type="tel" autoComplete="tel" required placeholder="+7 (___) ___-__-__" />
      </div>

      <fieldset className="booking-field">
        <legend>Удобный способ связи</legend>
        <div className="booking-radio-group">
          {CONTACT_METHODS.map((method) => (
            <label key={method} className="booking-radio">
              <input type="radio" name="contactMethod" value={method} defaultChecked={method === CONTACT_METHODS[0]} />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="booking-field">
        <label htmlFor="bf-people">Количество человек</label>
        <input id="bf-people" name="people" type="number" min={1} max={20} defaultValue={1} required />
      </div>

      <div className="booking-field">
        <label htmlFor="bf-pickup">Место посадки</label>
        <select id="bf-pickup" name="pickup" defaultValue={PICKUP_POINTS[0]} required>
          {PICKUP_POINTS.map((point) => (
            <option key={point} value={point}>
              {point}
            </option>
          ))}
        </select>
      </div>

      <div className="booking-field">
        <label htmlFor="bf-comment">Комментарий</label>
        <textarea id="bf-comment" name="comment" rows={3} placeholder="Например: едем вдвоём, нужна помощь с посадкой" />
      </div>

      <button type="submit" className={`btn ${isWaitlist ? 'btn--accent' : 'btn--primary'} btn--block`}>
        {isWaitlist ? 'Записаться в лист ожидания' : 'Отправить заявку'}
      </button>
    </form>
  );
}

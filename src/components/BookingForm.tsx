import { useId, useState } from 'react';
import type { FormEvent } from 'react';
import { BOOKING_DISABLED_MESSAGE, PHONE_DISPLAY, PHONE_HREF, PICKUP_POINTS } from '../data/constants';
import { useModal } from '../context/ModalContext';
import './BookingForm.css';

interface BookingFormProps {
  tripTitle?: string;
}

const CONTACT_METHODS = ['Телефонный звонок', 'WhatsApp', 'Telegram'] as const;

export default function BookingForm({ tripTitle }: BookingFormProps) {
  const { closeModal } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const headingId = useId();

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
        {tripTitle ? `Бронирование поездки «${tripTitle}»` : 'Бронирование поездки'}
      </h2>
      <p className="demo-callout">
        Демонстрационная форма: данные никуда не отправляются и не сохраняются.
      </p>

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

      <button type="submit" className="btn btn--primary btn--block">
        Отправить заявку
      </button>
    </form>
  );
}

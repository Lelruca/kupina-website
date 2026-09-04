import { useId, useState } from 'react';
import type { FormEvent } from 'react';
import { PHONE_DISPLAY, PHONE_HREF, REVIEW_DISABLED_MESSAGE } from '../data/constants';
import { useModal } from '../context/ModalContext';
import './BookingForm.css';

export default function ReviewForm() {
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
          Отзыв не отправлен
        </h2>
        <p>{REVIEW_DISABLED_MESSAGE}</p>
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
        Добавить отзыв
      </h2>
      <p className="demo-callout">
        Демонстрационная форма: данные никуда не отправляются и не сохраняются.
      </p>

      <div className="booking-field">
        <label htmlFor="rf-name">Имя</label>
        <input id="rf-name" name="name" type="text" autoComplete="name" required placeholder="Как подписать отзыв" />
      </div>

      <div className="booking-field">
        <label htmlFor="rf-trip">Поездка</label>
        <input id="rf-trip" name="trip" type="text" placeholder="Например: Дивеево" />
      </div>

      <div className="booking-field">
        <label htmlFor="rf-text">Текст отзыва</label>
        <textarea id="rf-text" name="text" rows={4} required placeholder="Расскажите о поездке" />
      </div>

      <button type="submit" className="btn btn--primary btn--block">
        Отправить отзыв
      </button>
    </form>
  );
}

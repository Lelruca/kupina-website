import { testimonials } from '../data/content';
import './TestimonialsSection.css';

export default function TestimonialsSection() {
  return (
    <section className="section section--alt" id="reviews" aria-label="Отзывы">
      <div className="container">
        <div className="section-head">
          <p className="section-kicker">Отзывы</p>
          <h2 className="section-title">Что говорят паломники</h2>
        </div>
        <ul className="testimonials-grid">
          {testimonials.map((item) => (
            <li key={item.quote} className="testimonial-card">
              <svg className="testimonial-card__quote" viewBox="0 0 32 24" aria-hidden="true">
                <path d="M0 24V14.4C0 6.4 4.8 1 12.8 0l1.6 4C9.6 5.2 7.2 8 6.8 12H14v12H0Zm18 0V14.4C18 6.4 22.8 1 30.8 0l1.6 4c-4.8 1.2-7.2 4-7.6 8H32v12H18Z" />
              </svg>
              <p className="testimonial-card__text">{item.quote}</p>
              <p className="testimonial-card__attribution">{item.attribution}</p>
            </li>
          ))}
        </ul>
        <p className="demo-callout testimonials-note">
          Демонстрационные сокращённые цитаты для иллюстрации. Перед публикацией сайта тексты и авторство нужно
          проверить и подтвердить с авторами.
        </p>
      </div>
    </section>
  );
}

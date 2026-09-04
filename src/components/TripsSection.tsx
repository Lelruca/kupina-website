import { useMemo, useState } from 'react';
import { CATEGORY_LABELS, trips, type TripCategory } from '../data/trips';
import TripCard from './TripCard';
import './TripsSection.css';

type FilterValue = 'all' | TripCategory;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'day', label: CATEGORY_LABELS.day },
  { value: 'weekend', label: CATEGORY_LABELS.weekend },
  { value: 'multiday', label: CATEGORY_LABELS.multiday },
  { value: 'first-time', label: CATEGORY_LABELS['first-time'] },
];

export default function TripsSection() {
  const [filter, setFilter] = useState<FilterValue>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? trips : trips.filter((trip) => trip.categories.includes(filter))),
    [filter]
  );

  return (
    <section className="section" id="trips" aria-label="Ближайшие поездки">
      <div className="container">
        <div className="section-head">
          <p className="section-kicker">Расписание</p>
          <h2 className="section-title">Ближайшие поездки</h2>
          <p className="section-lead">
            Демонстрационные даты ближайших маршрутов. Перед публикацией сайта расписание нужно свести с реальным
            планом поездок службы.
          </p>
        </div>

        <div className="trips-filters" role="group" aria-label="Фильтр поездок">
          {FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`trips-filters__btn${filter === item.value ? ' is-active' : ''}`}
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <ul className="trips-grid">
            {filtered.map((trip) => (
              <li key={trip.slug}>
                <TripCard trip={trip} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="trips-empty">
            Поездок в этой категории пока нет. Позвоните нам — подскажем ближайшую подходящую дату.
          </p>
        )}
      </div>
    </section>
  );
}

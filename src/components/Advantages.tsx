import { advantages } from '../data/content';
import './Advantages.css';

const ICONS = [
  <path key="prayer" d="M24 4c1 5 3 8 7 10-4 2-6 5-7 10-1-5-3-8-7-10 4-2 6-5 7-10Zm0 20c.7 3.3 2 5.3 4.6 6.6C26 31.9 24.7 33.9 24 37.2c-.7-3.3-2-5.3-4.6-6.6 2.6-1.3 3.9-3.3 4.6-6.6Z" />,
  <path key="care" d="M24 10c-6 0-14 5-14 15 0 9 8 15.5 14 19.6 6-4.1 14-10.6 14-19.6 0-10-8-15-14-15Zm0 6a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 26c-4-2.9-9-7.4-9-13 0-1.9.6-3.4 1.6-4.6C18.2 27 21 29 24 29s5.8-2 7.4-4.6c1 1.2 1.6 2.7 1.6 4.6 0 5.6-5 10.1-9 13Z" />,
  <path key="guide" d="M24 6a7 7 0 1 1 0 14 7 7 0 0 1 0-14ZM10 40c0-8.3 6.5-15 14-15s14 6.7 14 15v2H10v-2Zm26-15c4.6 1.4 8 6 8 11.3V38h-6" />,
  <path key="first" d="M24 4 6 12v10c0 12 7.5 20.9 18 22 10.5-1.1 18-10 18-22V12L24 4Zm0 6.4 12 5.4v6.2c0 8.7-5.1 15.3-12 16.6-6.9-1.3-12-7.9-12-16.6v-6.2l12-5.4Zm-2 10.4-3.5-3.5-2.5 2.5L22 25.9l9-9-2.5-2.5L22 20.8Z" />,
];

export default function Advantages() {
  return (
    <section className="section advantages" aria-label="Преимущества">
      <div className="container">
        <ul className="advantages__grid">
          {advantages.map((item, index) => (
            <li key={item.title} className="advantages__card">
              <svg className="advantages__icon" viewBox="0 0 48 48" aria-hidden="true">
                {ICONS[index]}
              </svg>
              <h3 className="advantages__title">{item.title}</h3>
              <p className="advantages__desc">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

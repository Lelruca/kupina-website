import Photo from './Photo';
import './MissionSection.css';

const POINTS = [
  {
    title: 'Молитва',
    text: 'Каждая поездка начинается и заканчивается молитвой. Это не формальность, а то, что задаёт настроение всему пути.',
  },
  {
    title: 'Богослужения',
    text: 'Мы стараемся успеть на службы там, где это возможно — но никогда не превращаем это в обязанность для тех, кто пока не готов.',
  },
  {
    title: 'Время для тишины',
    text: 'В программе всегда есть минуты, когда не нужно никуда спешить и ни на что отвлекаться — просто побыть в этом месте.',
  },
  {
    title: 'Интересные экскурсии',
    text: 'История, архитектура, жития святых — рассказываем живо, а не читаем справку по бумажке.',
  },
  {
    title: 'Внимание к каждому',
    text: 'Мы стараемся замечать, кому нужна помощь, кто устал, а кто хочет о чём-то спросить наедине.',
  },
];

export default function MissionSection() {
  return (
    <section className="section section--alt mission" id="about" aria-label="О службе">
      <div className="container mission__inner">
        <div className="mission__text">
          <p className="section-kicker">О службе</p>
          <h2 className="section-title">Здесь начинается не экскурсия, а паломничество</h2>
          <ul className="mission__list">
            {POINTS.map((point) => (
              <li key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mission__media">
          <Photo
            src="/photos/mission-care.jpg"
            category="care"
            alt="Паломницы обнимаются у монастыря. Фото из архива поездок службы"
            className="mission__photo"
          />
        </div>
      </div>
    </section>
  );
}

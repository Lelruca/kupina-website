import PlaceholderPhoto from './PlaceholderPhoto';
import './LeaderSection.css';

export default function LeaderSection() {
  return (
    <section className="section leader" aria-label="Сопровождающий">
      <div className="container leader__inner">
        <div className="leader__media">
          <PlaceholderPhoto category="portrait" alt="Демонстрационное фото: Ольга Александровна" className="leader__photo" />
        </div>
        <div className="leader__text">
          <p className="section-kicker">Знакомство</p>
          <h2 className="section-title">Ваш сопровождающий — не администратор, а человек рядом</h2>
          <p className="leader__name">Ольга Александровна</p>
          <p>
            Сопровождает паломнические группы уже много лет и точно знает, что первая поездка — это волнительно.
            Встречает группу на остановке, помогает разместиться, рассказывает, что будет происходить дальше, и
            остаётся на связи весь путь — от посадки в автобус до возвращения домой.
          </p>
          <p>
            Для неё паломничество — это не экскурсионная программа по галочкам, а живое отношение к каждому человеку
            в группе: от тех, кто едет уже в десятый раз, до тех, кто впервые переступает порог монастыря.
          </p>
          <p className="demo-callout">
            Фотография и биография на этой странице — демонстрационные. Перед публикацией сайта их нужно заменить на
            подтверждённые владельцами службы.
          </p>
        </div>
      </div>
    </section>
  );
}

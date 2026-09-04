import { galleryItems } from '../data/content';
import PlaceholderPhoto from './PlaceholderPhoto';
import './GallerySection.css';

export default function GallerySection() {
  return (
    <section className="section" aria-label="Галерея поездок">
      <div className="container">
        <div className="section-head">
          <p className="section-kicker">Из поездок</p>
          <h2 className="section-title">Галерея</h2>
          <p className="section-lead">
            Монастыри, дорога, природа, паломники, совместная трапеза и моменты взаимопомощи — то, из чего складывается
            каждая поездка.
          </p>
        </div>
        <ul className="gallery-grid">
          {galleryItems.map((item, index) => (
            <li key={`${item.category}-${index}`} className={item.featured ? 'gallery-grid__item--featured' : ''}>
              <PlaceholderPhoto category={item.category} alt={item.alt} className="gallery-photo" />
              <span className="gallery-caption">{item.caption}</span>
            </li>
          ))}
        </ul>
        <p className="demo-callout gallery-note">
          Все фотографии на этой странице — демонстрационные заглушки. Перед публикацией сайта их нужно заменить на
          настоящие фотографии службы.
        </p>
      </div>
    </section>
  );
}

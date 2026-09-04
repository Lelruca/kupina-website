import { galleryItems } from '../data/content';
import Photo from './Photo';
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
              <Photo src={item.photo} category={item.category} alt={item.alt} className="gallery-photo" />
              <span className="gallery-caption">{item.caption}</span>
            </li>
          ))}
        </ul>
        <p className="demo-callout gallery-note">
          Фотографии — из архива поездок службы разных лет, подобраны для наглядности прототипа. Перед публикацией
          сайта нужно подтвердить права на использование каждого снимка и при необходимости заменить более новыми.
        </p>
      </div>
    </section>
  );
}

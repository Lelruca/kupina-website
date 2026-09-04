import { globalFaq } from '../data/content';
import Accordion from './Accordion';
import './FaqSection.css';

export default function FaqSection() {
  return (
    <section className="section section--alt" id="first-time" aria-label="Вопросы для тех, кто едет впервые">
      <div className="container faq-section">
        <div className="section-head">
          <p className="section-kicker">Для тех, кто впервые</p>
          <h2 className="section-title">Никогда не были в паломнической поездке? Это нормально</h2>
          <p className="section-lead">
            Собрали вопросы, которые чаще всего задают перед первой поездкой. Не нашли своего — звоните, ответим лично.
          </p>
        </div>
        <Accordion items={globalFaq} namePrefix="global-faq" />
      </div>
    </section>
  );
}

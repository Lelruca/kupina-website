import { processSteps } from '../data/content';
import './ProcessSection.css';

export default function ProcessSection() {
  return (
    <section className="section" aria-label="Как проходит паломничество">
      <div className="container">
        <div className="section-head">
          <p className="section-kicker">Порядок действий</p>
          <h2 className="section-title">Как проходит паломничество</h2>
        </div>
        <ol className="process">
          {processSteps.map((step, index) => (
            <li key={step.title} className="process__step">
              <span className="process__num">{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

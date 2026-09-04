import './Accordion.css';

interface AccordionEntry {
  question: string;
  answer: string;
}

export default function Accordion({ items, namePrefix }: { items: AccordionEntry[]; namePrefix: string }) {
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <details className="accordion__item" key={item.question} name={namePrefix}>
          <summary id={`${namePrefix}-summary-${index}`}>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

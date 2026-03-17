interface SummaryCardsProps {
  items: Array<{
    label: string;
    value: string;
    helper: string;
  }>;
}

export function SummaryCards({ items }: SummaryCardsProps) {
  return (
    <section className="summary-grid">
      {items.map((item) => (
        <article className="panel summary-card" key={item.label}>
          <p className="summary-label">{item.label}</p>
          <h3>{item.value}</h3>
          <p className="summary-helper">{item.helper}</p>
        </article>
      ))}
    </section>
  );
}

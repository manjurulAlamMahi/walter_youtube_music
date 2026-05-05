const STATS = [
  { value: '12,400+', label: 'Happy Clients' },
  { value: '98%',     label: 'Satisfaction Rate' },
  { value: '350+',    label: 'Cleaners Available' },
  { value: '24/7',    label: 'Customer Support' },
];

export default function Stats() {
  return (
    <div className="stats">
      {STATS.map((s) => (
        <div className="stat" key={s.label}>
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

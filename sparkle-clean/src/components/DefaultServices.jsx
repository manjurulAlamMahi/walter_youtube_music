const SERVICES = [
  { icon: '🏠', title: 'Home Cleaning',    desc: 'Regular & one-time residential cleaning' },
  { icon: '🏢', title: 'Office Cleaning',  desc: 'Keep your workspace spotless' },
  { icon: '🧹', title: 'Deep Cleaning',    desc: 'Top-to-bottom intensive clean' },
  { icon: '🪟', title: 'Window Washing',   desc: 'Crystal-clear inside & out' },
  { icon: '🛋️', title: 'Upholstery Clean', desc: 'Sofas, chairs & carpets refreshed' },
  { icon: '📦', title: 'Move-Out Clean',   desc: 'Leave nothing behind but shine' },
];

export default function DefaultServices() {
  return (
    <section>
      <h2>Our Cleaning Services</h2>
      <div className="services-grid">
        {SERVICES.map((s) => (
          <div className="service-default" key={s.title}>
            <div className="icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

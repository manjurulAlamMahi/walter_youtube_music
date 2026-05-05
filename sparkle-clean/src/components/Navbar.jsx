export default function Navbar() {
  return (
    <nav>
      <div className="logo">Sparkle<span>Clean</span> Pro</div>
      <ul>
        {['Home', 'Services', 'Pricing', 'About', 'Contact'].map((item) => (
          <li key={item}><a href="#">{item}</a></li>
        ))}
      </ul>
    </nav>
  );
}

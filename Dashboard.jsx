import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <FeatureCard title="Събития" to="/events" />
      <FeatureCard title="Резервации" to="/reservations" />
      <FeatureCard title="Форум" to="/forum" />
    </section>
  );
}

function FeatureCard({ title, to }) {
  return (
    <Link
      to={to}
      className="rounded-2xl shadow-lg p-6 bg-white hover:shadow-xl transition flex items-center justify-center text-xl font-semibold"
    >
      {title}
    </Link>
  );
}

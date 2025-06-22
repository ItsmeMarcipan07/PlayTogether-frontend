import { useEffect, useState } from "react";
import api from "../api";

function EventCard({ event }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4">
      <h3 className="font-semibold text-lg">
        {event.sport?.name || "Събитие"} –{" "}
        {new Date(event.activity_date).toLocaleString("bg-BG")}
      </h3>
      <p className="text-slate-600 mt-1">{event.description}</p>
      <p className="text-sm text-slate-500 mt-1">{event.location}</p>
    </div>
  );
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/activities")
      .then((res) => setEvents(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Зареждане...</p>;
  if (events.length === 0) return <p>Няма налични събития</p>;

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((e) => (
        <EventCard key={e.activity_id} event={e} />
      ))}
    </section>
  );
}

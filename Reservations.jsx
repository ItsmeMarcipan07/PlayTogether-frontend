import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";

function BookingCard({ booking }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4">
      <h3 className="font-semibold text-lg">
        Резервация #{booking.booking_id}
      </h3>
      <p className="text-slate-600 mt-1">
        Дата: {new Date(booking.booking_date).toLocaleString("bg-BG")}
      </p>
      <p className="text-slate-600 mt-1">Продължителност: {booking.duration} ч.</p>
      <p className="text-sm text-slate-500 mt-1">Статус: {booking.status}</p>
    </div>
  );
}

export default function Reservations() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/bookings")
      .then((res) => {
        const data = user
          ? res.data.filter((b) => b.user_id === user.user_id)
          : res.data;
        setBookings(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <p>Зареждане...</p>;
  if (bookings.length === 0) return <p>Нямаш резервации</p>;

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {bookings.map((b) => (
        <BookingCard key={b.booking_id} booking={b} />
      ))}
    </section>
  );
}

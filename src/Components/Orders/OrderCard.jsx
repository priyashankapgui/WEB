import { Link } from "react-router-dom";
export default function OrderCard({ order }) {
  const isoDateString = order.pickupTime;
  const date = new Date(isoDateString);
  // Example: Convert to a readable format like "July 3, 2024, 12:06 PM"
  const dateTimeString = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);



  return (
    <Link className="order-card" to={`/bill/${order.onlineBillNo}`}>
      <div className="col-1">
        <h3>No: {order.onlineBillNo}</h3>
        <p className="date">{dateTimeString}</p>
        <p className="status">{order.status}</p>
      </div>
      <div className="col-2">
        <p className="price">Rs. {order.onlineBillTotal?.toLocaleString()}</p>
        <p className="arrow">→</p>
      </div>
    </Link>
  );
}

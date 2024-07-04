import { useEffect, useState } from "react";
import { customerOnlineOrders } from "../../Api/MyAccountAPI/MyAccountAPI";
import secureLocalStorage from "react-secure-storage";
import OrderCard from "./OrderCard";
import "./OrderCard.css";
import LoaderComponent from "../Spiner/HashLoader/HashLoader";

const user = secureLocalStorage.getItem("user");
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const response = await customerOnlineOrders(user.customerId);
      setOrders(response.data);
      setLoading(false);
    };
    fetchOrders();
  }, []);
  return (
    <div className="orders">
      {loading ? (
        <LoaderComponent size={50} />
      ) : (
        orders.map((order) => <OrderCard key={order.onlineBillNo} order={order} />)
      )}
    </div>
  );
}

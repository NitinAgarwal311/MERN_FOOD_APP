import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Orders() {
    const [orderData, setOrderData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "http://localhost:3001/api/getOrdersByUser",
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        email: localStorage.getItem("email"),
                    }),
                }
            );
            if (response.ok) {
                const data = await response.json();
                setOrderData(data);
            } else {
                setOrderData([]);
            }
        };

        fetchData();
    }, []);

    if (orderData === undefined) {
        return (
            <div>
                <Navbar />
            </div>
        );
    }

    if (orderData.orders.length === 0) {
        return (
            <div>
                <Navbar />
                <div className="container m-3">
                    <p className="fs-2">No Orders Found</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            {orderData.orders.reverse().map((order) => {
                return (
                    <div className="container m-3" key={order._id}>
                        <p className="fs-3">{order.date}</p>
                        <hr />
                        {order.cart.map((item) => {
                            return (
                                <div className="row">
                                    <div className="col col-lg-3">
                                        {item.name}
                                    </div>
                                    <div className="col col-lg-3">
                                        {item.size.charAt(0).toUpperCase() +
                                            item.size.slice(1)}
                                    </div>
                                    <div className="col col-lg-3">
                                        {item.qty}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

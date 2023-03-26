import React, { useContext, useState } from "react";
import CartContext from "../store/cart-context";

export default function Card(props) {
    const priceOptions = Object.keys(props.options);
    const cartCtx = useContext(CartContext);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOptions[0]);

    const totalPrice = qty * parseInt(props.options[size]);

    const addItemHandler = () => {
        const items = cartCtx.items;

        const existingItemIdx = items.findIndex(
            (item) => item.id === props.foodItem._id && item.size === size
        );
        if (existingItemIdx !== -1) {
            const newQty =
                parseInt(qty) + parseInt(cartCtx.items[existingItemIdx].qty);
            cartCtx.updateCart(existingItemIdx, newQty);
            return;
        }
        cartCtx.addItem({
            id: props.foodItem._id,
            name: props.foodItem.name,
            qty: qty,
            size: size,
            price: totalPrice,
        });
    };
    return (
        <div>
            <div
                className="card rounded mt-3"
                style={{ width: "18rem", maxHeight: "450px" }}
            >
                <img
                    src={props.foodItem.img}
                    className="card-img-top"
                    alt={props.foodItem.name}
                    style={{ height: "120px", objectFit: "fill" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">{props.foodItem.description}</p>
                    <div>
                        <select
                            className="bg-primary rounded p-1"
                            onChange={(e) => {
                                setQty(e.target.value);
                            }}
                            value={qty}
                        >
                            {Array.from({ length: 6 }, (_, i) => {
                                return (
                                    <option value={i + 1} key={i + 1}>
                                        {i + 1}
                                    </option>
                                );
                            })}
                        </select>
                        <select
                            className="bg-primary m-2 p-1 rounded"
                            onChange={(e) => {
                                setSize(e.target.value);
                            }}
                            value={size}
                        >
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>
                                    {data}
                                </option>
                            ))}
                        </select>
                        <div className="fs-5">Total Price: ₹{totalPrice}</div>
                    </div>

                    <hr />
                    <button
                        className="bg-primary justify-center rounded"
                        onClick={addItemHandler}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

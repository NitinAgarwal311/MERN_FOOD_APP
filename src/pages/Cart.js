import React, { useContext } from "react";
import CartContext from "../store/cart-context";
import Modal from "../components/Modal";
import classes from "./Cart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Cart(props) {
    const cartCtx = useContext(CartContext);

    const cartItems = cartCtx.items;

    const deleteItemHandler = (idx) => {
        cartCtx.removeItem(idx);
    };

    const totalPrice = cartItems.reduce((totalPrice, item) => {
        return totalPrice + parseInt(item.qty) * parseInt(item.price);
    }, 0);

    const checkoutHandler = async () => {
        const response = await fetch("http://localhost:3001/api/addOrder", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email: localStorage.getItem("email"),
                order: {
                    cart: cartItems,
                    date: new Date().toDateString()
                },
            }),
        });

        if (response.ok) {
            cartCtx.clearCart();
        }
    };

    if (cartItems.length === 0) {
        return (
            <Modal closeModal={props.onCloseModal}>
                <div className="d-flex justify-content-center">
                    <p className="fs-3">Cart is Empty!!!</p>
                </div>
            </Modal>
        );
    }

    return (
        <Modal closeModal={props.onCloseModal}>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th className={classes.header} scope="col">
                            #
                        </th>
                        <th className={classes.header} scope="col">
                            Name
                        </th>
                        <th className={classes.header} scope="col">
                            Option
                        </th>
                        <th className={classes.header} scope="col">
                            Quantity
                        </th>
                        <th className={classes.header} scope="col">
                            Price
                        </th>
                        <th className={classes.header} scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, idx) => {
                        return (
                            <tr key={idx + 1}>
                                <th scope="row">{idx + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.size}</td>
                                <td>{item.qty}</td>
                                <td>{item.price}</td>
                                <td>
                                    <span
                                        style={{ cursor: "pointer" }}
                                        onClick={() => deleteItemHandler(idx)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="d-flex justify-content-start">
                <p className="fs-3 mb-0">Total Price: ₹{totalPrice}</p>
                <button
                    className="btn btn-success text-white mx-4"
                    onClick={checkoutHandler}
                >
                    Checkout
                </button>
            </div>
        </Modal>
    );
}

import React, { useEffect, useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [
                ...state,
                {
                    id: action.item.id,
                    name: action.item.name,
                    price: action.item.price,
                    qty: action.item.qty,
                    size: action.item.size,
                },
            ];
        case "REMOVE": {
            const newState = [...state];
            newState.splice(action.idx, 1);
            return newState;
        }
        case "UPDATE": {
            const newState = [...state];
            newState[action.idx].qty = action.qty;
            return newState;
        }
        case "CLEAR": {
            const newState = [];
            return newState;
        }
        default:
            console.log("WRONG ACTION");
    }
};

const CartProvider = (props) => {
    const initialCartState = JSON.parse(
        localStorage.getItem("cartItems") || "[]"
    );
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        initialCartState
    );

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartState));
    }, [cartState]);

    const addToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item: item });
    };

    const removeFromCartHandler = (idx) => {
        dispatchCartAction({ type: "REMOVE", idx: idx });
    };

    const updateCartHandler = (idx, qty) => {
        dispatchCartAction({ type: "UPDATE", idx: idx, qty: qty });
    };

    const clearCartHandler = () => {
        dispatchCartAction({ type: "CLEAR"});
    }

    const value = {
        items: cartState,
        addItem: addToCartHandler,
        removeItem: removeFromCartHandler,
        updateCart: updateCartHandler,
        clearCart: clearCartHandler
    };

    return (
        <CartContext.Provider value={value}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;

import { createContext } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (idx) => {},
    updateCart: (idx) => {},
    clearCart: () => {}
});

export default CartContext;
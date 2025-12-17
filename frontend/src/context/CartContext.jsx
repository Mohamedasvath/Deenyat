import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const exist = state.cart.find((i) => i._id === action.payload._id);
      if (exist) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i._id === action.payload._id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };

    case "INCREASE_QTY":
      return {
        ...state,
        cart: state.cart.map((i) =>
          i._id === action.payload ? { ...i, qty: i.qty + 1 } : i
        ),
      };

    case "DECREASE_QTY":
      return {
        ...state,
        cart: state.cart
          .map((i) =>
            i._id === action.payload ? { ...i, qty: i.qty - 1 } : i
          )
          .filter((i) => i.qty > 0),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((i) => i._id !== action.payload),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (item) => dispatch({ type: "ADD_TO_CART", payload: item });
  const increaseQty = (id) => dispatch({ type: "INCREASE_QTY", payload: id });
  const decreaseQty = (id) => dispatch({ type: "DECREASE_QTY", payload: id });
  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

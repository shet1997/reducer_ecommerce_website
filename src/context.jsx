import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  INCREASE,
  DECREASE,
  REMOVE,
  LOADING,
  DISPLAY_ITEMS,
  CLEAR,
} from "./actions";

import cartItems from "./data";
import reducer from "./reducer";
import { getTotals } from "../../final/src/utils";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const Context = ({ children }) => {
  const defaultState = {
    loading: false,
    cart: new Map(),
  };

  const [state, dispatch] = useReducer(reducer, defaultState);
  const { totalAmount, totalCost } = getTotals(state.cart);

  const remove = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };

  const increase = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR });
  };

  const displayItems = () => {
    dispatch({ type: DISPLAY_ITEMS });
  };

  const fetchData = async () => {
    dispatch({ type: LOADING });
    const url = "https://www.course-api.com/react-useReducer-cart-project";
    const response = await fetch(url);
    let data = await response.json();
    dispatch({ type: DISPLAY_ITEMS, payload: { data } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        remove,
        increase,
        decrease,
        clearCart,
        displayItems,
        ...state,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;

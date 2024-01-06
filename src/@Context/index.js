import React, { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();
const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState("INR");

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};
export const useCurrency = () => useContext(CurrencyContext);

export default CurrencyProvider;
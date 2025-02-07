import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const currencyMap = {
    840: "USD", 978: "EUR", 980: "UAH", 826: "GBP", 392: "JPY",
    756: "CHF", 156: "CNY", 784: "AED", 971: "AFN", 8: "ALL",
    51: "AMD", 973: "AOA", 32: "ARS", 36: "AUD"
};

const fetchCurrencyData = async () => {
    const response = await axios.get("https://api.monobank.ua/bank/currency");
    return response.data;
};

export default function CurrencyExchangeRates() {


    return (
        <div className="CurrencyExchangeRates">
            <h2>Currency Exchange Rates</h2>
            
        </div>
    );
}

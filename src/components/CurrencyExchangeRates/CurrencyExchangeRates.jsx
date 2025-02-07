import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const TARGET_PAIRS = [
    { base: 978, quote: 840, label: "EUR/USD" }, 
    { base: 840, quote: 980, label: "USD/UAH" },
    { base: 978, quote: 980, label: "EUR/UAH" }, 
];

const fetchCurrencyData = async () => {
    try {
        const cachedData = localStorage.getItem("currencyData");
        const lastFetch = localStorage.getItem("currencyFetchTime");

        if (cachedData && lastFetch && Date.now() - lastFetch < 600000) { 
            return JSON.parse(cachedData);
        }

        const response = await axios.get("https://api.monobank.ua/bank/currency");
        localStorage.setItem("currencyData", JSON.stringify(response.data));
        localStorage.setItem("currencyFetchTime", Date.now());

        return response.data;
    } catch (error) {
        console.error("Error fetching currency data:", error);
        return [];
    }
};

export default function CurrencyExchangeRates() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["currencyData"],
        queryFn: fetchCurrencyData,
        refetchInterval: 600000, 
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data</p>;

    const filteredRates = TARGET_PAIRS.map(pair => {
        const rate = data.find(item => item.currencyCodeA === pair.base && item.currencyCodeB === pair.quote);
        return {
            label: pair.label,
            buy: rate?.rateBuy ?? "-",
            sell: rate?.rateSell ?? "-",
        };
    });

    return (
        <div className="bg-accentLightBlue bg-opacity-15 p-6 rounded-2xl w-[300px]">
            <h2 className="text-xl font-bold mb-4">Currency Exchange Rates</h2>
            <div className="w-[100%]">
                <div className="w-[100%] h-[40px] flex items-center">
                    <p className="text-base font-medium w-[45%]">Pair:</p>
                    <p className="text-sm font-medium w-[30%]">Buy:</p>
                    <p className="text-sm font-medium w-[25%]">Sell:</p>
                </div>
                {filteredRates.map(({ label, buy, sell }) => (
                    <div className="w-[100%] h-[40px] flex items-center">
                        <p className="text-base font-medium w-[45%]">{label}</p>
                        <p className="text-sm font-medium w-[30%]">{buy}</p>
                        <p className="text-sm font-medium w-[25%]">{sell}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

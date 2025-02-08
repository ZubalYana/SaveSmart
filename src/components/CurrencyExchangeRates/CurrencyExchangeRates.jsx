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
        console.log(response.data);
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
<div className=" w-[350px] ml-10">
    <h2 className="text-xl font-bold mb-4 text-mainBlue">Currency Exchange Rates</h2>
    <div className="w-full">
        <div className="w-full h-10 flex items-center bg-accentLightBlue bg-opacity-100 px-2 rounded-md mb-2 text-customWhite">
            <p className="text-base font-medium w-[45%]">Pair</p>
            <p className="text-sm font-medium w-[30%]">Buy</p>
            <p className="text-sm font-medium w-[25%]">Sell</p>
        </div>
        {filteredRates.map(({ label, buy, sell }, index) => (
            <div
                key={index}
                className="w-full h-10 flex items-center px-2 rounded-md bg-white transition duration-200 hover:bg-accentLightBlue hover:bg-opacity-20 cursor-pointer mt-2"
            >
                <p className="text-base font-medium w-[45%] text-defaultText">{label}</p>
                <p className="text-sm font-medium w-[30%] text-defaultText">{buy}</p>
                <p className="text-sm font-medium w-[25%] text-defaultText">{sell}</p>
            </div>
        ))}
    </div>
</div>

    );
}

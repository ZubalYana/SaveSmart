import React, { useState, useEffect } from "react";
import { TextField, Button, Autocomplete, Box } from "@mui/material";
import './CurrencyConverter.css';
const CURRENCY_NAMES = {
    "8": "Albanian Lek (ALL)",
    "12": "Algerian Dinar (DZD)",
    "32": "Argentine Peso (ARS)",
    "36": "Australian Dollar (AUD)",
    "48": "Bahraini Dinar (BHD)",
    "50": "Bangladeshi Taka (BDT)",
    "51": "Armenian Dram (AMD)",
    "68": "Bolivian Boliviano (BOB)",
    "72": "Botswana Pula (BWP)",
    "96": "Brunei Dollar (BND)",
    "108": "Burundi Franc (BIF)",
    "116": "Cambodian Riel (KHR)",
    "124": "Canadian Dollar (CAD)",
    "144": "Sri Lankan Rupee (LKR)",
    "152": "Chilean Peso (CLP)",
    "156": "Chinese Yuan (CNY)",
    "170": "Colombian Peso (COP)",
    "188": "Costa Rican Colón (CRC)",
    "191": "Croatian Kuna (HRK)",
    "192": "Cuban Peso (CUP)",
    "203": "Czech Koruna (CZK)",
    "208": "Danish Krone (DKK)",
    "230": "Ethiopian Birr (ETB)",
    "262": "Djiboutian Franc (DJF)",
    "270": "Gambian Dalasi (GMD)",
    "324": "Guinean Franc (GNF)",
    "344": "Hong Kong Dollar (HKD)",
    "352": "Icelandic Króna (ISK)",
    "356": "Indian Rupee (INR)",
    "360": "Indonesian Rupiah (IDR)",
    "368": "Iraqi Dinar (IQD)",
    "376": "Israeli New Shekel (ILS)",
    "392": "Japanese Yen (JPY)",
    "398": "Kazakhstani Tenge (KZT)",
    "400": "Jordanian Dinar (JOD)",
    "404": "Kenyan Shilling (KES)",
    "410": "South Korean Won (KRW)",
    "414": "Kuwaiti Dinar (KWD)",
    "417": "Kyrgyzstani Som (KGS)",
    "418": "Lao Kip (LAK)",
    "422": "Lebanese Pound (LBP)",
    "434": "Libyan Dinar (LYD)",
    "454": "Malawian Kwacha (MWK)",
    "458": "Malaysian Ringgit (MYR)",
    "480": "Mauritian Rupee (MUR)",
    "484": "Mexican Peso (MXN)",
    "496": "Mongolian Tögrög (MNT)",
    "504": "Moroccan Dirham (MAD)",
    "512": "Omani Rial (OMR)",
    "524": "Nepalese Rupee (NPR)",
    "554": "New Zealand Dollar (NZD)",
    "566": "Nigerian Naira (NGN)",
    "578": "Norwegian Krone (NOK)",
    "586": "Pakistani Rupee (PKR)",
    "600": "Paraguayan Guaraní (PYG)",
    "604": "Peruvian Sol (PEN)",
    "608": "Philippine Peso (PHP)",
    "634": "Qatari Riyal (QAR)",
    "643": "Russian Ruble (RUB)",
    "682": "Saudi Riyal (SAR)",
    "690": "Seychellois Rupee (SCR)",
    "694": "Sierra Leonean Leone (SLL)",
    "702": "Singapore Dollar (SGD)",
    "704": "Vietnamese Đồng (VND)",
    "710": "South African Rand (ZAR)",
    "716": "Zimbabwean Dollar (ZWL)",
    "748": "Eswatini Lilangeni (SZL)",
    "752": "Swedish Krona (SEK)",
    "756": "Swiss Franc (CHF)",
    "764": "Thai Baht (THB)",
    "784": "UAE Dirham (AED)",
    "788": "Tunisian Dinar (TND)",
    "800": "Ugandan Shilling (UGX)",
    "818": "Egyptian Pound (EGP)",
    "826": "British Pound Sterling (GBP)",
    "834": "Tanzanian Shilling (TZS)",
    "840": "US Dollar (USD)",
    "858": "Uruguayan Peso (UYU)",
    "860": "Uzbekistani Som (UZS)",
    "886": "Yemeni Rial (YER)",
    "901": "Taiwan Dollar (TWD)",
    "928": "Venezuelan Bolívar (VES)",
    "931": "Aruban Florin (AWG)",
    "933": "Belarusian Ruble (BYN)",
    "936": "Ghanaian Cedi (GHS)",
    "941": "Serbian Dinar (RSD)",
    "943": "Mozambican Metical (MZN)",
    "946": "Romanian Leu (RON)",
    "949": "Turkish Lira (TRY)",
    "950": "CFA Franc BEAC (XAF)",
    "952": "CFA Franc BCEAO (XOF)",
    "968": "Surinamese Dollar (SRD)",
    "969": "Malagasy Ariary (MGA)",
    "971": "Afghan Afghani (AFN)",
    "972": "Tajikistani Somoni (TJS)",
    "973": "Congolese Franc (CDF)",
    "975": "Bulgarian Lev (BGN)",
    "976": "Macedonian Denar (MKD)",
    "978": "Euro (EUR)",
    "980": "Ukrainian Hryvnia (UAH)",
    "985": "Polish Złoty (PLN)",
    "986": "Brazilian Real (BRL)"
}

export default function CurrencyConverter() {
    const [amount, setAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState(null);
    const [toCurrency, setToCurrency] = useState(null);
    const [result, setResult] = useState(null);
    const [rates, setRates] = useState([]);
    const [availableCurrencies, setAvailableCurrencies] = useState([]);

    useEffect(() => {
        const cachedData = localStorage.getItem("currencyData");
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            setRates(parsedData);

            const currencySet = new Set();
            parsedData.forEach(({ currencyCodeA, currencyCodeB }) => {
                currencySet.add(currencyCodeA);
                currencySet.add(currencyCodeB);
            });

            setAvailableCurrencies([...currencySet].sort());

            setFromCurrency(840); 
            setToCurrency(980); 
        }
    }, []);

    const handleConvert = () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Enter a valid amount.");
            return;
        }
        const rateData = rates.find(
            (item) => item.currencyCodeA === fromCurrency && item.currencyCodeB === toCurrency
        );
        if (!rateData) {
            alert("Exchange rate not available for this pair.");
            return;
        }
        const exchangeRate = rateData.rateSell || rateData.rateCross;
        if (!exchangeRate) {
            alert("Invalid exchange rate data.");
            return;
        }
        setResult((amount * exchangeRate).toFixed(2));
    };

    return (
<div className="w-[600px]">
    <h2 className="text-xl font-bold mb-4 text-mainBlue">
        Currency Converter
    </h2>
    <div className="flex flex-col gap-3">
        <TextField
            label="Amount"
            type="number"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            className="w-full"
        />
        <div className="w-full flex gap-3">
        <Autocomplete
            value={fromCurrency}
            onChange={(event, newValue) => setFromCurrency(newValue)}
            options={availableCurrencies}
            getOptionLabel={(option) => CURRENCY_NAMES[option] || `Unknown (${option})`}
            renderInput={(params) => <TextField {...params} label="From Currency" />}
            fullWidth
            className="w-full"
        />
        <Autocomplete
            value={toCurrency}
            onChange={(event, newValue) => setToCurrency(newValue)}
            options={availableCurrencies}
            getOptionLabel={(option) => CURRENCY_NAMES[option] || `Unknown (${option})`}
            renderInput={(params) => <TextField {...params} label="To Currency" />}
            fullWidth
            className="w-full"
        />
        </div>
        <div
            onClick={handleConvert}
            className="bg-accentLightBlue text-white py-2 rounded-md w-full flex justify-center items-center cursor-pointer uppercase font-semibold h-12 transition-all duration-300 ease-in-out transform hover:bg-mainBlue hover:scale-105 hover:shadow-lg"
        >
            Convert
        </div>
        
        {result !== null && (
            <p className="text-xl font-semibold text-mainBlue mt-4">
                Converted Amount: {result}
            </p>
        )}
    </div>
</div>

    );
}
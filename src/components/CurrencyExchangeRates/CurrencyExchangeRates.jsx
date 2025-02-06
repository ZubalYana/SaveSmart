import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CurrencyExchangeRates() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.monobank.ua/bank/currency');
                setData(response.data);
            } catch (err) {
                setError(err);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 300000); 
        return () => clearInterval(interval); 
    }, []);

    if (error) return <div>Error: {error.message}</div>;
    return <div className='CurrencyExchangeRates'>Data: {JSON.stringify(data)}</div>;
}

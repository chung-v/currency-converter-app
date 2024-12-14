import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [currencies, setCurrencies] = useState([]); // List of currencies
    const [fromCurrency, setFromCurrency] = useState(""); // Selected 'from' currency
    const [toCurrency, setToCurrency] = useState(""); // Selected 'to' currency
    const [amount, setAmount] = useState(""); // Amount to convert
    const [conversionResult, setConversionResult] = useState(null); // Conversion result

    // Fetch latest rates to populate currency list
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get("https://api.fxratesapi.com/latest", {
                    params: {
                        api_key: import.meta.env.VITE_API_KEY
                    },
                });
                const rates = response.data.rates;
                setCurrencies(Object.keys(rates));
                setFromCurrency("AUD"); // Default 'from' currency
                setToCurrency("USD"); // Default 'to' currency
            } catch (error) {
                console.error("Error fetching currencies:", error);
            }
        };
        fetchCurrencies();
    }, []);

    // Fetch conversion result
    const convertCurrency = async () => {
        if (fromCurrency && toCurrency && amount) {
            try {
                const response = await axios.get("https://api.fxratesapi.com/convert", {
                    params: {
                        api_key: import.meta.env.VITE_API_KEY,
                        from: fromCurrency,
                        to: toCurrency,
                        amount,
                    },
                });
                setConversionResult(response.data.result || "Conversion failed");
            } catch (error) {
                console.error("Error converting currency:", error);
                setConversionResult(null);
            }
        }
    };

    return (
        <div>
            <h1>Currency Converter</h1>
            <div>
                <label>From: </label>
                <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>To: </label>
                <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Amount: </label>
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => {
                        // Allow only numbers and decimal points
                        const newValue = e.target.value;
                        if (/^\d*\.?\d*$/.test(newValue)) {
                            setAmount(newValue);
                        }
                    }}
                    placeholder="Enter amount"
                />
            </div>
            <button onClick={convertCurrency}>Convert</button>
            <div>
                {conversionResult !== null && (
                    <h3>Converted Amount: {toCurrency + " " + conversionResult.toFixed(2)}</h3>

                )}
            </div>
        </div>
    );
}

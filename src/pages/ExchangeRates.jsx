import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExchangeRates = () => {
  const [rates, setRates] = useState({}); // State to store exchange rates
  const [currencies, setCurrencies] = useState([]); // State to store list of currencies
  const [baseCurrency, setBaseCurrency] = useState('AUD'); // State to store selected base currency
  const [error, setError] = useState(null); // State to store error messages

  // Fetch list of currencies 
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("https://api.fxratesapi.com/latest", {
          params: {
            api_key: import.meta.env.VITE_API_KEY
          },
        });
        const rates = response.data.rates;
        setCurrencies(Object.keys(rates)); // Set the list of currencies
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };
    fetchCurrencies();
  }, []); 

  // Fetch exchange rates whenever baseCurrency changes
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get("https://api.fxratesapi.com/latest", {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            base: baseCurrency,
          },
        });
        if (response.data && response.data.rates) {
          setRates(response.data.rates); // Set the exchange rates
        } else {
          setError('Invalid response from API');
        }
      } catch (error) {
        setError('Error fetching exchange rates: ' + error.message);
      }
    };
    fetchRates();
  }, [baseCurrency]); 

  return (
    <div>
      <h1>Exchange Rates</h1>
      <div>
        <label>Base Currency: </label>
        <select // Dropdown to select base currency
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {Object.keys(rates).map((currency) => (
            <li key={currency}>
              {currency}: {Number(rates[currency]).toFixed(7)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExchangeRates;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('AUD');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("https://api.fxratesapi.com/latest", {
          params: {
            api_key: "fxr_live_88b9fdc4d35418374f9ab8d683ac672fb4aa",
            amount: 1
          },
        });
        const rates = response.data.rates;
        setCurrencies(Object.keys(rates));
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };
    fetchCurrencies();
  });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get("https://api.fxratesapi.com/latest", {
          params: {
            api_key: "fxr_live_88b9fdc4d35418374f9ab8d683ac672fb4aa",
            base: baseCurrency,
          },
        });
        if (response.data && response.data.rates) {
          setRates(response.data.rates);
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
        <select
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
              {currency}: {Number(rates[currency]).toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExchangeRates;
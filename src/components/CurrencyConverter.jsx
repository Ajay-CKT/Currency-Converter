import logo from "../assets/logo/converter-logo.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [optionsArr, setOptionsArr] = useState([]);
  const [exchangeRate, setExchangeRate] = useState();
  const [convertedAmount, setConvertedAmount] = useState();

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        let apiKey = "6e0b38f4b5f3fdb35be08007";
        let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;
        const response = await axios.get(url);
        const currencyOptions = Object.keys(response.data.conversion_rates);
        setOptionsArr(currencyOptions);
        setExchangeRate(response.data.conversion_rates[toCurrency]);
      } catch (error) {
        console.error(error);
      }
    };
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    setConvertedAmount(exchangeRate * amount);
  }, [exchangeRate, amount]);

  return (
    <div className="text-white flex flex-col items-center p-6 rounded-xl shadow-lg w-full max-w-lg mx-auto bg-black bg-opacity-10 backdrop-blur-sm">
      <h1 className="mb-10 font-semibold  text-4xl">Currency converter</h1>
      <div className="mb-10">
        <img
          src={logo}
          alt="converter-logo"
          className="w-24 h-24 rounded-3xl"
        />
      </div>
      <div className="relative w-full mb-10">
        <label htmlFor="amount" className="text-sm text-slate-300">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border-b-2 border-gray-400 bg-transparent text-white focus:outline-none"
        />
      </div>
      <div className="relative w-full mb-10">
        <label htmlFor="fromCurrency" className="text-sm text-slate-300">
          From
        </label>
        <select
          value={fromCurrency}
          className="w-full border-b-2 border-gray-400 bg-transparent text-white focus:outline-none"
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {optionsArr.map((currency) => (
            <option value={currency} key={currency} className="text-black">
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="relative w-full mb-10">
        <label htmlFor="toCurrency" className="text-sm text-slate-300">
          To
        </label>
        <select
          value={toCurrency}
          className="w-full border-b-2 border-gray-400 bg-transparent text-white focus:outline-none"
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {optionsArr.map((currency) => (
            <option value={currency} key={currency} className="text-black">
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full max-w-sm bg-slate-200 text-black rounded-md h-12 flex items-center justify-center p-2">
        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
      </div>
    </div>
  );
};

export default CurrencyConverter;

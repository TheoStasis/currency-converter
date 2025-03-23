import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyConverter";

function App() {
  const [amount, setAmount] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");

  const currencyInfo = useCurrencyInfo(from) || {};
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
    console.log({ convertedAmount });
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      {/* Left Side: Translucent Image Box */}
      <div className="absolute left-50 top-1/2 transform -translate-y-1/2 w-[480px] h-[620px] rounded-lg overflow-hidden backdrop-blur-lg bg-white/20 shadow-lg">
        <img
          src="https://images.pexels.com/photos/3832258/pexels-photo-3832258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Food Image"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Right Side: Floating Card */}
      <div className="absolute right-50 pt-22 top-1/2 transform -translate-y-1/2 w-[520px] h-[420px] border border-gray-300 rounded-lg p-5 backdrop-blur-lg bg-white/20 shadow-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-1">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
            />
          </div>
          <div className="relative w-full h-0.5">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className="w-full mt-1 mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisabled
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({}); // Ensure it's initialized as null
    
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => res.json()) // ✅ Call `json()`
            .then((res) => setData(res[currency])) // ✅ Extract currency data
            .catch((err) => console.error("Error fetching currency data:", err)); // Handle errors
    }, [currency]);

    console.log("Fetched currency data:", data); // Debugging log

    return data;
}

export default useCurrencyInfo;

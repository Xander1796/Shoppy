
const useCurrency = (value) => {
    let currencySign;
    if (value === "EURO") currencySign = "€";
    if (value === "USD") currencySign = "$";
    if (value === "GBP") currencySign = "GBP";

    return currencySign;
};

export default useCurrency;


export const formatDecimalNumber = (numberToFormat) => {
    const parsedNumber = parseFloat(numberToFormat).toFixed(2);
    const formattedNumber = parsedNumber.endsWith('.00') || parsedNumber.endsWith('.0')
    ? `${parseFloat(parsedNumber).toFixed(0)}` 
    : `${parsedNumber}`;
    return formattedNumber;
}

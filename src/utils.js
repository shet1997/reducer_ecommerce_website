export const getTotals = (cart) => {
    let totalAmount = 0;
    let totalCost = 0;

    for (let { price, amount } of cart.values()) {
        totalAmount += amount;
        totalCost += price * amount;
    }

    return { totalAmount, totalCost };
}
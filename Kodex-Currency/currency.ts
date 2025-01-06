const SOL_RATE = 0.01; // Lowered rate: 1 USD = 0.01 SOL

export const convertToSol = (usdPrice: number): number => {
  return Number((usdPrice * SOL_RATE).toFixed(2));
};

export const formatSolPrice = (price: number): string => {
  return `${price} SOL`;
};
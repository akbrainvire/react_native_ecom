export const generateRandomOrderId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const orderIdLength = 12;
  let orderId = "";

  for (let i = 0; i < orderIdLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderId += characters[randomIndex];
  }

  return orderId;
};

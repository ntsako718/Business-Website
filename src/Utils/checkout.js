import { DELIVERY_FEE, MIN_ORDER_FOR_DELIVERY, SHOP_WHATSAPP_NUMBER } from "../Config/checkout";

export function getCartSubtotal(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function isEligibleForDelivery(subtotal) {
  return subtotal >= MIN_ORDER_FOR_DELIVERY;
}

export function getOrderTotal(subtotal, fulfillmentMethod) {
  return fulfillmentMethod === "delivery" ? subtotal + DELIVERY_FEE : subtotal;
}

export function buildWhatsAppOrderLink(cartItems, subtotal, total, fulfillmentMethod) {
  const lines = cartItems.map(
    (item) => `- ${item.name} x${item.quantity} — R${(item.price * item.quantity).toFixed(2)}`
  );

  const message = [
    "New order from Hlwekiso:",
    "",
    ...lines,
    "",
    `Subtotal: R${subtotal.toFixed(2)}`,
    fulfillmentMethod === "delivery"
      ? `Delivery: R${DELIVERY_FEE.toFixed(2)}`
      : "Delivery: Collection (no delivery fee)",
    `Total: R${total.toFixed(2)}`,
  ].join("\n");

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encoded}`;
}
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import '../data/backend-practice.js';
import '../data/cart-class.js';
renderOrderSummary();
renderPaymentSummary();

console.log("order.sj loaded")



placeOrder(cart, products);
window.location.href = 'orders.html';

document.querySelector('.place-order-button')
  .addEventListener('click', () => {

    placeOrder(cart, products);

    window.location.href = 'orders.html';
  });

  function placeOrder(cart, products) {

  const orderItems = cart.map(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);

    return {
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      priceCents: product.priceCents
    };
  });

  const totalCents = orderItems.reduce((sum, item) => {
    return sum + item.priceCents * item.quantity;
  }, 0);

  const order = {
    id: crypto.randomUUID(),
    orderTime: new Date().toISOString(),
    totalCents,
    items: orderItems
  };

  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.unshift(order);

  localStorage.setItem('orders', JSON.stringify(orders));

  localStorage.removeItem('cart');
}
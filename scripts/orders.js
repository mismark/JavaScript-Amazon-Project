import { products } from '../data/products.js';
import { addToCart, updateCartQuantity } from '../data/carts.js';
// ✅ Get orders from storage
const orders = JSON.parse(localStorage.getItem('orders')) || [];

// ✅ Render orders
function renderOrders() {

  let ordersHTML = '';

  if (orders.length === 0) {
    document.querySelector('.js-orders-grid').innerHTML =
      `<p style="padding:20px;">No orders yet</p>`;
    return;
  }

  orders.forEach(order => {

    const date = new Date(order.orderTime).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    });

    const total = (order.totalCents / 100).toFixed(2);

    let itemsHTML = '';

    order.items.forEach(item => {

      const product = products.find(p => p.id === item.productId);

      itemsHTML += `
        <div class="order-details-grid">

          <div class="product-image-container">
            <img src="${product.image}" class="product-image">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${product.name}
            </div>

            <div class="product-delivery-date">
              Arriving on: ${getDeliveryDate(order.orderTime)}
            </div>

            <div class="product-quantity">
              Quantity: ${item.quantity}
            </div>

            <button class="buy-again-button button-primary js-buy-again"
              data-product-id="${item.productId}">
              Buy it again
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>

        </div>
      `;
    });

    ordersHTML += `
      <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${date}</div>
            </div>

            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${total}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        ${itemsHTML}

      </div>
    `;
  });

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  attachEvents();
}

// ✅ Delivery date (fake +5 days)
function getDeliveryDate(orderTime) {
  const date = new Date(orderTime);
  date.setDate(date.getDate() + 5);

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });
}

// ✅ Add to cart again
function attachEvents() {
  document.querySelectorAll('.js-buy-again')
    .forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        addToCart(productId);
        updateCartQuantity();

        button.innerText = 'Added ✅';
      });
    });
}

// ✅ Initial load
renderOrders();
updateCartQuantity();
class Cart {
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.cartItems = [];
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(
      localStorage.getItem(this.localStorageKey)
    ) || [];

    // Default data if empty
    if (this.cartItems.length === 0) {
      this.cartItems = [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.cartItems)
    );
  }

  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(
      (cartItem) => cartItem.productId !== productId
    );

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = this.cartItems.find(
      (cartItem) => cartItem.productId === productId
    );

    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  }

  updateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    const element = document.querySelector('.js-cart-quantity');
    if (element) {
      element.innerHTML = cartQuantity;
    }
  }
}

// ✅ Create instances correctly
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);

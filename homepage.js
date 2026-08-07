const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector ("#menu-open-button");
const menuCloseButton = document.querySelector ("#menu-close-button");

menuOpenButton.addEventListener("click", () => {

    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

navLinks.forEach(link => {
  link.addEventListener("click", () => menuOpenButton.click());
});


const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 25,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    },
  }

});

   // Cart functionality
   let cart = [];
   const cartPanel = document.getElementById('cart-panel');
   const cartIcon = document.getElementById('cart-icon');
   const closeCartBtn = document.getElementById('close-cart');
   const cartContent = document.getElementById('cart-content');
   const cartTotal = document.getElementById('cart-total');
   const cartCount = document.getElementById('cart-count');
   const checkoutBtn = document.getElementById('checkout-btn');
   const overlay = document.getElementById('overlay');
   const notificationContainer = document.getElementById('notification-container');

   // Toggle cart panel
   cartIcon.addEventListener('click', (e) => {
       e.preventDefault();
       cartPanel.classList.add('active');
       overlay.classList.add('active');
   });

   closeCartBtn.addEventListener('click', () => {
       cartPanel.classList.remove('active');
       overlay.classList.remove('active');
   });

   overlay.addEventListener('click', () => {
       cartPanel.classList.remove('active');
       overlay.classList.remove('active');
   });

   // Add to cart function
   function addToCart(name, image) {
       const existingItem = cart.find(item => item.name === name);
       
       if (existingItem) {
           existingItem.quantity += 1;
       } else {
           cart.push({
               name: name,
               image: image,
               price: getPrice(name),
               quantity: 1
           });
       }
       
       updateCart();
       showNotification(`${name} added to cart!`, 'success');
   }

   // Buy now function
   function buyNow(name, image) {
       addToCart(name, image);
       cartPanel.classList.add('active');
       overlay.classList.add('active');
       showNotification(`Proceeding to checkout with ${name}`, 'success');
   }

   // Get price based on item name
   function getPrice(name) {
       const prices = {
           'Hot Beverages': 155,
           'Cold Beverages': 185,
           'Matcha': 185,
           'Javachip': 190,
           'Caramel': 185,
           'Refreshment': 165,
           'Special Combo': 299,
           'Dessert': 135,
           'Fries/Burger': 85,
       };
       return prices[name] || 0;
   }

   // Update cart UI
   // Get price based on item name (in PHP)
function getPrice(name) {
  const prices = {
      'Hot Beverages': 165,
      'Cold Beverages': 185,
      'Matcha': 185,
      'Javachip': 185,
      'Caramel': 185,
      'Refreshment': 195,
      'Special Combo': 255,
      'Dessert': 165,
      'Fries/Burger': 85,
  };
  return prices[name] || 0;
}

// Update cart UI with Peso symbol
function updateCart() {
  cartContent.innerHTML = '';
  let total = 0;
  let itemCount = 0;
  
  cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      itemCount += item.quantity;
      
      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      cartItemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
              <h4 class="cart-item-title">${item.name}</h4>
              <p class="cart-item-price">₱${item.price.toFixed(2)}</p>
              <div class="quantity-controls">
                  <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                  <span class="quantity">${item.quantity}</span>
                  <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
              </div>
          </div>
      `;
      cartContent.appendChild(cartItemElement);
  });
  
  cartTotal.textContent = `₱${total.toFixed(2)}`;
  cartCount.textContent = itemCount;
}

   // Update item quantity
   function updateQuantity(index, change) {
       const newQuantity = cart[index].quantity + change;
       
       if (newQuantity < 1) {
           cart.splice(index, 1);
           showNotification('Item removed from cart', 'error');
       } else {
           cart[index].quantity = newQuantity;
       }
       
       updateCart();
   }

   // Checkout function
  // ... (keep all your existing code until the checkoutBtn event listener)

// Checkout function
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    showCheckoutForm();
});

//checkout information
function showCheckoutForm() {
    // Create checkout form
    const checkoutForm = document.createElement('div');
    checkoutForm.className = 'checkout-form';
    checkoutForm.innerHTML = `
        <h3>Checkout Information</h3>
        <form id="checkout-info">
            <div class="form-group">
                <label for="customer-name">Full Name</label>
                <input type="text" id="customer-name" required>
            </div>
            <div class="form-group">
                <label for="customer-address">Delivery Address</label>
                <input type="text" id="customer-address" required>
            </div>
            <div class="form-group">
                <label for="customer-contact">Contact Number</label>
                <input type="tel" id="customer-contact" required>
            </div>
            <div class="form-group">
                <label>Payment Method</label>
                <div class="payment-options">
                    <label class="payment-option">
                        <input type="radio" name="payment" value="Cash on Delivery" checked>
                        <span>Cash on Delivery</span>
                    </label>
                    <label class="payment-option">
                        <input type="radio" name="payment" value="GCash">
                        <span>GCash</span>
                    </label>
                    <label class="payment-option">
                        <input type="radio" name="payment" value="Bank Transfer">
                        <span>Bank Transfer</span>
                    </label>
                </div>
            </div>
            <div class="form-buttons">
                <button type="button" class="cancel-btn" id="back-to-cart">Back to Cart</button>
                <button type="submit" class="submit-btn">Place Order</button>
            </div>
        </form>
    `;
    
    // Replace cart content with checkout form
    cartContent.innerHTML = '';
    cartContent.appendChild(checkoutForm);
    
    // Add back to cart functionality
    document.getElementById('back-to-cart').addEventListener('click', () => {
        updateCart();
    });
    
    // Handle form submission
    document.getElementById('checkout-info').addEventListener('submit', function(e) {
        e.preventDefault();
        processOrder();
    });
}

function processOrder() {
    const name = document.getElementById('customer-name').value;
    const address = document.getElementById('customer-address').value;
    const contact = document.getElementById('customer-contact').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (!name || !address || !contact) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    generateReceipt(name, address, contact, paymentMethod);
}

// Resibo
function generateReceipt(name, address, contact, paymentMethod) {
    let receiptHTML = `
        <div class="receipt">
            <div class="receipt-header">
                <h3>Order Receipt</h3>
                <p class="thank-you">Thank you for your order, ${name}!</p>
            </div>
            <div class="receipt-details">
                <div class="detail-row">
                    <span class="detail-label">Delivery Address:</span>
                    <span class="detail-value">${address}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Contact Number:</span>
                    <span class="detail-value">${contact}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Payment Method:</span>
                    <span class="detail-value">${paymentMethod}</span>
                </div>
            </div>
            <div class="receipt-items">
                <h4>Order Summary</h4>
                <ul>
    `;
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        receiptHTML += `
            <li class="receipt-item">
                <span class="item-name">${item.name} x ${item.quantity}</span>
                <span class="item-price">₱${itemTotal.toFixed(2)}</span>
            </li>
        `;
    });
    
    receiptHTML += `
                </ul>
            </div>
            <div class="receipt-total">
                <span>Total:</span>
                <span class="total-amount">₱${total.toFixed(2)}</span>
            </div>
            <div class="receipt-footer">
                <p class="note">Order will be prepared shortly.</p>
                ${paymentMethod !== 'Cash on Delivery' ? 
                  '<p class="note">Please wait for our payment confirmation.</p>' : ''}
                <button class="close-receipt" id="close-receipt">Done</button>
            </div>
        </div>
    `;
    
    cartContent.innerHTML = receiptHTML;
    
    // Add event listener for closing receipt
    document.getElementById('close-receipt').addEventListener('click', () => {
        closeReceipt();
    });
}

function closeReceipt() {
    cart = [];
    updateCart();
    cartCount.textContent = '0';
    setTimeout(() => {
        cartPanel.classList.remove('active');
        overlay.classList.remove('active');
    }, 500);
}

//notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification" onclick="this.parentElement.remove()">×</button>
    `;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);

    cartContent.innerHTML = receiptHTML; // Show the receipt in the cart panel
    showNotification('Order placed successfully! Receipt generated.', 'success'); // <-- Add this line
    cart = [];
    updateCart();

    // Optional: Close cart panel after a few seconds
    setTimeout(() => {
        cartPanel.classList.remove('active');
        overlay.classList.remove('active');
    }, 4000);

}



 
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 20) { // Adjust this value based on when you want the effect to trigger
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});



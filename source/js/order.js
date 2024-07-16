document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const submitOrderButton = document.getElementById("submit-order");
  const orderForm = document.getElementById("order-form");
  const customerEmailInput = document.getElementById("customer-email");

  // Function to render cart items
  function renderCartItems() {
    cartItemsContainer.innerHTML = "";
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - ${item.price} x ${item.quantity}
        <button class="btn btn-xs btn-danger remove-from-cart" data-index="${index}">-</button>
        <button class="btn btn-xs btn-success add-one-more" data-index="${index}">+</button>
      `;
      cartItemsContainer.appendChild(li);
    });
  }

  // Event listener for remove/add buttons
  cartItemsContainer.addEventListener("click", function (e) {
    const index = e.target.getAttribute("data-index");
    if (e.target.classList.contains("remove-from-cart")) {
      cart[index].quantity--;
      if (cart[index].quantity === 0) {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
    } else if (e.target.classList.contains("add-one-more")) {
      cart[index].quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
    }
  });

  // Function to send email using EmailJS
  function sendEmail(orderDetails, customerEmail) {
    const serviceID = 'service_0xmz5on';
    const templateID = 'template_qy687qv';
    
    const templateParams = {
      customer_email: customerEmail,
      message: orderDetails
    };

    emailjs.send(serviceID, templateID, templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Order sent successfully');
        localStorage.removeItem("cart");
        renderCartItems();
      }, function(error) {
        console.log('FAILED...', error);
        alert('Failed to send order');
      });
  }

  // Event listener for the submit order button
  submitOrderButton.addEventListener("click", function () {
    const customerEmail = customerEmailInput.value.trim();
    if (!customerEmail) {
      alert('Please enter your email address');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    let orderDetails = "Order Details:\n\n";
    cart.forEach(item => {
      orderDetails += `${item.name} - ${item.price} x ${item.quantity}\n`;
    });

    sendEmail(orderDetails, customerEmail);
  });

  // Initial rendering of cart items
  renderCartItems();
});

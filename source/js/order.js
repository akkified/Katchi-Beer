// order.js

document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const submitOrderButton = document.getElementById("submit-order");
  const orderForm = document.getElementById("order-form");

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

  // Event listener for submit order button
  submitOrderButton.addEventListener("click", function () {
    const orderDetails = cart.map(item => `${item.name} x ${item.quantity}`).join(", ");
    const customerEmail = document.getElementById("customer-email").value;

    if (!orderDetails) {
      alert("Your cart is empty!");
      return;
    }

    if (!customerEmail) {
      alert("Please enter your email address.");
      return;
    }

    try {
      // Initialize EmailJS with your public key
      emailjs.init("h0Qm_szLqUH-fYTHT"); // Replace with your EmailJS public key
      console.log("EmailJS initialized");

      // Send email using EmailJS
      emailjs.send("service_0xmz5on", "template_qy687qv", { // Replace with your EmailJS service ID and template ID
        order_details: orderDetails,
        customer_email: customerEmail
      }).then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Order submitted successfully!");
        localStorage.removeItem("cart");
        cart = [];
        renderCartItems();
        orderForm.reset();
      }, function (error) {
        console.error("FAILED...", error);
        alert("Failed to submit order. See console for details.");
      });
    } catch (e) {
      console.error("EmailJS Initialization Error", e);
    }
  });

  // Initial render of cart items
  renderCartItems();
});

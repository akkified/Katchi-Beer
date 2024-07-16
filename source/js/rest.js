// rest.js

document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
        const itemData = this.getAttribute("data-item").split(" - ");
        const itemName = itemData[0].trim();
        const itemPrice = itemData[1].trim();
        const existingItemIndex = cart.findIndex(item => item.name === itemName);
  
        if (existingItemIndex !== -1) {
          cart[existingItemIndex].quantity++;
        } else {
          cart.push({ name: itemName, price: itemPrice, quantity: 1 });
        }
  
        localStorage.setItem("cart", JSON.stringify(cart));
      });
    });
  });
  
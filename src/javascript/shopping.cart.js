import { getProducts } from "./products.js";

const cartItems = JSON.parse(localStorage.getItem("cartList"));
const cartContainer = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");

let total = 0;
cartItems.forEach(function (cartElement) {
    cartContainer.innerHTML += `
    
            <div class="cart-item">
            <h4>${cartElement.title}</h4>
            <img src="${cartElement.image.url}" alt="${cartElement.image.alt}" class="cart-image checkout-product-img">
            <p class="product-price">${cartElement.discountedPrice}<p>
            </div>`;
})
totalContainer.innerHTML =
    `<div class="summary-detail-box">
<p>Total: ${total}</p>
</div > <div class="checkout-continue">
          <a href="./payment-details.html" class="pay-now-button cta">Pay now</a>
          <a href="./products-page.html" class="continue">Continue shopping</a>
        </div>`
import { groupById } from "./helpers.js";
import { clearLocalStorage } from "./shopping-cart.js";
import { cartArray } from "./shopping-cart.js";

const clearLocalStorageButton = document.getElementById("clear-local-storage-btn")

clearLocalStorageButton?.addEventListener("click", () => {
    clearLocalStorage();
    window.location.href = "../index.html"
})


function showOrderSummary(cartArray) {
    const confirmationOrderSummary = confirmation.querySelector(".confirmation-order-summary")
    const confirmationTotal = confirmation.querySelector(".confirmation-total")

    if (!confirmationOrderSummary || !confirmationTotal) return

    confirmationOrderSummary.innerHTML = ""

    if (!cartArray || cartArray.length === 0) {
        confirmationOrderSummary.innerHTML = "<p>Your cart is empty.</p>"
        confirmationTotal.innerHTML = `<div class="summary-box"><p>Total: 0.00</p>`
        return
    }

    let total = 0;
    const grouped = groupById(cartArray);

    grouped.forEach(item => {
        const itemPrice = item.discountedPrice ?? item.price
        const itemTotal = itemPrice
        total += itemTotal * item.quantity

        confirmationOrderSummary.innerHTML += `<div class="cart-item">
                <img src="${item.image.url}" alt="${item.image.alt}" 
                     class="cart-image checkout-product-img">
                <div><div class="cart-name-qty-price">
                    <h4>${item.title}</h4>
                    <p class="item-number product-price">Qty: ${item.quantity}</p>
                    <p class="product-price">$${itemPrice.toFixed(2)}</p>
                </div>
                </div>
            </div>`

    });

    confirmationTotal.innerHTML = `<div class="summary-box"><p>Total: $${total.toFixed(2)}</p>`
}

showOrderSummary(cartArray)

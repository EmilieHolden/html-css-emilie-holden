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

    let total = 0
    const grouped = new Map()

    cartArray.forEach(item => {

        if (grouped.has(item.id)) {
            grouped.get(item.id).quantity += 1
        } else {
            grouped.set(item.id, {
                ...item,
                quantity: 1
            })
        }
    })

    grouped.forEach(item => {
        const itemPrice = item.discountedPrice ?? item.price
        const itemTotal = itemPrice * item.quantity
        total += itemTotal

        confirmationOrderSummary.innerHTML += `<div class="cart-item">
                <img src="${item.image.url}" alt="${item.image.alt}" 
                     class="cart-image checkout-product-img">
                <div>
                    <h4>${item.title}</h4>
                    <p class="item-number">Quantity: ${item.quantity}</p>
                    <p class="product-price">Price: $${itemPrice}</p>
                    <p class="product-price">Subtotal: $${itemTotal.toFixed(2)}</p>
                </div>
            </div>`

    });

    confirmationTotal.innerHTML = `<div class="summary-box"><p>Total: $${total.toFixed(2)}</p>`
}

showOrderSummary(cartArray)

import { groupById, getPath } from "./helpers.js"

export let cartArray = JSON.parse(localStorage.getItem("cartList")) || []

function renderCart(container, totalContainer) {
    if (!container || !totalContainer) return

    container.innerHTML = ""
    let total = 0;
    const grouped = groupById(cartArray);

    if (!cartArray || cartArray.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>"
        totalContainer.innerHTML = `<div class="summary-box"><p>Total: 0.00</p>`
        return
    }

    grouped.forEach(item => {
        const itemPrice = item.discountedPrice ?? item.price
        const itemTotal = itemPrice
        total += itemTotal * item.quantity

        container.innerHTML += `
    <div class="cart-item"><img src="${item.image.url}" alt="${item.image.alt}" class="cart-image checkout-product-img"><div class="cart-name-qty-price"><h4>${item.title}</h4><div class="cart-buttons">
     <button class="remove-btn add-remove-btn" data-id="${item.id}">-</button>
     <p class="item-number">${item.quantity}</p>
    <button class="increase-btn add-remove-btn" data-id="${item.id}">+</button>
      <button class="remove-all-btn add-remove-btn" data-id="${item.id}">X</button></div>
      <p class="product-price">$${item.discountedPrice ?? item.price}</p></div>
    </div>`;
    });


    const removeButtons = container.querySelectorAll(".remove-btn")

    removeButtons.forEach(button => {
        const id = button.dataset.id
        removeFromCart(id, button)
    })

    const increaseButtons = container.querySelectorAll(".increase-btn")

    increaseButtons.forEach(button => {
        const id = button.dataset.id
        increaseProductInCart(id, button)
    });

    const removeAllButton = container.querySelectorAll(".remove-all-btn")

    removeAllButton.forEach(button => {
        const id = button.dataset.id
        removeAllProducts(id, button)
    })

    const paymentDetailsCart = container.classList.contains("payment-details-cart")


    if (container.classList.contains("cart-list-page")) {

        totalContainer.innerHTML = `
      <div class="summary-box">
        <p>Total: $${total.toFixed(2)}</p>
      </div>
      <div class="checkout-continue">
      ${paymentDetailsCart ? '' : `<a href="${getPath("payment-details.html")}" class="pay-now-button cta">Pay now</a>`}
        <a href="./products-page.html" class="continue">Continue shopping</a>
      </div>`
    } else {

        totalContainer.innerHTML = `
      <div class="summary-box">
        <p>Total: $${total.toFixed(2)}</p>
      </div>
      <div class="checkout-continue">
        <a href="${getPath("shopping-cart.html")}" class="cta">Go to cart</a>
      </div>`
    }
}


export function updateCart() {
    const dropdownCart = document.querySelector(".cart-dropdown .cart-list")
    const dropdownTotal = document.querySelector(".cart-dropdown .total")

    const pageCart = document.querySelector(".cart-list-page")
    const pageTotal = document.querySelector(".total-page")

    renderCart(dropdownCart, dropdownTotal)
    renderCart(pageCart, pageTotal)

}

function removeFromCart(id, button) {
    button.addEventListener("click", () => {
        const item = cartArray.find(product => product.id === id)
        if (item) {
            for (let i = 0; i < cartArray.length; i += 1) {
                if (cartArray[i].id === item.id) {
                    cartArray.splice(i, 1);
                    localStorage.setItem("cartList", JSON.stringify(cartArray))
                    break
                }
            }
            updateCart(cartArray)
            updateCartCount()
        }
    })

}

function increaseProductInCart(id, button) {
    button.addEventListener("click", () => {
        const item = cartArray.find(product => product.id === id)
        if (item) {
            cartArray.push(item)
            localStorage.setItem("cartList", JSON.stringify(cartArray))
            updateCart(cartArray)
            updateCartCount()
        }
    });
}

function removeAllProducts(productId, button) {
    button.addEventListener("click", () => {
        cartArray = cartArray.filter(product => product.id !== productId)
        localStorage.setItem("cartList", JSON.stringify(cartArray))
        updateCart(cartArray)
        updateCartCount()
    })

}

export function clearLocalStorage() {
    localStorage.removeItem("cartList")
    cartArray = []
}


updateCart(cartArray)
updateCartCount()

const cartToggleBtn = document.getElementById("cart-toggle")
const cartDropdown = document.querySelector(".cart-dropdown")

if (cartToggleBtn && cartDropdown) {
    cartToggleBtn.addEventListener("click", () => {
        cartDropdown.classList.toggle("hidden")
    })
}

export function updateCartCount() {
    const counter = document.querySelector(".cart-toggle-btn .cart-count");
    if (!counter) return;

    const cart = JSON.parse(localStorage.getItem("cartList")) || [];
    const count = cart.length;

    counter.textContent = count;
    counter.hidden = count === 0;
}

updateCartCount();

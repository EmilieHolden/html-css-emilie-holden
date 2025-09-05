import { getProducts } from "./products.js";

const cartItems = JSON.parse(localStorage.getItem("cartList"));
export let cartArray = JSON.parse(localStorage.getItem("cartList")) || [];

export function showCart(cartItems) {
    const cartContainer = document.querySelector(".cart-list");
    const totalContainer = document.querySelector(".total");

    if (!cartContainer || !totalContainer) return;

    cartContainer.innerHTML = "";
    let total = 0;
    const grouped = new Map();

    cartItems.forEach(item => {
        total += item.discountedPrice ?? item.price;

        if (grouped.has(item.id)) {
            grouped.get(item.id).quantity += 1;
        } else {
            grouped.set(item.id, {
                ...item,
                quantity: 1
            })
        }
    })

    grouped.forEach(item => {
        cartContainer.innerHTML += `
        <div class="cart-item">
        <span class="cart-count" id="cart-count">items in cart</span>
        <h4>${item.title}</h4>
        <img src="${item.image.url}" alt="${item.image.alt}" class="cart-image checkout-product-img"><p class="product-price">Price: ${item.discountedPrice ?? item.price}</p><button class="increase-btn" data-id="${item.id}">+</button><p>${item.quantity}</p><button class="remove-btn" data-id="${item.id}">-</button>
        </div>`;

    })

    const removeButtons = cartContainer.querySelectorAll(".remove-btn")

    removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            const item = cartArray.find(product => product.id === id)
            if (item) {
                removeFromCart(item);
                showCart(cartArray, cartContainer, totalContainer)
            }
        })
    })

    const increaseButtons = cartContainer.querySelectorAll(".increase-btn")

    increaseButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            const item = cartArray.find(product => product.id === id)
            if (item) {
                cartArray.push(item);
                localStorage.setItem("cartList", JSON.stringify(cartArray))
                showCart(cartArray)
            }
        })
    })


    totalContainer.innerHTML =
        `<div class="summary-detail-box">
<p>Total: ${total.toFixed(2)}</p>
</div > <div class="checkout-continue">
          <a href="./payment-details.html" class="pay-now-button cta">Pay now</a>
          <a href="./products-page.html" class="continue">Continue shopping</a>
        </div>`
}

export function removeFromCart(item) {
    for (let i = 0; i < cartArray.length; i += 1) {
        if (cartArray[i].id === item.id) {
            cartArray.splice(i, 1);
            localStorage.setItem("cartList", JSON.stringify(cartArray));
            break
        }

    }
}

const cartCount = document.getElementById("cart-count")
if (cartCount) {
    cartCount.textContent = cartArray.length
}


showCart(cartArray)
updateCartCount()
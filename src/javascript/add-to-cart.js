import { cartArray, showCart } from "./shopping-cart.js";

export function addToCart(addToCartButton, products) {
    addToCartButton.onclick = function (event) {
        event.preventDefault();
        const itemToAdd = products.find(item => item.id === event.target.dataset.product)

        cartArray.push(itemToAdd);
        showCart(cartArray);
        localStorage.setItem("cartList", JSON.stringify(cartArray));

        const originalTextAddToCartButton = addToCartButton.textContent
        addToCartButton.textContent = "Added to cart"
        addToCartButton.classList.add("add-to-cart-btn-added")

        setTimeout(() => {
            addToCartButton.textContent = originalTextAddToCartButton
            addToCartButton.disabled = false
        }, 2000)
    }
}

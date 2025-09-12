import { cartArray, updateCart } from "./shopping-cart.js";
import { addToCart } from "./script.js";


const container = document.querySelector("#productDetailsContainer")
const API_URL = "https://v2.api.noroff.dev/rainy-days"

async function fetchAndCreateProduct() {
    try {
        const params = new URLSearchParams(window.location.search)
        const id = params.get("id")

        if (!id) {
            container.textContent = "No product ID provided!"
            return
        }

        const response = await fetch(`${API_URL}/${id}`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        const product = data.data

        if (!product || !product.image || !product.image.url) {
            container.textContent = "Product data is incomplete or not found."
            return
        }

        const productDetailsContainer = document.createElement("div")
        const productDiv = document.createElement("div")
        const descriptionDiv = document.createElement("div")
        const image = document.createElement("img")
        const title = document.createElement("h2")
        const price = document.createElement("p")
        const description = document.createElement("p")
        const addToCartButton = document.createElement("button")

        productDetailsContainer.className = 'product-details-container'
        productDiv.className = 'product-details'
        descriptionDiv.className = 'description-and-add-to-cart-btn'
        image.className = 'product-image'
        title.className = 'product-details-title'
        price.className = 'product-price'
        description.className = 'product-description'
        addToCartButton.className = 'add-to-cart-button cta'

        image.src = product.image.url
        image.alt = product.image.alt
        title.textContent = product.title
        price.textContent = `$${product.price}`
        description.textContent = product.description
        addToCartButton.textContent = "Add to cart";
        addToCartButton.setAttribute("data-product", product.id)

        addToCart(addToCartButton, [product])

        productDiv.appendChild(image)
        descriptionDiv.appendChild(title)
        descriptionDiv.appendChild(description)
        descriptionDiv.appendChild(price)
        descriptionDiv.appendChild(addToCartButton)

        productDetailsContainer.appendChild(productDiv)
        productDetailsContainer.appendChild(descriptionDiv)

        container.appendChild(productDetailsContainer)

    } catch (error) {
        console.error("Failed to fetch product", error)
        container.textContent = 'Failed to load product'
    }
}

fetchAndCreateProduct()
updateCart(cartArray);
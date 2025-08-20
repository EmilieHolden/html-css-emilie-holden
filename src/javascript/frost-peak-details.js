const container = document.querySelector("#container")
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

        const productDiv = document.createElement("div")
        const image = document.createElement("img")
        const title = document.createElement("h2")
        const price = document.createElement("p")
        const description = document.createElement("p")
        const backButton = document.createElement("a")

        productDiv.className = 'product-details'
        image.className = 'product-image'
        title.className = 'product-title'
        price.className = 'product-price'
        description.className = 'product-description'
        backButton.className = 'back-button'

        image.src = product.image.url
        image.alt = product.image.alt
        title.textContent = product.title
        price.textContent = `$${product.price}`
        description.textContent = product.description
        backButton.textContent = 'Back to Products'
        backButton.href = '../index.html'

        productDiv.appendChild(image)
        productDiv.appendChild(title)
        productDiv.appendChild(price)
        productDiv.appendChild(description)
        productDiv.appendChild(backButton)

        container.appendChild(productDiv)
    } catch (error) {
        console.error("Failed to fetch product", error)
        container.textContent = 'Failed to load product'
    }
}

fetchAndCreateProduct()
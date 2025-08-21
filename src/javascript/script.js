const container = document.querySelector("#container")
const API_URL = "https://v2.api.noroff.dev/rainy-days"

function getProductLink(productId) {
    const currentFile = window.location.href.split("/").pop();

    if (currentFile === "index.html" || currentFile === "") {
        return `./src/frost-peak-details.html?id=${productId}`;
    } else {
        return `./frost-peak-details.html?id=${productId}`;
    }
}

async function fetchAndCreateProducts(params) {

}

async function fetchAndCreateProducts() {
    try {
        const response = await fetch(API_URL)
        const data = await response.json()
        const products = data.data

        products.forEach(product => {
            const card = document.createElement("div")
            const image = document.createElement("img")
            const content = document.createElement("div")
            const title = document.createElement("h2")
            const price = document.createElement("p")
            const discountedPrice = document.createElement("p")
            const anchor = document.createElement("a")

            card.className = 'card'
            image.className = 'card-image'
            content.className = 'card-content'
            title.className = 'card-title'
            price.className = 'card-price'
            discountedPrice.className = 'card-discounted-price'

            image.src = product.image.url
            image.alt = product.image.alt
            title.textContent = product.title
            price.textContent = product.price
            discountedPrice.textContent = product.discountedPrice
            anchor.href = getProductLink(product.id);


            content.appendChild(title)
            content.appendChild(price)
            content.appendChild(discountedPrice)
            card.appendChild(image)
            card.appendChild(content)
            anchor.appendChild(card)

            container.appendChild(anchor)
        })
    } catch (error) {
        console.error("Failed to fetch and create products", error)
        container.textContent = 'Failed to load products'
    }
}

fetchAndCreateProducts()

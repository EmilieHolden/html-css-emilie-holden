const container = document.querySelector("#container")
const API_URL = "https://v2.api.noroff.dev/rainy-days"

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
            const anchor = document.createElement("a")

            card.className = 'card'
            image.className = 'card-image'
            content.className = 'card-content'
            title.className = 'card-title'
            price.className = 'card-price'

            image.src = product.image.url
            image.alt = product.image.alt
            title.textContent = product.title
            price.textContent = product.price
            anchor.href = `src/frost-peak-details.html?id=${product.id}`


            content.appendChild(title)
            content.appendChild(price)
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

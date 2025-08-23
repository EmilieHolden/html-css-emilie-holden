const container = document.querySelector("#container")
const API_URL = "https://v2.api.noroff.dev/rainy-days"
const cart = document.querySelector(".cart")
const cartList = document.querySelector(".cart-list")
const totalContainer = document.querySelector(".total")
let cartArray = [];

function getProductLink(productId) {
    const currentFile = window.location.href.split("/").pop();

    if (currentFile === "index.html" || currentFile === "") {
        return `./src/frost-peak-details.html?id=${productId}`;
    } else {
        return `./frost-peak-details.html?id=${productId}`;
    }
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
            const addToCartButton = document.createElement("button")
            //const anchor = document.createElement("a")

            card.className = 'card'
            image.className = 'card-image'
            content.className = 'card-content'
            title.className = 'card-title'
            price.className = 'card-price'
            discountedPrice.className = 'card-discounted-price'
            addToCartButton.className = 'add-to-cart-button'

            image.src = product.image.url
            image.alt = product.image.alt
            title.textContent = product.title
            price.textContent = product.price
            discountedPrice.textContent = product.discountedPrice
            addToCartButton.textContent = "Add to cart";
            addToCartButton.setAttribute("data-product", product.id)

            addToCartButton.onclick = function (event) {
                const itemToAdd = products.find(item => item.id === event.target.dataset.product);
                cartArray.push(itemToAdd);
                showCart(cartArray);
                localStorage.setItem("cartList", JSON.stringify(cartArray));
            }

            content.appendChild(title)
            content.appendChild(price)
            content.appendChild(discountedPrice)
            card.appendChild(image)
            card.appendChild(content)
            content.appendChild(addToCartButton)
            // anchor.appendChild(card)

            //container.appendChild(anchor)

            container.appendChild(card)

        })

        // anchor.href = getProductLink(product.id);






    } catch (error) {
        console.error("Failed to fetch and create products", error)
        container.textContent = 'Failed to load products'
    }

}

function showCart(cartItems) {
    cart.style.display = "block";
    cartList.innerHTML = "";
    let total = 0;
    cartItems.forEach(function (cartElement) {
        total += cartElement.price;
        cartList.innerHTML += `
            <div class="cart-item">
            <h4>${cartElement.title}</h4>
            <img src="${cartElement.image.url}" alt="${cartElement.image.alt}" class="cart-image">
            </div>`;


    })
    totalContainer.innerHTML = `Total: ${total}`;
}

fetchAndCreateProducts()




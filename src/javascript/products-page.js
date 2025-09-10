import { getProducts } from "./products.js";
import { cartArray, showCart } from "./shopping-cart.js";



const container = document.querySelector("#container")
let loading = false


function getProductLink(productId) {
    const currentFile = window.location.href.split("/").pop();

    if (currentFile === "index.html" || currentFile === "") {
        return `./src/frost-peak-details.html?id=${productId}`;
    } else {
        return `./frost-peak-details.html?id=${productId}`;
    }
}


async function fetchAndCreateProducts(filteredProducts = null) {

    try {
        loading = true
        container.innerHTML = "<p>Loading...</p>";

        // For debugging loading/delaying fetch: await new Promise(resolve => setTimeout(resolve, 1000));
        const data = await getProducts();
        let products = data.data

        if (filteredProducts) {
            products = filteredProducts
        }

        container.innerHTML = "";

        products.forEach(product => {
            const card = document.createElement("a")
            const image = document.createElement("img")
            const content = document.createElement("div")
            const title = document.createElement("h2")
            const price = document.createElement("p")
            const discountedPrice = document.createElement("p")
            const addToCartButton = document.createElement("button")

            card.className = 'card'
            image.className = 'card-image'
            content.className = 'card-content'
            title.className = 'card-title'
            price.className = 'card-price'
            discountedPrice.className = 'card-discounted-price'
            addToCartButton.className = 'add-to-cart-button cta'

            card.href = getProductLink(product.id);
            image.src = product.image.url
            image.alt = product.image.alt
            title.textContent = product.title
            price.textContent = product.price
            discountedPrice.textContent = product.discountedPrice
            addToCartButton.textContent = "Add to cart";
            addToCartButton.setAttribute("data-product", product.id)

            if (product.onSale) {
                content.appendChild(discountedPrice)
            } else {
                content.appendChild(price)
            }

            content.appendChild(title)
            card.appendChild(image)
            card.appendChild(content)
            content.appendChild(addToCartButton)
            container.appendChild(card)

            addToCart(addToCartButton, products)


        })
    } catch (error) {
        console.error("Failed to fetch and create products", error)
        container.textContent = 'Failed to load products'
    } finally {
        loading = false
    }

}



function addToCart(addToCartButton, products) {
    addToCartButton.onclick = function (event) {
        event.preventDefault();
        const itemToAdd = products.find(item => item.id === event.target.dataset.product);
        cartArray.push(itemToAdd);
        showCart(cartArray);
        localStorage.setItem("cartList", JSON.stringify(cartArray));
    }
}



const filterAll = document.getElementById("filter-all");
const filterWomen = document.getElementById("filter-women");
const filterMen = document.getElementById("filter-men");
const filterSale = document.getElementById("filter-sale");

const data = await getProducts();
let allProducts = data.data || [];

function setActiveFilter(clickedButton) {
    const filterButtons = document.querySelectorAll(".category")
    filterButtons.forEach(button => button.classList.remove("active"))
    clickedButton.classList.add("active")
}

filterAll.addEventListener("click", () => {
    setActiveFilter(filterAll)
    fetchAndCreateProducts(allProducts);
});

filterWomen.addEventListener("click", () => {
    setActiveFilter(filterWomen)
    const filtered = allProducts.filter(product => product.gender?.toLowerCase() === "female");
    fetchAndCreateProducts(filtered);
});

filterMen.addEventListener("click", () => {
    setActiveFilter(filterMen)
    const filtered = allProducts.filter(product => product.gender?.toLowerCase() === "male");
    fetchAndCreateProducts(filtered);
});

filterSale.addEventListener("click", () => {
    setActiveFilter(filterSale)
    const filtered = allProducts.filter(product => product.onSale === true);
    fetchAndCreateProducts(filtered);
});

showCart(cartArray);









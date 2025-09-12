import { getProducts } from "./get-products.js";
import { fetchAndCreateProducts } from "./script.js";
import { cartArray, updateCart } from "./shopping-cart.js";


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

updateCart(cartArray);









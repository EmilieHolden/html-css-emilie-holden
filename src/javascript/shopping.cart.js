import { getProducts } from "./products.js";

getProducts().then(data => {
    console.log("Fetch data in products.js:", data);

});

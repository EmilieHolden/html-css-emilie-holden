import { clearLocalStorage } from "./shopping-cart.js";

const clearLocalStorageButton = document.getElementById("clear-local-storage-btn")

clearLocalStorageButton?.addEventListener("click", () => {
    clearLocalStorage();
    window.location.href = "../index.html"
})
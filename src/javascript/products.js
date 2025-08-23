export async function getProducts() {
    const API_URL = "https://v2.api.noroff.dev/rainy-days"

    try {
        const response = await fetch(API_URL)

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json()
        return data;

    } catch (error) {
        console.error("Failed to fetch products", error)


    }

}
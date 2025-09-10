export function getPath(file) {
    if (window.location.pathname.includes("/src/")) {
        return `./${file}`
    } else {
        return `src/${file}`
    }
}
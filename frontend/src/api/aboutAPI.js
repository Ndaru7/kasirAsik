

export const getAbout = async () => {
    const response = await fetch("http://localhost:8000/kasir/about");
    return response.json()
}
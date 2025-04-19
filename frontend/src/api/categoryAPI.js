


export const getCategory = async() => {
    const response = await fetch("http://localhost:8000/kasir/category/")
    return response.json();
}
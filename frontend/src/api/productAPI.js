


export const getProducts = async()=>{
    const response = await fetch("http://localhost:8000/kasir/products/")
    return response.json();
}
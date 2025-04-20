


export const getDetailTransaction = async() => {
    const response = await fetch("http://localhost:8000/kasir/detail_transaction/")
    return response.json();
}
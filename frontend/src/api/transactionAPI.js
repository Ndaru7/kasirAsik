


export const getTransaction = async () => {
    const response  = await fetch("http://localhost:8000/kasir/transaction/")
    return response.json()
}





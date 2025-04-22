


export const getTransaction = async (payload) => {
    const response  = await fetch("http://localhost:8000/kasir/transaction/")
    return response.json()
}


export const addTransaction = async() => {
    return await fetch("http://localhost:8000/kasir/transaction/", {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(payload)
    });

    if(!response.ok){
        throw new Error("Failed to create transaction")
    }
    return response.json()

}
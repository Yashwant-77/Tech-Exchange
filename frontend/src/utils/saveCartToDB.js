


const saveCartToDB = async (cartItems) => {
    await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
        },
        body : JSON.stringify({cartItems})
    })
}


export default saveCartToDB;
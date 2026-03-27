function placeOrder(){
    const address = document.getElementById("address").value;

    if(!address){
        alert("Enter address ❌");
        return;
    }

    alert("Order Placed Successfully 🎉");

    localStorage.removeItem("cart");

    window.location.href = "../index.html";
}
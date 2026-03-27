let id = localStorage.getItem("selectedProduct");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

fetch("../data.json")
.then(res => res.json())
.then(data => {
    let p = data.find(x => x.id == id);

    document.getElementById("img").src = p.image;
    document.getElementById("name").innerText = p.name;
    document.getElementById("price").innerText = "₹" + p.price;

    document.getElementById("cart-btn").onclick = () => {
        cart.push(p);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart");
    };

    document.getElementById("wish").onclick = () => {
        wishlist.push(p);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Added to wishlist");
    };
});
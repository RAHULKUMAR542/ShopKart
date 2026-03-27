let products = [];
let cart = [];
let wishlist = [];

const grid = document.getElementById("product-grid");
const cartBox = document.getElementById("cart-items");
const wishlistBox = document.getElementById("wishlist-items");

// LOAD ON START
window.addEventListener("DOMContentLoaded", () => {

    cart = JSON.parse(localStorage.getItem("cart")) || [];
    wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    updateCartCount();
    updateWishlistCount();
    updateCartDisplay();
    updateWishlist();

    loadProducts();
});

// LOAD PRODUCTS
function loadProducts(){
    fetch("data.json")
    .then(res => res.json())
    .then(data => {
        products = data;
        displayProducts(products);
    });
}

// DISPLAY PRODUCTS
function displayProducts(data){
    grid.innerHTML = "";

    data.forEach(p => {

        const isInWishlist = wishlist.some(item => item.id === p.id);

        grid.innerHTML += `
        <div class="product-card">
            <img src="${p.image}">
            
            <p><b>${p.name}</b></p>

            <p>
                ₹${p.price}
                ${p.originalPrice ? `<span style="text-decoration:line-through;color:gray;">₹${p.originalPrice}</span>` : ""}
            </p>

            <p class="rating">⭐ ${p.rating} (${p.reviews})</p>

            <p class="category">${p.category}</p>

            <button onclick="addToCart(${p.id})">
                Add to Cart
            </button>

            <button onclick="toggleWishlist(${p.id})">
                ${isInWishlist ? "❤️" : "🤍"}
            </button>
        </div>
        `;
    });
}

// ADD TO CART
function addToCart(id){
    const product = products.find(p => p.id === id);

    const exist = cart.find(item => item.id === id);

    if(exist){
        exist.quantity++;
    } else {
        cart.push({...product, quantity:1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    updateCartDisplay();
}

// REMOVE CART
function removeFromCart(id){
    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    updateCartDisplay();
}

// SHOW CART
function updateCartDisplay(){
    cartBox.innerHTML = "";

    cart.forEach(item => {
        cartBox.innerHTML += `
        <div class="product-card">
            <img src="${item.image}">
            <p>${item.name}</p>
            <p>₹${item.price}</p>
            <p>Qty: ${item.quantity}</p>

            <button onclick="removeFromCart(${item.id})">
                ❌ Remove
            </button>
        </div>
        `;
    });
}

// UPDATE CART COUNT
function updateCartCount(){
    const total = cart.reduce((sum,item)=> sum + item.quantity,0);
    document.getElementById("cart-count").innerText = total;
}

// TOGGLE WISHLIST
function toggleWishlist(id){
    const product = products.find(p => p.id === id);

    const index = wishlist.findIndex(item => item.id === id);

    if(index > -1){
        wishlist.splice(index,1);
    } else {
        wishlist.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateWishlistCount();
    updateWishlist();
    displayProducts(products);
}

// SHOW WISHLIST
function updateWishlist(){
    wishlistBox.innerHTML = "";

    wishlist.forEach(item=>{
        wishlistBox.innerHTML += `
        <div class="product-card">
            <img src="${item.image}">
            <p>${item.name}</p>
            <p>₹${item.price}</p>

            <button onclick="addToCart(${item.id})">
                Add to Cart
            </button>

            <button onclick="toggleWishlist(${item.id})">
                ❌ Remove
            </button>
        </div>
        `;
    });
}

// UPDATE WISHLIST COUNT
function updateWishlistCount(){
    document.getElementById("wishlist-count").innerText = wishlist.length;
}
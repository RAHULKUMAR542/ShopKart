let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cart-container");
const totalEl = document.getElementById("total");

function displayCart(){
    container.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        container.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}">
            <div>
                <p>${item.name}</p>
                <p>₹${item.price}</p>

                <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                ${item.quantity}
                <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>

                <br>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        </div>
        `;
    });

    totalEl.innerText = total;
}

function changeQty(id, val){
    const item = cart.find(i => i.id === id);

    item.quantity += val;

    if(item.quantity <= 0){
        removeItem(id);
    }

    saveCart();
}

function removeItem(id){
    cart = cart.filter(i => i.id !== id);
    saveCart();
}

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// GO TO CHECKOUT
function goToCheckout(){
    window.location.href = "checkout.html";
}

displayCart();
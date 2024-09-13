document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});


document.addEventListener('DOMContentLoaded', function() {
    // Função para buscar detalhes do produto
    async function fetchProductDetails(id) {
        try {
            const response = await fetch('db.json');
            const products = await response.json();
            const product = products.find(p => p.id === parseInt(id));

            if (product) {
                displayProductDetails(product);
            } else {
                console.error('Produto não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar detalhes do produto:', error);
        }
    }

    // Função para exibir detalhes do produto
    function displayProductDetails(product) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${product.image}" alt="${product.title}" class="img-fluid">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h2 class="card-title">${product.title}</h2>
                        <p class="card-text">${product.description}</p>
                        <p class="price">${product.price}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Obter o id do produto da URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetchProductDetails(productId);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});

function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    
    if (!cartContainer || !cartTotal || !cartEmptyMessage) {
        console.error('Um ou mais elementos não foram encontrados no DOM.');
        return;
    }

    cartContainer.innerHTML = '';
    let total = 0;
    
    if (cartItems.length === 0) {
        cartEmptyMessage.style.display = 'block';
        cartTotal.innerHTML = 'Total: R$ 0,00';
    } else {
        cartEmptyMessage.style.display = 'none';
        
        cartItems.forEach(item => {
            const price = parseFloat(item.price);
            if (isNaN(price)) {
                console.error(`Preço inválido para o item com ID ${item.id}: ${item.price}`);
                return;
            }
            total += item.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'col-md-4 mb-3';
            cartItem.innerHTML = `
                <div class="card">
                    <img src="${item.image}" class="card-img-top" alt="${item.title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="price">Preço: R$ ${item.price.toFixed(2)}</p>
                        <input type="number" class="form-control mb-2" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                        <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remover</button>
                    </div>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });
        
        cartTotal.innerHTML = `Total: R$ ${total.toFixed(2)}`;
    }
}

function updateQuantity(id, quantity) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = parseInt(quantity, 10);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCart();
    }
}

function removeFromCart(id) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCart();
}

function clearCart() {
    localStorage.removeItem('cartItems');
    loadCart();
}


// const cartContainer = document.getElementById('cart-container');
// const cartStatus = document.getElementById('cart-status');
// const cartItems = document.getElementById('cart-items');
// const cartTotal = document.getElementById('cart-total');
// const clearCartButton = document.getElementById('clear-cart');

function addToCart(productId) {
    fetch('db.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingProduct = cartItems.find(item => item.id === productId);

            if (existingProduct) {
                existingProduct.quantity++;
                alert('Adicionado ao carrinho')
            } else {
                cartItems.push({ ...product, quantity: 1 });
                alert('Adicionado ao carrinho')
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        });
}

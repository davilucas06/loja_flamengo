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
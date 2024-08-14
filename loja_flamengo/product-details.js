document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    async function fetchProductDetails() {
        try {
            const response = await fetch('http://localhost:3000/db.json');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            const product = data.products.find(p => p.id === parseInt(productId));

            if (product) {
                document.getElementById('product-details').innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h2 class="card-title">${product.name}</h2>
                                <p class="card-text">${product.description}</p>
                                <p class="price">R$ ${product.price.toFixed(2)}</p>
                                <button class="btn btn-primary" onclick="addToCart(${product.id})">
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                document.getElementById('product-details').innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        Produto não encontrado.
                    </div>
                `;
            }
        } catch (error) {
            console.error('Erro ao buscar os detalhes do produto:', error);
            document.getElementById('product-details').innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Ocorreu um erro ao carregar os detalhes do produto.
                </div>
            `;
        }
    }

    fetchProductDetails();
});

function addToCart(productId) {
    console.log(`Produto ${productId} adicionado ao carrinho`);
}

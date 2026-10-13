async function MainProducts() {
    // Variavéis DOM
    let produtosCadastrados = document.getElementById('idprodutosCadastrados');
    let produtosCadastrados2 = document.getElementById('idprodutosCadastrados2');
    let quantCategoria = document.getElementById('idquantCategoria');
    let unidadeEstoque = document.getElementById('idUnidadeEstoque');
    let lowProdutos = document.getElementById('idlowProdutos');

    // Requisição HTTP
    const fetchAPi = await fetch("http://localhost:3000/produtos");
    const JsonApi = await fetchAPi.json();

    // Buscando os resultados
    const quantidadeProdutos = JsonApi.length;
    quantCategoria.textContent = new Set(JsonApi.map(produto => produto.categoria)).size;
    const QuantidadeEstoque = JsonApi.reduce((acumulador, obj) => acumulador + obj.quantidade, 0);
    const Abaixo_Estoque = JsonApi.filter(p => p.quantidade < 1).length;

    // Manipulando o Dom
    produtosCadastrados.innerHTML = quantidadeProdutos;
    produtosCadastrados2.innerHTML = quantidadeProdutos;
    unidadeEstoque.innerHTML = QuantidadeEstoque;
    lowProdutos.innerHTML = Abaixo_Estoque;

}

// Calling the functions
MainProducts();
MainProducts().catch(error => {
    console.error('Erro ao carregar os produtos:', error);
});

async function buscarProduto() {
    // Dados do Input e ID
    let inputBuscarID = document.getElementById('busca');
    let buscar = inputBuscarID.value;
    let tbody = document.getElementById('lista_items');

    // Requisição HTTP
    const fetchAPi = await fetch("http://localhost:3000/produtos");
    const JsonApi = await fetchAPi.json();

    // Adiconando o DOM junto ao map()
    // Utilizar operador ternário para os emojis
    tbody.innerHTML = JsonApi.map(item => `
        <tr>
            <td><div class="product-cell"><span class="product-thumb thumb-blue" aria-hidden="true">⌁</span><span><strong>${item.nome}</strong><small>ID #${item.idProduto} · ${item.descricao}</small></span></div></td>
            <td><span class="category-pill">${item.categoria}</span></td>
            <td class="price">R$ ${item.preco}</td>
            <td><span class="stock good-stock"><i></i> ${item.quantidade} un.</span></td>
            <td><div class="row-actions"><a href="#editar-produto" aria-label="Editar Mouse USB">Editar</a><a class="delete-action" href="#excluir-produto" aria-label="Excluir Mouse USB">Excluir</a></div></td>
        </tr>
    `).join("");
}

buscarProduto();
buscarProduto().catch(error => {
    console.error('Erro ao carregar os produtos:', error);
})
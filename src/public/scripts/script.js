async function MainProducts() {
    // Variavéis DOM
    let produtosCadastrados = document.getElementById('idprodutosCadastrados');
    let produtosCadastrados2 = document.getElementById('idprodutosCadastrados2');
    let quantCategoria = document.getElementById('idquantCategoria');
    let unidadeEstoque = document.getElementById('idUnidadeEstoque');
    let lowProdutos = document.getElementById('idlowProdutos');

    // Requisição HTTP
    const response = await fetch("http://localhost:3000/produtos");
    const produtos = await response.json();

    // Buscando os resultados
    const quantidadeProdutos = produtos.length;
    quantCategoria.textContent = new Set(produtos.map(produto => produto.categoria)).size;
    const QuantidadeEstoque = produtos.reduce((acumulador, obj) => acumulador + obj.quantidade, 0);
    const Abaixo_Estoque = produtos.filter(p => p.quantidade < 5).length;

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
    let buscar = inputBuscarID.value.toLowerCase();
    let tbody = document.getElementById('lista_items');

    // Requisição HTTP
    const response = await fetch("http://localhost:3000/produtos");
    const produtos = await response.json();

    // Emojis
    const emojis = {
        Periféricos: "⌁",
        Monitores: "▭",
        Cabos: "⌁",
        Armazenamento: "▰"
    };

    // Filtrar os Dados na hora da pesquisa
    const filterProdutos = produtos.filter((produto) => {
    // Garante que o ID vire string para não dar erro caso seja número
    const matchId = String(produto.idProduto).toLowerCase().includes(buscar);
    const matchName = produto.nome.toLowerCase().includes(buscar);
    const matchCategoria = produto.categoria.toLowerCase().includes(buscar);

    // Se o input estiver vazio, retorna true para mostrar todos os itens
    if (!buscar || buscar.trim() === "") {
        return true; 
    }

    return matchId || matchName || matchCategoria;
});

    // Adiconando o DOM junto ao map()
    // Utilizar operador ternário para os emojis
    tbody.innerHTML = filterProdutos.map(item => `
        <tr>
            <td><div class="product-cell"><span class="product-thumb thumb-${item.categoria}" aria-hidden="true">${emojis[item.categoria]}</span><span><strong>${item.nome}</strong><small>ID #0${item.idProduto} · ${item.descricao}</small></span></div></td>
            <td><span class="category-${item.categoria}">${item.categoria}</span></td>
            <td class="price">R$ ${item.preco}</td>
            <td><span class="stock good-stock"><i></i> ${item.quantidade} un.</span></td>
            <td><div class="row-actions"><a href="#editar-produto" aria-label="Editar Mouse USB">Editar</a><a class="delete-action" href="#excluir-produto" aria-label="Excluir Mouse USB">Excluir</a></div></td>
        </tr>
    `).join("");
}

buscarProduto();
buscarProduto().catch(error => {
    console.error('Erro ao carregar os produtos:', error);
});


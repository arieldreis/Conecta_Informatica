async function painelDados(){
    // Variavéis DOM
    // Produtos Gerais
    let produtosCadastrados = document.getElementById('IDCadastrados');
    let quantCategoria = document.getElementById('IDQuantCategoria');
    let unidadeEstoque = document.getElementById('IDUnidadeEstoque');
    let lowProdutos = document.getElementById('IDLowProducts');

    // Categoria de Produtos
    let perifericosID = document.getElementById('IDperifericos');
    let monitoresID = document.getElementById('IDmonitores');
    let cabosID = document.getElementById('IDcabos');
    let armazenamentoID = document.getElementById('IDarmazenamento');

    // Requisição HTTP
    const response = await fetch("http://localhost:3000/produtos");
    const produtos = await response.json();

    // ID DE PRODUTOS ABAIXO DO ESTOQUE
    let lowStockCard = document.getElementById('low_stock_list');
    let FiltercardLowStock = produtos.filter((produto) => {
        return produto.quantidade < 5
    });

    // Variavéis que armazena os dados da PAI.
    let quantidade = produtos.length;
    let estoque = produtos.reduce((acumulador, atual) => {
        return acumulador + atual.quantidade
    }, 0);
    let abaixoEstoque = produtos.filter((produto) => produto.quantidade < 5).length;

    // Categorias
    const perifericos = produtos.filter((perififerico) => {
        return perififerico.categoria === "Periféricos"
    });

    const monitores = produtos.filter((monitor) => {
        return monitor.categoria === "Monitores"
    });

    const cabos = produtos.filter((cabo) => {
        return cabo.categoria === "Cabos"
    });

    const armazenamentos = produtos.filter((armazenamento) => {
        return armazenamento.categoria === "Armazenamento"
    });

    // Resposta DOM
    // CARDS
    produtosCadastrados.innerHTML = quantidade;
    unidadeEstoque.innerHTML = estoque;
    quantCategoria.textContent = new Set(produtos.map(produto => produto.categoria)).size;
    lowProdutos.innerHTML = abaixoEstoque;
    lowStockCard.innerHTML  = FiltercardLowStock.map((item) => `
        <li>
            <span class="stock-alert-icon" aria-hidden="true">!</span>
            <span class="stock-alert-name">
                <strong>${item.nome}</strong>
                <small>${item.categoria} · ID #0${item.idProduto}</small>
            </span>
            <span class="stock-amount empty-amount">${item.quantidade} un.</span>
        </li>
    `).join("");
    
    // TABELA DE PRODUTOS POR CATEGORIA
    perifericosID.innerHTML = perifericos.length;
    monitoresID.innerHTML = monitores.length;
    cabosID.innerHTML = cabos.length;
    armazenamentoID.innerHTML = armazenamentos.length;

    // Mostrar os registros mais recentes 
    // Emojis
    const emojis = {
        Periféricos: "⌁",
        Monitores: "▭",
        Cabos: "⌁",
        Armazenamento: "▰"
    };
    const produtosRecentes = [...produtos].sort((a, b) => Number(b.idProduto) - Number(a.idProduto)).slice(0, 4);
    const idRecentes = document.getElementById('IDprodutosRecentes');
    idRecentes.innerHTML = produtosRecentes.map((item) => `
        <tr>
            <td>
                <div class="product-cell">
                    <span class="product-thumb thumb-blue" aria-hidden="true">${emojis[item.categoria]}</span>
                    <span>
                        <strong>${item.nome}</strong>
                        <small>ID #0${item.idProduto}</small>
                    </span>
                </div>
            </td>
            <td>
                <span class="category-pill">${item.categoria}</span>
            </td>
            <td class="price">R$ ${Number(item.preco).toFixed(2).replace('.', ',')}</td>
            <td>
                <span class="stock good-stock"><i></i>${item.quantidade} un.</span>
            </td>
        </tr>
    `).join("");
}

painelDados();
painelDados().catch(error => {
    console.error("Erro! Ao realizar a requisição HTTP: ", error);
});
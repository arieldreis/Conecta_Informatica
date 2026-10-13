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
            <td>
                <div class="product-cell">
                    <span class="product-thumb thumb-${item.categoria}" aria-hidden="true">${emojis[item.categoria]}</span>
                    <span>
                        <strong>${item.nome}</strong>
                        <small>ID #0${item.idProduto} · ${item.descricao}</small>
                    </span>
                </div>
            </td>
            <td>
                <span class="category-${item.categoria}">${item.categoria}</span>
            </td>
            <td class="price">R$ ${Number(item.preco).toFixed(2).replace('.', ',')}</td>
            <td>
                <span class="stock good-stock"><i></i> ${item.quantidade} un.</span>
            </td>
            <td>
                <div class="row-actions">
                    <a href="#editar-produto" data-id="${item.idProduto}" class="editar-produto">Editar</a>
                    <a class="delete-action" href="#excluir-produto" aria-label="Excluir Mouse USB">Excluir</a>
                </div>
            </td>
        </tr>
    `).join("");
}

buscarProduto();
buscarProduto().catch(error => {
    console.error('Erro ao carregar os produtos:', error);
});

async function updateProducts(id) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`);

    if(!response.ok){
        throw new Error("Não foi possível buscar o produto id.");
    }

    const produtos = await response.json();
    const categorias = ['Periféricos', 'Monitores', 'Cabos', 'Armazenamento'];
    let editarProduct = document.getElementById('editar-produto');

    editarProduct.innerHTML = `
        <div class="modal-card edit-modal">
            <a class="modal-close" href="#produtos" aria-label="Fechar edição">×</a>
            <span class="section-kicker">PRODUTO #${produtos.idProduto}</span>
            <h2 id="edit-title">Editar produto</h2>

            <form class="modal-form">
                <label for="edit-nome">Nome do produto</label>
                <input id="edit-nome" type="text" value="${produtos.nome}" name="nome" required>

                <label for="edit-descricao">Descrição</label>
                <textarea id="edit-descricao" name="descricao">${produtos.descricao ?? ''}</textarea>

                <label for="edit-categoria">Categoria</label>
                <select id="edit-categoria" required name="categoria">
                    ${categorias.map(categoria => `
                        <option value="${categoria}"
                            ${produtos.categoria === categoria ? 'selected' : ''}>
                            ${categoria}
                        </option>
                    `).join('')}
                </select>

                <label for="edit-preco">Preço</label>
                <input id="edit-preco" type="number"
                    value="${produtos.preco}" min="0.01" step="0.01" name="preco" required>

                <label for="edit-quantidade">Quantidade em estoque</label>
                <input id="edit-quantidade" type="number"
                    value="${produtos.quantidade}" min="0" step="1" name="quantidade" required>
            </form>
        </div>
    `;
}

const tbody = document.getElementById('lista_items');

tbody.addEventListener('click', async event => {
    const link = event.target.closest('.editar-produto');

    if (!link) return;

    event.preventDefault();

    try {
        await updateProducts(link.dataset.id);
        window.location.hash = '#editar-produto';
    } catch (error) {
        console.error('Erro ao carregar produto para edição:', error);
    }
});

async function salvarAlteracoesProduto(id, dados) {
    const response = await fetch(
        `http://localhost:3000/produtos/alterar/${id}`,
        {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        }
    );

    const produtos = await response.json();

    if (!response.ok) {
        throw new Error(resultado.message || 'Não foi possível atualizar o produto.');
    }

    return resultado;
}
// 
salvarAlteracoesProduto();

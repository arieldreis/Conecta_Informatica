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
    window.location.href = "http://localhost:3000/pages/ErrorServer"
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
                    <a class="delete-action" href="#excluir-produto" aria-label="Excluir Mouse USB" data-id="${item.idProduto}">Excluir</a>
                </div>
            </td>
        </tr>
    `).join("");
}

buscarProduto();
buscarProduto().catch(error => {
    console.error('Erro ao carregar os produtos:', error);
    window.location.href = "http://localhost:3000/pages/ErrorServer"
});

// Guarda os dados que vieram do banco para comparar com o formulário ao salvar.
let produtoOriginal = null;

async function updateProducts(id) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`);

    if(!response.ok){
        throw new Error(`Não foi possível buscar o produto ${id}.`);
    }

    const produto = await response.json();
    // Mantemos uma cópia do estado inicial para detectar quais campos mudaram.
    produtoOriginal = { ...produto };
    const categorias = ['Periféricos', 'Monitores', 'Cabos', 'Armazenamento'];
    const editarProduct = document.getElementById('editar-produto');
    editarProduct.dataset.id = produto.idProduto;

    editarProduct.innerHTML = `
        <div class="modal-card edit-modal">
            <a class="modal-close" href="#produtos" aria-label="Fechar edição">×</a>
            <span class="section-kicker">PRODUTO #${produto.idProduto}</span>
            <h2 id="edit-title">Editar produto</h2>

            <form id="form-editar-produto" class="modal-form">
                <label for="edit-nome">Nome do produto</label>
                <input id="edit-nome" type="text" value="${produto.nome}" name="nome" required>

                <label for="edit-descricao">Descrição</label>
                <textarea id="edit-descricao" name="descricao">${produto.descricao ?? ''}</textarea>

                <label for="edit-categoria">Categoria</label>
                <select id="edit-categoria" required name="categoria">
                    ${categorias.map(categoria => `
                        <option value="${categoria}"
                            ${produto.categoria === categoria ? 'selected' : ''}>
                            ${categoria}
                        </option>
                    `).join('')}
                </select>

                <label for="edit-preco">Preço</label>
                <input id="edit-preco" type="number"
                    value="${produto.preco}" min="0.01" step="0.01" name="preco" required>

                <label for="edit-quantidade">Quantidade em estoque</label>
                <input id="edit-quantidade" type="number"
                    value="${produto.quantidade}" min="0" step="1" name="quantidade" required>
                <div class="modal-actions">
                    <a class="button button-secondary" href="#produtos">Cancelar</a>
                    <button class="button button-primary" type="submit">Salvar alterações</button>
                </div>
            </form>
        </div>
    `;
}

const tbody = document.getElementById('lista_items');
let produtoParaExcluir = null;

tbody.addEventListener('click', async event => {
    const linkEditar = event.target.closest('.editar-produto');

    if (linkEditar) {
        event.preventDefault();

        try {
            await updateProducts(linkEditar.dataset.id);
            window.location.hash = '#editar-produto';
        } catch (error) {
            console.error('Erro ao carregar produto para edição:', error);
            window.location.href = 'http://localhost:3000/pages/ErrorServer';
        }

        return;
    }

    const linkExcluir = event.target.closest('.delete-action');

    if (linkExcluir) {
        // Guarda ID e nome para usar na confirmação do modal.
        const linhaProduto = linkExcluir.closest('tr');
        produtoParaExcluir = {
            id: linkExcluir.dataset.id,
            nome: linhaProduto.querySelector('.product-cell strong').textContent.trim()
        };

        // Atualiza o texto do modal com o nome desta linha.
        document.getElementById('delete-product-name').textContent = produtoParaExcluir.nome;
        // Não chamamos preventDefault: o href abre o modal de confirmação.
    }
});

async function salvarAlteracoesProduto(id, dados) {
    const response = await fetch(
        `http://localhost:3000/produtos/alterar/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        }
    );

    const resultado = await response.json();

    if (!response.ok) {
        throw new Error(resultado.message || 'Não foi possível atualizar o produto.');
    }

    return resultado;
}
function obterAlteracoes() {
    const atual = {
        nome: document.getElementById('edit-nome').value.trim(),
        descricao: document.getElementById('edit-descricao').value.trim(),
        categoria: document.getElementById('edit-categoria').value,
        preco: Number(document.getElementById('edit-preco').value),
        quantidade: Number(document.getElementById('edit-quantidade').value)
    }

    const original = {
        nome: produtoOriginal.nome,
        descricao: produtoOriginal.descricao ?? '',
        categoria: produtoOriginal.categoria,
        preco: Number(produtoOriginal.preco),
        quantidade: Number(produtoOriginal.quantidade)
    }

    return Object.fromEntries(
        Object.entries(atual).filter(([campo, valor]) => valor !== original[campo])
    );
}

// Como o formulário é criado dinamicamente, escutamos o envio no modal que já existe.
const editarProduct = document.getElementById('editar-produto');

editarProduct.addEventListener('submit', async event => {
    if (event.target.id !== 'form-editar-produto') return;

    // Impede o navegador de recarregar a página e enviar um POST tradicional.
    event.preventDefault();

    const id = editarProduct.dataset.id;
    const alteracoes = obterAlteracoes();

    if (Object.keys(alteracoes).length === 0) {
        console.log('Nenhum campo foi alterado.');
        return;
    }

    try {
        await salvarAlteracoesProduto(id, alteracoes);
        window.location.href = 'http://localhost:3000/pages/success';
        await buscarProduto();
        await MainProducts();
    } catch ( error ) {
        console.error('Erro ao salvar as alterações:', error);
        window.location.href = "http://localhost:3000/pages/ErrorServer"
    }
});

// DELETAR PRODUTOS
const botaoConfirmar = document.querySelector(
    '#excluir-produto .button-danger'
);

botaoConfirmar.addEventListener('click', async () => {
    if (!produtoParaExcluir) return;
    try {
        const response = await fetch(
            `http://localhost:3000/produtos/deletar/${produtoParaExcluir.id}`,
            {
                method: 'DELETE'
            }
        );
        const resultado = await response.json();

        if (!response.ok) {
            throw new Error(
                resultado.message ||
                resultado.mensagem ||
                'Não foi possível excluir o produto.'
            );
        }

        produtoParaExcluir = null;
        window.location.href = 'http://localhost:3000/pages/success';
    } catch (error) {
        console.error('Erro na requisição DELETE:', error);
        window.location.href = 'http://localhost:3000/pages/ErrorServer';
    }
});

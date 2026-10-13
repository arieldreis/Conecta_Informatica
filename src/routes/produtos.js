import { Router } from 'express';
import { connection as db } from '../config/connectiondb.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const [ rows ] = await db.query('SELECT * FROM produtos');
        return res.status(200).json(rows);
    } catch ( error ) {
        console.error('Erro ao buscar produtos:', error);
        return res.status(500).json({
            success: false,
            message: 'Desculpe, ocorreu um erro interno no servidor.'
        });
    }
});

router.get('/:id', async (req, res) => {
    try{
        // Converte o id que está em formato de string para o tipo Number
        const id = Number(req.params.id);

        // Busco todoa os dados da tabela `produtos`
        const [ rows ] = await db.query('SELECT * FROM produtos');

        {
            /*
            Utilizo a função find() para encontrar o id quando eu 
            digitar dentro da próprio endpois da api usando uma comparação
            */
        }
        const seekId =  rows.find(p => p.idProduto === id);
        
        // Por final tranformo esse dados para o formato JSON para exibir no browser
        // O bloco condicional tem como função verificar se o produto existe caso não exista irá exibir uma mensagem de erro. 
        if(!seekId){
            return res.status(404).json({
                status: 404,
                message: "O produto não foi encontrado"
            });
        }
        return res.status(200).json(seekId);

    } catch ( error ){
        console.error('Erro ao buscar produtos:', error);
        return res.status(500).json({
            success: false,
            message: 'Desculpe, ocorreu um erro interno no servidor.'
        });
    }
});

router.post('/cadastrar', async (req, res) => {
    // Colunas que seram cadastradas.
    const { nome, descricao, categoria, preco, quantidade } = req.body;
    const PageSuccess = "http://localhost:3000/pages/success";
    const ErrorServer = "http://localhost:3000/pages/ErrorServer";
    try{
        // Verificar se todos os produtos foram cadastrados.
        if( !nome || !categoria || preco === undefined || preco === '' || quantidade === undefined || quantidade === '' ){
            return res.status(400).json({
                success: false,
                message: "Preencha os campos obrigatórios."
            });
        }
        // Cadastrar o produto
        const [ create ] = await db.query(`
            INSERT INTO produtos(nome, descricao, categoria, preco, quantidade) VALUES(?, ?, ?, ?, ?)`, 
            [nome, descricao, categoria, preco, quantidade]
        );

        // Caso o produto seja cadastrado com sucesso.
        // rows.affectedRows > 0 essa linha de código é utilizada caso o número de alteração de linha seja maior que zero.
        // "affectedRows" esse comando é utilizado no banco de dados.
        if( create.affectedRows > 0 ){
            return res.redirect(PageSuccess);
        }

    } catch ( error ){
        console.error('Erro ao cadastar produtos:', error);
        return res.status(500).redirect(ErrorServer);
    }
});

router.patch('/alterar/:id', async (req, res) => {
    // Colunas que seram cadastradas.
    const id = Number(req.params.id);
    const camposPermitidos = ['nome', 'descricao', 'categoria', 'preco', 'quantidade']; // Alterar apenas esses campos 
    const camposRecebidos = camposPermitidos.filter(campo =>
        Object.hasOwn(req.body, campo)
    );

    if ( camposRecebidos.length === 0 ) {
        return res.status(400).json({
            success: false,
            message: 'Envie pelo menos um campo para alterar.'
        });
    }

    try{
        const atualizacao = camposRecebidos
            .map(campo => `\`${campo}\` = ?`)
            .join(', ');
        const valores = camposRecebidos.map(campo => req.body[campo]);

        const [ updateData ] = await db.query(`
            UPDATE produtos SET ${atualizacao} WHERE idProduto = ?
        `, [...valores, id]);

        // Caso nenhuma seja alterada no banco de dados sinal que o id não existe.
        if( updateData.affectedRows === 0 ){
            return res.status(404).send({
                success: false,
                mensagem: "Usuário não encontrado."
            });
        }

        // Caso o id exista o essa condição será excutada.
        if( updateData.affectedRows > 0 ){
            return res.status(200).json({
                success: true,
                message: "Produto alterado com sucesso."
            });
        }

    } catch ( error ) { 
        console.error('Erro ao alterar o produto:', error);
        return res.status(500).json({
            success: false,
            message: 'Desculpe, ocorreu um erro interno no servidor.'
        });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    const id = Number(req.params.id);
    try{
        const [ deleteQuery ] = await db.query(`
            DELETE FROM produtos
            WHERE idProduto = ?
        `, [id]);

        // Caso o id existe o produto será excluído com sucesso
        if(deleteQuery.affectedRows > 0){
            res.status(200).json({
                success: true,
                message: "Produto excluído com sucesso."
            });
        } else {
            return res.status(404).send({
                success: false,
                mensagem: "Usuário não encontrado."
            });
        }

    } catch ( error ){
        console.error('Erro ao deletar o produto:', error);
        return res.status(500).json({
            success: false,
            message: 'Desculpe, ocorreu um erro interno no servidor.'
        });
    }
    
});


export default router;

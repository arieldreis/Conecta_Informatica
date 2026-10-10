import { Router } from 'express';
import { connection as db } from '../config/connectiondb.js';
import path from 'path';

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

        {/*
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
    try{
        // Verificar se todos os produtos foram cadastrados.
        if(!nome || !categoria || preco === undefined || preco === '' || quantidade === undefined || quantidade === ''){
            return res.status(400).json({
                success: false,
                message: "Preencha os campos obrigatórios."
            });
        }
        // Cadastrar o produto
        const [ rows ] = await db.query(`
            INSERT INTO produtos(nome, descricao, categoria, preco, quantidade) VALUES(?, ?, ?, ?, ?)`, 
            [nome, descricao, categoria, preco, quantidade]
        );

        // Caso o produto seja cadastrado com sucesso.
        return res.status(201).json({
            success: true,
            message: "Produto cadastrado com sucesso."
        });

    } catch ( error ){
        console.error('Erro ao cadastar produtos:', error);
        return res.status(500).json({
            success: false,
            message: 'Desculpe, ocorreu um erro interno no servidor.'
        });
    }
});
router.put('/:id', (req, res) => {});
router.delete('/:id', (req, res) => {});

export default router;

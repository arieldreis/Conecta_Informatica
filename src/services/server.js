import 'dotenv/config'
import express from "express";
import { connection as db } from './connectiondb.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.get('/produtos', async (req, res) => {
    try{
        const [ rows ] = await db.query(
            'SELECT * FROM Conecta_Informatica'
        );

        if(rows){
            return res.status(200).json(rows);
        }

    } catch ( error ) {
        console.error("Erro ao realizar a requisição: ", error);
        res.status(500).json({
            success: false,
            message: "Desculpe, ocorreu um erro interno no servidor."
        });
    }
});
app.get('/produtos/:id', (req, res) => {});
app.post('/produtos', (req, res) => {});
app.put('/produtos/:id', (req, res) => {});
app.delete('/produtos/:id', (req, res) => {});

app.listen(PORT, () => {
    console.log(`Servidor ativo na porta http://localhost:${PORT}`);
});

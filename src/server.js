import express from 'express';
import produtosRouter from './routes/produtos.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para receber dados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, './public/pages')));

// Rotas
app.use('/produtos', produtosRouter);


app.listen(PORT, () => {
    console.log(`Servidor ativo na porta http://localhost:${PORT}`);
});

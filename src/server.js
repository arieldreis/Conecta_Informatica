import express from 'express';
import produtosRouter from './routes/produtos.js';
import pages from './routes/pages.js';
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
app.use('/styles', express.static(path.join(__dirname, './public/styles')));
app.use('/scripts', express.static(path.join(__dirname, './public/scripts')));

// Rotas
app.use('/produtos', produtosRouter);
app.use('/pages', pages);


app.listen(PORT, () => {
    console.log(`Servidor ativo na porta http://localhost:${PORT}`);
});

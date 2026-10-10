import express from 'express';
import produtosRouter from './routes/produtos.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/produtos', produtosRouter);


app.listen(PORT, () => {
    console.log(`Servidor ativo na porta http://localhost:${PORT}`);
});

import { Router } from "express";
import path from 'path';
import { fileURLToPath } from "url";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rota para as paginas htmls
router.get('/Home', (req, res) => {
    res.sendFile(path.join(__dirname, '..',  'public', 'pages', 'index.html'));
});
router.get('/NotFound', (req, res) => {
    res.sendFile(path.join(__dirname, '..',  'public', 'pages', '404.html'));
});
router.get('/ErrorServer', (req, res) => {
    res.sendFile(path.join(__dirname, '..',  'public', 'pages', '500.html'));
});
router.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, '..',  'public', 'pages', 'sucesso.html'));
});

export default router;
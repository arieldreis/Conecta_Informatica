CREATE DATABASE `Conecta_Informatica`
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_general_ci;

USE `Conecta_Informatica`;

CREATE TABLE IF NOT EXISTS `produtos`(
	`idProduto` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` VARCHAR(255),
    `categoria` VARCHAR(50),
    `preco` DECIMAL(10, 2) NOT NULL CHECK(`preco` > 0),
    `quantidade` INT NOT NULL CHECK(`quantidade` >= 0)
)DEFAULT CHARSET = utf8;

-- Aleterando os dados de algumas colunas 
ALTER TABLE `produtos`
ADD CONSTRAINT `preco` CHECK(`preco` > 0);

ALTER TABLE `produtos`
ADD CONSTRAINT `quantidade` CHECK(`quantidade` >= 0);

ALTER TABLE `produtos`
MODIFY COLUMN `categoria` 
VARCHAR(60) NOT NULL;

-- Inserindo os dados dentro das tuplas
INSERT INTO produtos
    (nome, descricao, categoria, preco, quantidade)
VALUES
    ('Mouse USB',
     'Mouse óptico com conexão USB',
     'Periféricos', 45.90, 10),

    ('Mouse sem fio',
     'Mouse sem fio com receptor USB',
     'Periféricos', 79.90, 25),

    ('Mouse gamer',
     'Mouse gamer com ajuste de sensibilidade',
     'Periféricos', 149.90, 8),

    ('Teclado USB',
     'Teclado padrão ABNT2 com conexão USB',
     'Periféricos', 59.90, 30),

    ('Teclado sem fio',
     'Teclado sem fio padrão ABNT2',
     'Periféricos', 129.90, 12),

    ('Teclado mecânico',
     'Teclado mecânico com iluminação',
     'Periféricos', 289.90, 5),

    ('Kit teclado e mouse',
     'Conjunto de teclado e mouse com conexão USB',
     'Periféricos', 99.90, 18),

    ('Webcam HD',
     'Webcam com resolução HD e microfone integrado',
     'Periféricos', 119.90, 7),

    ('Webcam Full HD',
     'Webcam com resolução Full HD',
     'Periféricos', 219.90, 0),

    ('Headset USB',
     'Fone de ouvido com microfone e conexão USB',
     'Periféricos', 159.90, 14),

    ('Caixas de som',
     'Par de caixas de som com alimentação USB',
     'Periféricos', 69.90, 22),

    ('Mousepad',
     'Mousepad com base antiderrapante',
     'Periféricos', 19.90, 60),

    ('Monitor 19 polegadas',
     'Monitor LED de 19 polegadas com entrada HDMI',
     'Monitores', 499.90, 6),

    ('Monitor 22 polegadas',
     'Monitor LED de 22 polegadas Full HD',
     'Monitores', 699.90, 11),

    ('Monitor 24 polegadas',
     'Monitor de 24 polegadas com painel IPS',
     'Monitores', 899.90, 9),

    ('Monitor 27 polegadas',
     'Monitor de 27 polegadas com resolução QHD',
     'Monitores', 1599.90, 3),

    ('Monitor gamer 24 polegadas',
     'Monitor Full HD com taxa de atualização de 144 Hz',
     'Monitores', 1299.90, 4),

    ('Monitor ultrawide',
     'Monitor ultrawide de 29 polegadas',
     'Monitores', 1799.90, 0),

    ('Cabo HDMI 1 metro',
     'Cabo HDMI com comprimento de 1 metro',
     'Cabos', 24.90, 80),

    ('Cabo HDMI 3 metros',
     'Cabo HDMI com comprimento de 3 metros',
     'Cabos', 39.90, 45),

    ('Cabo USB tipo C',
     'Cabo USB tipo C para carga e transferência de dados',
     'Cabos', 29.90, 100),

    ('Cabo de rede 2 metros',
     'Cabo de rede categoria CAT6 de 2 metros',
     'Cabos', 18.50, 75),

    ('Cabo de rede 5 metros',
     'Cabo de rede categoria CAT6 de 5 metros',
     'Cabos', 32.90, 40),

    ('Cabo DisplayPort',
     'Cabo DisplayPort com comprimento de 2 metros',
     'Cabos', 64.90, 16),

    ('Pendrive 32 GB',
     'Pendrive USB com capacidade de 32 GB',
     'Armazenamento', 34.90, 55),

    ('Pendrive 64 GB',
     'Pendrive USB com capacidade de 64 GB',
     'Armazenamento', 49.90, 35),

    ('Cartão de memória 128 GB',
     'Cartão microSD com adaptador e capacidade de 128 GB',
     'Armazenamento', 89.90, 20),

    ('SSD SATA 480 GB',
     'SSD SATA de 2,5 polegadas com capacidade de 480 GB',
     'Armazenamento', 249.90, 13),

    ('SSD NVMe 1 TB',
     'SSD M.2 NVMe com capacidade de 1 TB',
     'Armazenamento', 499.90, 7),

    ('HD externo 2 TB',
     'HD externo com conexão USB e capacidade de 2 TB',
     'Armazenamento', 459.90, 10);

UPDATE `produtos`
SET descricao = "Hub USB com quatro portas para conectar dispositivos"
WHERE idProduto = "35";

DELETE FROM `produtos`
WHERE idProduto = "34";

SELECT count(*) AS quant FROM `produtos` WHERE quantidade < 5;

SELECT * FROM `produtos`;

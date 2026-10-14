# Conecta Informática

Sistema de cadastro e consulta de produtos desenvolvido como projeto prático para exercitar operações CRUD, integração entre front-end, API Node.js e banco de dados MySQL.

## Funcionalidades

- Painel com totais de produtos, categorias e unidades em estoque.
- Cadastro de produtos.
- Listagem e busca por nome, categoria ou ID.
- Edição de um ou mais campos com PATCH.
- Exclusão de produtos com confirmação.
- Páginas de sucesso, não encontrado e erro do servidor.
- Menu lateral responsivo.

## Tecnologias

- HTML e CSS
- JavaScript no navegador
- Node.js e Express
- MySQL, usando `mysql2/promise`
- `dotenv` para carregar configurações do ambiente

## Requisitos

- Node.js e npm
- MySQL em execução

## Configuração

1. Instale as dependências na pasta do projeto:

   ```bash
   npm install
   ```

2. Copie `.env.example` para um arquivo `.env` na raiz do projeto e preencha as configurações da sua máquina:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=Conecta_Informatica
   DB_PORT=3306
   PORT=3000
   ```

   Se o usuário do MySQL tiver senha, informe-a em `DB_PASSWORD`. O arquivo `.env` está no `.gitignore`; não o envie ao Git. Use `.env.example` para documentar as variáveis sem incluir credenciais pessoais.

3. Crie a estrutura e os dados de exemplo executando `src/databaseSCRIPT.sql` no MySQL, por exemplo pelo MySQL Workbench. O script cria o banco `Conecta_Informatica` e a tabela `produtos`.

   O script SQL inclui comandos demonstrativos de `UPDATE` e `DELETE` ao final. Revise esses comandos antes de executá-lo em um banco que já contenha dados. A criação do banco e os inserts de exemplo foram preparados para uma configuração inicial, não para serem executados repetidamente sem revisão.

## Executar o projeto

Inicie o servidor:

```bash
npm start
```

Por padrão, o servidor fica disponível em [http://localhost:3000](http://localhost:3000). Abra o catálogo em [http://localhost:3000/pages/Home](http://localhost:3000/pages/Home) ou o painel em [http://localhost:3000/pages/Painel](http://localhost:3000/pages/Painel).

As chamadas da interface estão configuradas para `http://localhost:3000`. Se alterar `PORT`, atualize também essas URLs no front-end.

## Páginas

| Endereço | Página |
| --- | --- |
| `/pages/Home` | Catálogo, cadastro e consulta de produtos |
| `/pages/Painel` | Resumo do estoque e produtos recentes |
| `/pages/NotFound` | Página visual de não encontrado |
| `/pages/ErrorServer` | Página visual de erro do servidor |
| `/pages/success` | Página visual de operação concluída |

## API de produtos

As rotas são montadas sob `/produtos`.

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/produtos` | Lista os produtos |
| `GET` | `/produtos/:id` | Busca um produto pelo ID |
| `POST` | `/produtos/cadastrar` | Cadastra um produto |
| `PATCH` | `/produtos/alterar/:id` | Atualiza somente os campos enviados |
| `DELETE` | `/produtos/deletar/:id` | Exclui um produto pelo ID |

O cadastro pelo formulário envia os campos `nome`, `descricao`, `categoria`, `preco` e `quantidade`. A rota PATCH aceita esses mesmos nomes no corpo JSON e altera apenas as propriedades recebidas. O DELETE não precisa de corpo: o ID é informado na URL.

Exemplo de corpo para alterar somente o preço:

```json
{
  "preco": 49.9
}
```

Para testar DELETE em uma ferramenta como Postman, selecione o método `DELETE`. Digitar a URL no navegador envia `GET`, não `DELETE`.

## Estrutura do projeto

```text
src/
├── config/
│   └── connectiondb.js   # Pool de conexões MySQL e configuração do dotenv
├── public/
│   ├── pages/            # Páginas HTML
│   ├── scripts/          # JavaScript do navegador
│   └── styles/           # Estilos CSS
├── routes/
│   ├── pages.js          # Rotas das páginas HTML
│   └── produtos.js       # API CRUD de produtos
├── databaseSCRIPT.sql    # Banco, tabela e dados demonstrativos
└── server.js             # Configuração e inicialização do Express
```

## Modelo de dados

A tabela `produtos` contém:

| Campo | Tipo | Regra principal |
| --- | --- | --- |
| `idProduto` | inteiro | Chave primária, incremento automático |
| `nome` | texto | Obrigatório, até 100 caracteres |
| `descricao` | texto | Opcional, até 255 caracteres |
| `categoria` | texto | Obrigatória |
| `preco` | decimal | Obrigatório e maior que zero |
| `quantidade` | inteiro | Obrigatória e igual ou maior que zero |

## Testes

O projeto ainda não possui testes automatizados configurados. O comando `npm test` permanece como o script padrão de placeholder do npm. Para validar manualmente a API, use Postman ou outra ferramenta de requisições HTTP e confira o método, o endpoint, o corpo enviado e o status retornado.

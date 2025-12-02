import express from 'express';
import pkg from 'pg';

const { Pool } = pkg;

const app = express();
const port = 3000;

// Middleware para permitir JSON
app.use(express.json());

// Conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: 'postgres',       // seu usuário do banco
  host: 'localhost',
  database: 'produtosdb', // nome do banco
  password: '1234',     // sua senha
  port: 5432,
});

// Testar conexão com o banco
try {
  await pool.connect();
  console.log('🟢 Conectado ao banco de dados!');
} catch (err) {
  console.error('🔴 Erro ao conectar no banco:', err);
}

// Rotas básicas
app.get('/', (req, res) => {
  res.send('API de Produtos funcionando 🚀');
});

// Listar produtos
app.get('/produtos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produtos');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Listar produtos
app.get('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM produtos WHERE id=$1', [id]);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
});

// Adicionar produto
app.post('/produtos', async (req, res) => {
    const { nome, preco } = req.body;
    console.log('request', req);
    
  try {
    const result = await pool.query(
      'INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING *',
      [nome, preco]
    );[[]]
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Atualizar produto
app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  try {
    const result = await pool.query(
      'UPDATE produtos SET nome=$1, preco=$2 WHERE id=$3 RETURNING *',
      [nome, preco, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Deletar produto
app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM produtos WHERE id=$1', [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
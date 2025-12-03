import express from 'express';

import './models/produtos.model.js';
import { sequelize } from './config/database.js';
import { Produto } from './models/produtos.model.js';

const HOST = '127.0.0.1'
const PORT = process.env.PORT || '5000'

const app = express();

// Middlewares
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API de Produtos funcionando 🚀');
})

app.post('/produto', async (req, res) => {
  try {
    const payload = await req.body;
    const novoProduto = await Produto.create(payload);
    
    res.status(201).json({ mensagem: 'Produto criado com sucesso', data: novoProduto });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o produto' });
  }
});

app.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json({ mensagem: 'Sucesso ao encontrar os produtos', size: produtos.length , data: produtos });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
})

async function start() {
  try {
    await sequelize.authenticate();
    console.log("🎉 Conectado ao Postgres Neon com sucesso!");

    await sequelize.sync();
    console.log("📦 Modelos sincronizados com o banco!");

    app.listen(PORT, () =>
      console.log(`🚀 Servidor rodando na porta http://${HOST}:${PORT}`)
    );
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
  }
}

start();
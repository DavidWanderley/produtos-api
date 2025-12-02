import express from 'express';

import './models/produtos.model.js';
import { sequelize } from './config/database.js';

const HOST = '127.0.0.1'
const PORT = '5000'

const app = express();

// Middlewares
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API de Produtos funcionando 🚀');
})

async function start() {
  try {
    await sequelize.authenticate();
    console.log("🎉 Conectado ao Postgres Neon com sucesso!");

    await sequelize.sync();
    console.log("📦 Modelos sincronizados com o banco!");

    app.listen(process.env.PORT, () =>
      console.log(`🚀 Servidor rodando na porta http://${HOST}:${PORT}`)
    );
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
  }
}

start();
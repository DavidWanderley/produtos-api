import pg from 'pg'
const { Pool, Client } = pg
 
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'produtosdb',
    password: '',
    port: 5432,
});

try {
    await pool.connect();
    console.log("Conectado ao banco de dados com sucesso!");
} catch (err) {
    console.error("Erro ao conectar ao banco de dados:", $(err));
}
 
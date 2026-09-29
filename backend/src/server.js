const express = require('express');

const deputadosRoutes = require('./routes/deputadosRoutes');

const app = express();

app.get('/', (request, response) => {
    response.send('Servidor funcionando!');
});

app.use('/deputados', deputadosRoutes);

app.listen(3001, () => {
    console.log('Servidor rodando em http://localhost:3001');
});
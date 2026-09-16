const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send('Servidor funcionando');
});

app.get('/deputados', async (request, response) => {
    try {
        const nome = request.query.nome;

        const url = new URL(
            'https://dadosabertos.camara.leg.br/api/v2/deputados'
        );

        if(nome) {
            url.searchParams.set('nome', nome);
        }

        const apiResponse = await fetch(url);

        const data = await apiResponse.json();

        const deputados = data.dados.map((deputado) => {
            return {
                id: deputado.id,
                nome: deputado.nome,
                partido: deputado.siglaPartido,
                uf: deputado.siglaUf,
                foto: deputado.urlfoto,
            };
        });

        response.json({
            deputados: deputados,
        });
    } catch (error) {
        response.status(500).json({
            erro: 'Erro ao buscar deputados'
        });
    }
});

app.get('/deputados/:id', async (request, response) => {
    try {
        const id = request.params.id;

        const apiResponse = await fetch(
            `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`
        );

        if (!apiResponse.ok) {
            return response.status(apiResponse.status).json({
                erro: 'Deputado não encontrado',
            });
        }

        const data = await apiResponse.json();

        const deputado = {
            id: data.dados.id,
            nome: data.dados.ultimoStatus.nome,
            nomeCivil: data.dados.nomeCivil,
            partido: data.dados.ultimoStatus.siglPartido,
            uf: data.dados.ultimoStatus.siglaUf,
            foto: data.dados.ultimoStatus.urlFoto,
            email: data.dados.ultimoStatus.email,
            situacao: data.dados.ultimoStatus.situacao,
        };

        response.json({
            deputado: deputado,
        });
    } catch (error) {
        response.status(500).json({
            erro: 'Erro ao buscar deputado',
        });
    }
});

app.listen(3001, () => {
    console.log('Servidor rodando em http://localhost:3001');
});

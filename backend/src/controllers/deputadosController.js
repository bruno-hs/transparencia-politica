async function buscarDeputados(request, response) {
    try {
        const nome = request.query.nome;

        const url = new URL(
            'https://dadosabertos.camara.leg.br/api/v2/deputados'
        );

        if (nome) {
            url.searchParams.set('nome', nome);
        }

        const apiResponse = await fetch(url);

        if (!apiResponse.ok) {
            return response.status(apiResponse.status).json({
                erro: 'Erro ao buscar deputados',
            });
        }

        const data = await apiResponse.json();

        if (data.dados.length === 0) {
            return response.status(404).json({
                erro: "Deputado não encontrado",
            });
        }

        const deputados = data.dados.map((deputado) => {
            return {
                id: deputado.id,
                nome: deputado.nome,
                partido: deputado.siglaPartido,
                uf: deputado.siglaUf,
                foto: deputado.urlFoto,
            };
        });

        response.json({
            deputados,
        });
    } catch (error) {
        response.status(500).json({
            erro: 'Erro ao buscar deputados',
        });
    }
}

async function buscarDeputadosPorId(request, response) {
    try {
        const id = request.params.id;

        const apiResponse = await fetch(
            `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`
        );

        if (!apiResponse.ok) {
            return response.status(apiResponse.status).json({
                erro: "Deputado não encontrado",
            });
        }

        const data = await apiResponse.json();

        const deputado = {
            id: data.dados.id,
            nome: data.dados.ultimosStatus.nome,
            nomeCivil: data.dados.nomeCivil,
            partido: data.dados.ultimosStatus.partido,
            uf: data.dados.ultimosStatus.siglaUf,
            foto: data.dados.ultimosStatus.urlFoto,
            email: data.dados.ultimosStatus.email,
            situacao: data.dados.ultimosStatus.situacao,
        };

        response.json({
            deputado,
        });
    } catch (error) {
        response.status(500).json({
            erro: "Erro ao buscar o deputado",
        });
    }
}

module.exports = {
    buscarDeputados,
    buscarDeputadosPorId,
};
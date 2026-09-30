const {
    buscarDeputadosService,
    buscarDeputadoPorIdService
} = require('../services/deputadosService');

async function buscarDeputados(request, response) {
    try {
        const nome = request.query.nome;

        const dados = await buscarDeputadosService(nome);

        if (dados.length === 0) {
            return response.status(404).json({
                erro: "Deputado não encontrado",
            });
        }

        const deputados = dados.map((deputado) => {
            return {
                id: deputado.id,
                nome: deputado.nome,
                partido: deputado.siglaPartido,
                uf: deputado.siglaUf,
                foto: deputado.urlFoto,
            };
        });

        return response.json({
            deputados,
        });
    } catch (error) {
        return response.status(500).json({
            erro: "Erro ao buscar deputado",
        });
    }
}

async function buscarDeputadosPorId(request, response) {
    try {
        const id = request.params.id;

        const dados = await buscarDeputadoPorIdService(id);

        const deputado = {
            id: dados.id,
            nome: dados.ultimoStatus.nome,
            nomeCivil: dados.nomeCivil,
            partido: dados.ultimoStatus.siglaPartido,
            uf: dados.ultimoStatus.siglaUf,
            foto: dados.ultimoStatus.urlFoto,
            email: dados.ultimoStatus.email,
            situacao: dados.ultimoStatus.situacao,
        };

        return response.json({
            deputado,
        });
    } catch (error) {
        console.log(error);

        return response.status(404).json({
            erro: 'Deputado não encontrado',
        });
    }
}

module.exports = {
    buscarDeputados,
    buscarDeputadosPorId,
};
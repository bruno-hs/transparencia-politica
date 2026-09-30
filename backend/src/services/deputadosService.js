async function buscarDeputadosService(nome) {
    const url = new URL(
        'https://dadosabertos.camara.leg.br/api/v2/deputados'
    );

    if (nome) {
        url.searchParams.set('nome', nome);
    }

    const apiResponse = await fetch(url);

    if (!apiResponse.ok) {
        throw new Error('Erro ao buscar deputados na API da Câmara');
    }

    const data = await apiResponse.json();

    return data.dados;
}

async function buscarDeputadoPorIdService(id) {
    const apiResponse = await fetch(
        `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`
    );

    if (!apiResponse.ok) {
        throw new Error('Deputado não encontrado');
    }

    const data = await apiResponse.json();

    return data.dados;
}

module.exports = {
    buscarDeputadosService,
    buscarDeputadoPorIdService,
};
let catalogoCompleto = []; 

const inputBusca = document.getElementById('input-busca');
const filtroPosicao = document.getElementById('filtro-posicao');
const listaJogadoresContainer = document.getElementById('listaJogadores');

document.addEventListener('DOMContentLoaded', () => {
    fetch('jogadores.json')
        .then(response => response.json())
        .then(dados => {
            catalogoCompleto = dados;
            renderizarLista(catalogoCompleto);
            popularFiltroPosicoes(); 
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
            listaJogadoresContainer.innerHTML = "<li>Não foi possível carregar os dados.</li>";
        });
});

function renderizarLista(jogadores) {
    listaJogadoresContainer.innerHTML = '';

    if (jogadores.length === 0) {
        listaJogadoresContainer.innerHTML = "<li>Nenhum jogador encontrado.</li>";
        return;
    }

    jogadores.forEach(jogador => {
        const listItem = document.createElement('li');
        listItem.classList.add('item-jogador');
        listItem.innerHTML = `
            <img src="${jogador.imagem}" alt="Foto de ${jogador.nome}">
            <div class="info">
                <h2>${jogador.nome}</h2>
                <p>${jogador.posicao} - ${jogador.time}</p>
            </div>
        `;
        listaJogadoresContainer.appendChild(listItem);
    });
}

function popularFiltroPosicoes() {

    const todasAsPosicoes = catalogoCompleto.map(jogador => jogador.posicao);
    
    const posicoesUnicas = [...new Set(todasAsPosicoes)];

    posicoesUnicas.forEach(posicao => {
        const option = document.createElement('option');
        option.value = posicao;
        option.textContent = posicao;
        filtroPosicao.appendChild(option);
    });
}

function filtrar() {

    const termoBusca = inputBusca.value.toLowerCase();
    const posicaoSelecionada = filtroPosicao.value; 

    const resultado = catalogoCompleto.filter(jogador => {
    
        const correspondeBusca = jogador.nome.toLowerCase().includes(termoBusca);

        const correspondePosicao = posicaoSelecionada === 'todas' || jogador.posicao === posicaoSelecionada;

        return correspondeBusca && correspondePosicao;
    });

    renderizarLista(resultado);
}
const botoesCarrossel = document.querySelectorAll(".botao");
const imagens = document.querySelectorAll(".imagem");
const informacoes = document.querySelectorAll(".informacoes");
let currentIndex = 0; // Mantém o controle do índice atual
let startX = 0;
let isDragging = false;

// Função principal para alterar o slide
function alterarSlide(indice) {
    desativarBotaoSelecionado();
    marcarBotaoSelecionado(botoesCarrossel[indice]);
    esconderImagemAtiva();
    mostrarImagemDeFundo(indice);
    esconderInformacoesAtivas();
    mostrarInformacoes(indice);
    currentIndex = indice; // Atualiza o índice atual
}

botoesCarrossel.forEach((botao, indice) => {
    botao.addEventListener('mouseover', () => {
        alterarSlide(indice);
    });
});

function marcarBotaoSelecionado(botao) {
    botao.classList.add("selecionado");
}

function mostrarInformacoes(indice) {
    informacoes[indice].classList.add("ativa");
}

function esconderInformacoesAtivas() {
    const informacoesAtiva = document.querySelector(".informacoes.ativa");
    if (informacoesAtiva) informacoesAtiva.classList.remove("ativa");
}

function mostrarImagemDeFundo(indice) {
    imagens[indice].classList.add("ativa");
}

function esconderImagemAtiva() {
    const imagemAtiva = document.querySelector(".imagem.ativa");
    if (imagemAtiva) imagemAtiva.classList.remove("ativa");
}

function desativarBotaoSelecionado() {
    const botaoSelecionado = document.querySelector(".botao.selecionado");
    if (botaoSelecionado) botaoSelecionado.classList.remove("selecionado");
}

// Função para iniciar o arrasto (tanto para mouse quanto para touch)
function iniciarArrasto(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
}

// Função para finalizar o arrasto e determinar o movimento
function finalizarArrasto(e) {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
    const swipeThreshold = 50; // Distância mínima para ser considerado um swipe

    if (startX > endX + swipeThreshold) {
        // Swipe para a esquerda
        let nextIndex = currentIndex + 1;
        if (nextIndex >= imagens.length) nextIndex = 0; // Volta ao primeiro slide
        alterarSlide(nextIndex);
    } else if (startX < endX - swipeThreshold) {
        // Swipe para a direita
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = imagens.length - 1; // Volta ao último slide
        alterarSlide(prevIndex);
    }
}

// Adiciona os eventos para mouse
document.addEventListener('mousedown', iniciarArrasto);
document.addEventListener('mousemove', (e) => {
    if (isDragging) e.preventDefault(); // Previne seleção de texto enquanto arrasta
});
document.addEventListener('mouseup', finalizarArrasto);

// Adiciona os eventos para touch
document.addEventListener('touchstart', iniciarArrasto);
document.addEventListener('touchmove', (e) => {
    if (isDragging) e.preventDefault(); // Previne comportamento padrão de scroll enquanto arrasta
});
document.addEventListener('touchend', finalizarArrasto);

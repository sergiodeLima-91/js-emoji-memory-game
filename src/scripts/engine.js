// 1 - GUARDANDO OS EMOJIS QUE SERÃO USADOS NOS CARDS (ITENS):
const emojis = [
    "😀",
    "😀",
    "😁",
    "😁",
    "😂",
    "😂",
    "🤣",
    "🤣",
    "😃",
    "😃",
    "😄",
    "😄"
];
// Guardando cartas selecionadas pelo usuário
let openCards = [];

// Selecionando emojis aleatoriamente:
    // De alguma forma, isto reforça a aleatoriedade dos emojis selecionados pela máquina.
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

// Desenhando os elementos na tela:
for (let i = 0; i < emojis.length; i++) {
    // Criando caixa dinamicamente e associando com elemento com uma tag DIV
    let box = document.createElement("div");
    // A classe "item" será associada aqui:
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;   
    // Pendurando na div principal "game":
    document.querySelector(".game").appendChild(box);
    playAudio("soundtrack")
}

//Tocar música de fundo
function playAudio(audioName) {
    const audio = new Audio(`./src/audio/${audioName}.mp3`);
    audio.volume = 0.2;
    audio.play();
}

 // Criando eventos de CLICK:
function handleClick() {
    if(openCards.length < 2) { // Dois porque a comparação é a cada duas cartas.
        // Sempre que um card for aberto, a classe boxOpen será criada
        this.classList.add("boxOpen");
        // Para guardar a carta no vetor
        openCards.push(this);
    }
    // Para comparar se as cartas abertas foram iguais (deu match)
    if (openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }

}
//Construindo a condição de pontuação
function checkMatch() {
    //Se os dois "innerHTML" forem iguais então adicione uma classe no openCard no índice zero chamada classList.
    if (openCards[0].innerHTML === openCards[1].innerHTML) { //innerHTML é a propriedade que armazena do emoji
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    // caso contrário, é preciso reverter do "openCards" o "boxOpen" que ele atribui ao vetor quando o card é clicado
    }else{
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    //Colocando condição de finalização do jogo:
    // Se a quantidade de divs da classe "boxMatch" for igual a quantidade de elementos dentro do vetor "emoji"...
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        //mostre a mensagem abaixo numa caixa de diálogo do browser:
        alert("Você venceu!");
    }
}
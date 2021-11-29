let musicas = [
  {
    titulo: "Guitar Solo",
    artista: "Andre Motta",
    src: "musicas/Digital Ghosts - Unicorn Heads.mp3",
    img: "imagens/rock.jpg",
  },
  {
    titulo: "Samba",
    artista: "Andre Motta",
    src: "musicas/Early Avril - Unicorn Heads.mp3",
    img: "imagens/samba.jpg",
  },
  {
    titulo: "Piano",
    artista: "Andre Motta",
    src: "musicas/Wolf Moon - Unicorn Heads.mp3",
    img: "imagens/piano.jpg",
  },
];
const btnPlayer = document.querySelector(".btn-play");
const btnPause = document.querySelector(".btn-pause");
const duracaoMusica = document.querySelector(".fim");
const btnAnterior = document.querySelector(".anterior");
const btnProximo = document.querySelector(".proximo");

let musica = document.querySelector("audio");
let imagem = document.querySelector("img");
let nomeMusica = document.querySelector(".descricao h2");
let nomeArtista = document.querySelector(".descricao i");
let indexMusica = 0;

// tava dando bug, tive que fazer isso
window.onload = () => {
  duracaoMusica.textContent = segundosToMinutos(Math.floor(musica.duration));
};

function tocarMusica() {
  musica.play();
  btnPause.style.display = "block";
  btnPlayer.style.display = "none";
}
function pausarMusica() {
  musica.pause();
  btnPlayer.style.display = "block";
  this.style.display = "none";
}
function atualizarBarra() {
  let barra = document.querySelector("progress");
  // saberemos a porcentagem tocada  da musica dividindo seu tempoAtual por seu tempo total
  // acho que ambos os tempos são dados em segundos
  // acho que multiplicamos por 100 para arredondar o numero
  // o math arredonda o numero para baixo
  let porcentagem =
    Math.floor((musica.currentTime / musica.duration) * 100) + "%";
  barra.style.width = porcentagem;
  let tempoDecorrido = document.querySelector(".inicio");
  // retorna a musica em segundos
  tempoDecorrido.textContent = segundosToMinutos(
    Math.floor(musica.currentTime)
  );
}
function segundosToMinutos(segundos) {
  // assim obteremos os minutos
  /** por exemplo, quando o segundo for igual a 120, vamos dividi-lo por 60, que nos dará o resultado de 2(minutos) */
  let campoMinutos = Math.floor(segundos / 60);
  /** essa parte aqui é um pouco mais complicada, não consegui entender muito bem, mas eu sei que toda vez que segundos chegar a 60 (ou
  um numero multiplo de 60(120, e outro numeros) , o resto da divisão vai ser zero), meio que dando a entender que 1 minuto passou*/
  let campoSegundos = segundos % 60;
  if (campoSegundos < 10) {
    campoSegundos = "0" + campoSegundos;
  }
  return campoMinutos + ":" + campoSegundos;
}
function renderizarMusica(index) {
  musica.setAttribute("src", musicas[index].src);
  // QUANDO A MUSICA TERMINAR DE CARREGAR A FUNÇÃO VAI SER ACIONADA
  musica.addEventListener("loadeddata", () => {
    nomeMusica.textContent = musicas[index].titulo;
    nomeArtista.textContent = musicas[index].artista;
    imagem.src = musicas[index].img;
    duracaoMusica.textContent = segundosToMinutos(Math.floor(musica.duration));
  });
}

btnPlayer.addEventListener("click", tocarMusica);
btnPause.addEventListener("click", pausarMusica);
musica.addEventListener("timeupdate", atualizarBarra);
btnAnterior.addEventListener("click", () => {
  indexMusica = indexMusica <= 0 ? musicas.length - 1 : (indexMusica -= 1);
  console.log(indexMusica);
  renderizarMusica(indexMusica);
});

btnProximo.addEventListener("click", () => {
  indexMusica = indexMusica >= musicas.length - 1 ? 0 : (indexMusica += 1);
  renderizarMusica(indexMusica);
});

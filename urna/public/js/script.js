// Interface control variables
let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')

// Environment control variables
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];


// Starting the vote step
function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHTML = "";
    numero = "";
    votoBranco = false;

    // Generating the squares of the numbers clicked on the screen
    // and assigning the class "pisca" to the first one
    for (let i = 0; i < etapa.numeros; i++) {
        if (i == 0) {
            numeroHTML += '<div class="numero pisca">  </div>'
        } else {
            numeroHTML += '<div class="numero">  </div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="public/images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="public/images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande  pisca">VOTO NULO</>';
    }
}

// When clicking the number buttons
function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');

    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        // Removes the class "pisca" from the current element and adds it to the next one in the sequence
        // If there is no next element, that is, this is the last number of the vote step, update the interface
        elNumero.classList.remove('pisca')
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface();
        }
    }
}


// When clicking the "branco" button
function branco() {
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = "";
        descricao.innerHTML = '<div class="aviso--grande  pisca">VOTO EM BRANCO</>';
        lateral.innerHTML = "";
    } else {
        alert('Para votar em BRANCO, não selecione nenhum número')
    }
}


// When clicking the "corrige" button
function corrige() {
    comecarEtapa();
}

// When clicking the "confirma" button
function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false

    // (if) Check if vote is blank and confirm and saves the vote
    // (else if) Checks if the number entered has the number of numbers needed for the vote and saves the vote
    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    // If the next step of the vote is 'undefined', that is, this is the last
    // step, it shows the end screen, otherwise it goes to the next step
    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante  pisca">FIM</>';
            console.log(votos);
        }
    }
}

// Starting the application
comecarEtapa();

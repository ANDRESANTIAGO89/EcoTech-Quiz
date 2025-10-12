const questions = [
    { question: "O que é economia sustentável?", options: ["Produzir e consumir de forma responsável", "Aumentar lucros a qualquer custo", "Gastar menos possível", "Apenas reciclar produtos"], answer: 0 },
    { question: "Qual dessas ações ajuda a reduzir o desperdício de água?", options: ["Deixar a torneira aberta", "Tomar banhos curtos", "Lavar o carro com mangueira", "Evitar reaproveitamento"], answer: 1 },
    { question: "O que significa o conceito de reciclagem?", options: ["Reutilizar materiais descartados", "Jogar fora corretamente", "Evitar comprar produtos novos", "Doar roupas"], answer: 0 },
    { question: "Qual é a principal fonte de energia renovável no Brasil?", options: ["Carvão mineral", "Petróleo", "Energia Hidrelétrica", "Gás natural"], answer: 2 },
    { question: "O que é consumo consciente?", options: ["Comprar o máximo possível", "Evitar qualquer tipo de consumo", "Consumir considerando impacto ambiental e social", "Comprar apenas produtos importados"], answer: 2 },
    { question: "O que acontece quando descartamos lixo eletrônico incorretamente?", options: ["Nada acontece", "Ele se decompõe rapidamente", "Libera substâncias tóxicas no ambiente", "Pode ser reciclado facilmente"], answer: 2 },
    { question: "Qual destas atitudes mais contribui para diminuir a poluição do ar?", options: ["Usar transporte público", "Usar mais carros particulares", "Queimar lixo", "Desmatar florestas"], answer: 0 },
    { question: "O que é compostagem?", options: ["Processo de transformar resíduos orgânicos em adubo", "Reutilizar garrafas plásticas", "Evitar reciclagem", "Produzir energia com lixo"], answer: 0 },
    { question: "O que o símbolo das três setas formando um triângulo representa?", options: ["Energia limpa", "Reciclagem", "Consumo consciente", "Economia local"], answer: 1 },
    { question: "Qual é o principal objetivo do desenvolvimento sustentável?", options: ["Aumentar a produção industrial", "Garantir o bem-estar atual sem comprometer o futuro", "Reduzir custos de produção", "Eliminar o uso de tecnologia"], answer: 1 }
];

let currentQuestion = 0;
let score = 0;
let username = "";

const loginContainer = document.getElementById("login-container");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const tipElement = document.getElementById("tip");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

startButton.addEventListener("click", () => {
    username = document.getElementById("username").value.trim();
    if (username === "") {
        alert("Por favor, insira seu nome para começar.");
        return;
    }
    loginContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
});

function loadQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;
    optionsElement.innerHTML = "";

    current.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(index));
        optionsElement.appendChild(button);
    });

    nextButton.classList.add("hidden");
}

function selectAnswer(index) {
    const correct = questions[currentQuestion].answer;
    const buttons = optionsElement.querySelectorAll("button");
    buttons.forEach((btn, i) => {
        if (i === correct) {
            btn.style.backgroundColor = "#2e7d32";
        } else if (i === index) {
            btn.style.backgroundColor = "#c62828";
        }
        btn.disabled = true;
    });

    if (index === correct) score++;
    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    scoreElement.textContent = `${username}, sua pontuação foi ${score} de ${questions.length}.`;

    if (score >= 8) {
        tipElement.textContent = "Excelente! Você é um exemplo de consciência sustentável! 🌎";
    } else if (score >= 5) {
        tipElement.textContent = "Muito bom! Continue se informando e melhorando suas ações. 💡";
    } else {
        tipElement.textContent = "Você pode aprender mais sobre sustentabilidade e fazer a diferença! 🌱";
    }
}

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    username = "";
    document.getElementById("username").value = "";
    resultContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");
});

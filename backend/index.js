
import express from 'express';
import * as fs from "fs/promises"
const app = express()
const port = 3001

const MEMORIA = "localdata.json"
const EASY_QUESTIONS = "eQuestions.json"
const MEDIUM_QUESTIONS = "mQuestions.json"
const HARD_QUESTIONS = "hQuestions.json"

app.post('/api/resposta', async (req, res) => {

    try {
        //acede à informacao do jogo
        const gameMemoryD = await fs.readFile(MEMORIA)
        const gameMemory = JSON.parse(gameMemoryD.toString())
        //acede a informacao das perguntas todas
        const eQuestionsD = await fs.readFile(EASY_QUESTIONS)
        const eQuestions = JSON.parse(eQuestionsD.toString())
        const mQuestionsD = await fs.readFile(MEDIUM_QUESTIONS)
        const mQuestions = JSON.parse(mQuestionsD.toString())
        const hQuestionsD = await fs.readFile(HARD_QUESTIONS)
        const hQuestions = JSON.parse(hQuestionsD.toString())

        //gerar a primeira pergunta
        if (req.body.indice === 0) {
            generateQuestion(req, eQuestions, mQuestions, hQuestions, gameMemory)
            await fs.writeFile(MEMORIA, JSON.stringify(gameMemory, null, 2))

        }
        //se estamos a responder a uma pergunta, verificar se esta certo e aplicar pontos
        //antes de gerar a proxima pergunta
        else if (req.body.indice > 0) {
            checkIfRight(req)
            generateQuestion(req, eQuestions, mQuestions, hQuestions, gameMemory)
            await fs.writeFile(MEMORIA, JSON.stringify(gameMemory, null, 2))
        }

        res.sendStatus(201).json({
            "question": gameMemory.question.question,
            "options": gameMemory.question.options
        })
    } catch (err) { 
        res.status(500).send("Erro ao gerar/verificar pergunta") }



})

const generateQuestion = (req, eQuestions, mQuestions, hQuestions, gameMemory) => {
    //gera pergunta facil
    if (req.body.indice < 11) {
        //gera um indice aleatorio de pergunta
        const questionIndex = Math.ceil(Math.random() * eQuestions.questions.length)
        //guarda na memoria do jogo a pergunta aleatoria
        gameMemory.question = eQuestions.questions[questionIndex]

    }
    //gera pergunta media
    else if (req.body.indice < 21) {
        //gera um indice aleatorio de pergunta
        const questionIndex = Math.ceil(Math.random() * mQuestions.questions.length)
        //guarda na memoria do jogo a pergunta aleatoria
        gameMemory.question = mQuestions.questions[questionIndex]

    }
    //gera pergunta dificil
    else if (req.body.indice > 20) {
        //gera um indice aleatorio de pergunta
        const questionIndex = Math.ceil(Math.random() * hQuestions.questions.length)
        //guarda na memoria do jogo a pergunta aleatoria
        gameMemory.question = hQuestions.questions[questionIndex]

    }
}

function checkIfRight(req, gameMemory) {
    //a resposta dada pelo utilizador
    const gotAnswear = req.body.indice

    //a resposta certa que estava em memoria
    const rightAnswear = gameMemory.answer

    //se a resposta estiver certa, adiciona 100 pontos
    if (gotAnswear === rightAnswear) {
        gameMemory.scores.aScore += 100
    }
    //se a resposta nao estava certa
    else if (gotAnswear !== rightAnswear) {
        //se tinha pelo menos 300 pontos, tira 300 pontos
        if (gameMemory.scores.aScore >= 300) {
            gameMemory.scores.aScore -= 300
        }
        //se tinha menos de 300 pontos, mete os pontos a 0, pontos nao podem ser negativos
        if (gameMemory.scores.aScore < 300) {
            gameMemory.scores.aScore = 0
        }
    }

    
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})






















// [
//     {
//         "level": "easy",
//         "number": 1,
//         "question": "Qual o actor que interpretou a personagem Maui no filme Moana?",
//         "options": [
//             {"key": "a", "text": "Brad Pitt"},
//             {"key": "b", "text": "Dwayne Johnson"},
//             {"key": "c", "text": "Morgan Freeman"},
//             {"key": "d", "text": "Adam Sandler"}
//         ],
//         "answer": "b"
//     },
//     {
//         "level": "easy",
//         "number": 2,
//         "question": "Em que filme surge a frase 'Para o infinito e mais além'?",
//         "options": [
//             {"key": "a", "text": "Star Wars"},
//             {"key": "b", "text": "Rei Leão"},
//             {"key": "c", "text": "Toy Story"},
//             {"key": "d", "text": "Chicken Little"}
//         ],
//         "answer": "c"
//     }
// ]
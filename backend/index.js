//codigo expresssssss

import express from "express";
import * as fs from "fs/promises"
const app = express()
const port = 3001
const DB_EASY = "dbEasy.json"
const DB_MEDIUM = "dbMedium.json"
const DB_HARD = "dbHard.json"
const DB_CONTA = "contador.json"

app.use(express.json())


app.post("/api/contador", async (req, res) => {
    try {
        // Ler o ficheiro para um array
        const conteudo = await fs.readFile(DB_CONTA)
        const db = JSON.parse(conteudo.toString())

        // Gravar o array novamente no ficheiro
        db.contador += 1

        console.log(db.contador)

        await fs.writeFile(DB_CONTA , JSON.stringify(db, null, 2))

        // No final, enviar o estado 201
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send("Erro a adicionar a mensagem")
    }
})

// Desktop/DesafioJoker/projeto/


app.get("/api/contador", async (req, res) => {
    try {
        // Ler o ficheiro para um array
        const conteudo = await fs.readFile(DB_CONTA)
        const db = JSON.parse(conteudo.toString())

        // console.log(db.contador)

        res.status(200).json({contador: db.contador})
    } catch (err) {
        res.status(500).send("Erro a ler as mensagens")
    }
})

app.listen(port, () => console.log(`Ready on ${port}`))
// npm init
// npm i express
const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

// npm i mysql2
const db = require("./db")

// npm i cors
const cors = require("cors")
app.use(cors())


app.post("/cadastrar", async (req, res) =>{
    const cliente = req.body
    try {

        const resultado = await db.pool.query(
            `INSERT INTO cliente (nome, cpf, email, telefone, rua, n_casa, bairro, cidade, uf, cep, senha)
            values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [cliente.nome, cliente.cpf, cliente.email, cliente.telefone, cliente.rua, cliente.n_casa,
            cliente.bairro, cliente.cidade, cliente.uf, cliente.cep, cliente.senha])
    res.status(200).json({id: resultado[0]. insertId})

    } catch (erro) {
        res.status(500).json({erro: "Erro interno na API"})
        console.log(erro)
    }
})

app.get("/clientes", async (req,res) => {
    try {
        const resultado = await db.pool.query("SELECT * FROM cliente")
        res.status(200).json(resultado[0])
    } catch (erro){
        console.log(erro)
    }
})

app.listen(port, ()=>{
    console.log("API executando na porta " + port)
})
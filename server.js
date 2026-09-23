import express from "express"
import cors from "cors"
import mysql2 from "mysql2"

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MB"
})

const listarFilmes = (req, res) => {
    const selectCommand = "SELECT * FROM filmes_pedro3"

    sql.query(selectCommand, (error, results) => {
        if (error) {
            console.error(error)
            return res.status(500).json({ message: "Erro ao buscar filmes." })
        }

        res.json(results)
    })
}

app.get("/", listarFilmes)
app.get("/movies", listarFilmes)

app.post("/add-movie", (req, res) => {
    const { name, genre, duration, classification } = req.body

    const insertCommand = "INSERT INTO filmes_pedro3(name, genre, duration, classification) VALUES (?,?,?,?)"

    sql.query(insertCommand, [name, genre, duration, classification], (error) => {
        if (error) {
            console.error(error)
            return res.status(500).json({ message: "Erro ao adicionar filme." })
        }

        res.status(201).json({ message: "Filme adicionado com sucesso!" })
    })
})

app.delete("/delete-movie/:id", (req, res) => {
    const { id } = req.params

    const deleteCommand = "DELETE FROM filmes_pedro3 WHERE id = ?"

    sql.query(deleteCommand, [id], (error) => {
        if (error) {
            console.error(error)
            return res.status(500).json({ message: "Erro ao deletar filme." })
        }

        res.json({ message: "Filme deletado com sucesso!" })
    })
})

app.put("/update-movie/:id", (req, res) => {
    const { id } = req.params
    const { name, genre, duration, classification } = req.body

    const updateCommand = "UPDATE filmes_pedro3 SET name = ?, genre = ?, duration = ?, classification = ? WHERE id = ?"

    sql.query(updateCommand, [name, genre, duration, classification, id], (error, result) => {
        if (error) {
            console.error(error)
            return res.status(500).json({ message: "Erro ao atualizar filme." })
        }

        res.json({ message: "Filme atualizado com sucesso!", result })
    })
})

app.listen(PORT, () => {
    console.log("Servidor Rodando")
})


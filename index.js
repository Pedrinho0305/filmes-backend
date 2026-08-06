import express from "express"
import cors from "cors"
import mysql2 from "mysql2"

const app = express()

const PORT = 3000

app.use(express.json())

app.post("/add-movie", (req, res)=>{
    const {name, genre, duration, classification} = req.body

    const insertCommand = "INSERT INTO filmes_pedro(name, genre, duration, classification) VALUES (?,?,?,?)"

    sql.query(insertCommand, [name, genre, duration, classification], (error)=>{
        if(error){
            console.error(error)
        }

        res.status(201).json({message: "Filme adicionado com sucesso!"})
    })
})

app.delete("/delete-movie", (req, res)=>{
    const {id} = req.params

    const deleteCommand = "DELETE FROM filmes_pedro WHERE id = ?"

    sql.query(deleteCommand, [id], (error)=>{
        if(error){
            console.error(error)
        }

        res.json("Filme deletado com sucesso!")
    })
    
})

app.put("/update-movie", (req, res)=>{
    const {id, name, genre, duration, classfication} = req.body

    const updateCommand = "UPDATE name, genre, duration, classfifcation WHERE id  = ? FROM filmes_pedro"

    sql.query(updateCommand, [id], (error)=>{
        if(error){
            console.log(error)
            return
        }

        res.json({ message: "Filme atualizado com sucesso!" })
    })
})


const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "aluno_projetos",
    password:"senhaAlunos",
    database: "alunos_filmes03MB"
})
app.listen(PORT, ()=>{
    console.log("Servidor Rodando")
})


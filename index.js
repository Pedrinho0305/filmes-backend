import express from "express"
import cors from "cors"
import mysql2 from "mysql2"

const app = express()

const PORT = 3000

app.use(express.json())

app.post("/add-movie", (req, res)=>{
    const {name, genre, duration, classification} = req.body

    const insertCommand = "INSERT INTO filmes_pedro3(name, genre, duration, classification) VALUES (?,?,?,?)"

    sql.query(insertCommand, [name, genre, duration, classification], (error)=>{
        if(error){
            console.error(error)
        }

        res.status(201).json({message: "Filme adicionado com sucesso!"})
    })
})

app.delete("/delete-movie/:id", (req, res)=>{
    const {id} = req.params

    const deleteCommand = "DELETE FROM filmes_pedro3 WHERE id = ?"

    sql.query(deleteCommand, [id], (error)=>{
        if(error){
            console.error(error)
        }

        res.json("Filme deletado com sucesso!")
    })
    
})

app.put("/update-movie", (req, res)=>{
    const { name, genre, duration, classfication} = req.body
    const {id} = req.params

    const updateCommand = "UPDATE filmes_pedro3 SET name = Homem Aranha 4 WHERE id = ?"

    sql.query(updateCommand, [id, name, genre, duration, classfication], (error)=>{
        if(error){
            console.log(error)
            return
        }

        res.json({ message: "Filme atualizado com sucesso!" })
    })
})


const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password:"senhaAlunos",
    database: "alunos_filmes03MB"
})
app.listen(PORT, ()=>{
    console.log("Servidor Rodando")
})


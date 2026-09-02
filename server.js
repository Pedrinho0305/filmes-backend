import express from "express"
import cors from "cors"
import mysql2 from "mysql2"

const app = express()

const PORT = 3000

app.use(express.json())

app.use(cors())


app.get("/", (req, res)=>{
    const selectCommand = "SELECT * FROM filmes_pedro3"

    sql.query(selectCommand, (error, results)=>{
        if(error){
            console.error(error)
        }

        res.json(results)
    })
})

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

app.delete("/delete-movie", (req, res)=>{
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
    const {id, name, genre, duration, classfication} = req.body

    const updateCommand = "UPDATE name, genre, duration, classfifcation WHERE id  = ? FROM filmes_pedro3"

    sql.query(updateCommand, [id], (error)=>{
        if(error){
            console.log(error)
            return
        }

        res.json({ message: "Filme atualizado com sucesso!" })
    })
})

app.get("/", (req, res)=>{
    const selectCommand = "SELECT * FROM filmes_pedro3"

    sql.query(selectCommand, (error, result)=>{
        if(error){
            console.error(error)
        }

        res.json(result)
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


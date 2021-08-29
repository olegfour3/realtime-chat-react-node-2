import express from 'express'
import cors from 'cors'
import * as Console from "console";


const PORT = 5001;



const app = express()
app.use(cors())
app.use(express.json())



app.get('/getMessages', (req, res) => {
    res.json(req.body)
})

app.post('/newMessage', (req,res) => {
    const message = req.body;
    res.status(200)
})


app.listen(PORT, () => Console.log(`SERVER LISTENING PORT ${PORT}`))

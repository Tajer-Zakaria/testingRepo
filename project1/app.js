const express = require('express')
const Joi = require('joi')

const app = express()
app.use(express.json())


app.set('views', './views')


const port = process.env.PORT || 5000
app.listen(port, ()=> console.log(`listning on port ${port}`))



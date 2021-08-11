const express = require('express')
const Joi = require('joi')
const router = express.Router()



const test = require('./test')
const movies = [
    {id: 1, name: 'Double World', Genere: 'Action' },
    {id: 2 ,name: 'Good Girls', Genere: 'Comedy' },
    {id: 3 ,name: 'Sweet & Sour', Genere: 'Romance' },
    {id: 4 ,name: 'How i Became a SuperHero', Genere: 'Adventure'}
]



router.get('/', (req, res)=> {
    res.send(movies)
})

router.get('/:id', (req, res)=> {
   const movie = movies.find(c => c.id === parseInt(req.params.id))
   if(!movie) res.status(404).send('the given id ...')
   res.send(movie)
})

//post a movie


router.post('/', (req, res)=> {
    const { error } = ValidateMovie(req.body)
    if(error) return res.status(404).send(error.details[0].message)
    const movie = {
        id: movies.length + 1,
        name: req.body.name,
        Genere: req.body.Genere
    }
    movies.push(movie)
    res.send(movie)
})

//update movie

router.put('/:id', (req, res) => {
    const movie = movies.find(c => c.id  === parseInt(req.params.id))
    if(!movie) res.status(404).send('the given id ...')
    
    const { error } = ValidateMovie(req.body)
    if(error) return res.status(400).send(error.details[0].message)
        
    
// update movie
    movie.name = req.body,
    movie.Genere = req.body
    res.send(movie)
})

function ValidateMovie(movie){
    const schema = {
        name: Joi.string().required(),
        Genere: Joi.string().required()
    }
    return Joi.validate(movie, schema)
}
 
router.delete('/:id ', (req, res)=> {
    const movie = movies.find(c => c.id === parseInt(req.params.id))
    if(!movie) res.status(404).send('the given id ...')


    const index = movies.indexOf(movie)
    movies.splice(index)

    res.send(movie)

})

module.exports = router
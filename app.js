const express = require ('express')
const app = express()
const port = 5000
const movies = require ('./Routing/movies.js')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const movies2 = [
  {
    "id": 1,
    "title": "Midnight In Paris",
    "runtime": 96,
    "release_year": 2011,
    "director": "Woody Allen",
  },
  {
  "id": 2,
  "title": "Titanic",
  "runtime": 210,
  "release_year": 1997,
  "director": "James Cameron",
  },
  {
  "id": 3,
  "title": "From Paris With Love",
  "runtime": 94,
  "release_year": 2010,
  "director": "Pierre Morel",
  },
]

// GET FUNCTIONS

app.get('/', (req, res) => res.send('Hello World!'))

//return list of all movies
app.get('/movies', (req, res) => res.send(movies2))

// return movie by specific ID
app.get('/movies/:id', (req, res) => {
  //404 ERROR
  if (req.params.id-1 === NaN){
    res.status(400).send("Please supply a number for the movie ID. :)")
  }
  if (movies2[req.params.id-1] === undefined){
    res.status(404).send("NOT FOUND")
  }


  //RETURN STATEMENT
  console.log(req.params)
  console.log(req.params.id-1)
  res.status(200).send(movies2[req.params.id-1])

})

//POST FUNCTIONS

//Add movie to database
app.post('/movies', (req, res) => {
  console.log(req.body)
  movies2.push(req.body)
  res.status(200).send("Your movie has been added.")

})

//DELETE FUNCTIONS
//Delete a movie from the database
app.delete('/movies/:id', (req, res) => {
  //404 ERROR
  if (!movies2[req.params.id]){
    res.status(404).send("NOT FOUND")
  }
  //RETURN STATEMENT
  console.log(req.params)
  delete movies2[req.params.id-1]
  res.status(200).send("The movie you selected has been deleted.")

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
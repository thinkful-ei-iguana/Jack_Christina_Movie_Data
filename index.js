require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const movieM = require('./movieData');

const app = express();

console.log(process.env.API_TOKEN);

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(validateBearerToken);

function validateBearerToken(req, res, next){
  const bearerToken = req.get('Authorization').split(' ')[1];
  const apiToken = process.env.API_TOKEN;
  if (bearerToken !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  } 
  
  console.log('validating');
  next();
}

//Search by genre, country or average vote.  Query string parameters.
//By genre: includes non case sensitive string
//By country: includes case sensitive string
//By avearge vote: avg_vote >= supplied number

function handleGet(req, res) {
  let movies = movieM;
  const{genre =  '', country = '', avgvote= ''} = req.query;
  if(genre !== ''){
    movies = movies.filter((element) =>{
      if(element.genre.toLowerCase() === genre.toLowerCase()){ return element}
    })
  }
  if(country !== ''){
    movies = movies.filter((element) =>{
    if(element.country.toLowerCase() === country.toLowerCase()){return element}
    })
  }
  if(avgvote !== ''){
    movies = movies.filter((element)=>{
    if(element.avg_vote >= parseInt(avgvote)){ return element}
  })
  }
  res.send(movies);
}


app.get('/movie', handleGet);



//API responds with array of full movie entries for the search results.
//Endpoint: responds when given a valid Auth header with 
//Bearer API token.
//Endpoint: gen security--best practice headers and support for CORS




app.listen(8000, () => {
  console.log('Oh No!');
});
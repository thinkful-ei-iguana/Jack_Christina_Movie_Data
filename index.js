require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const movieM = require('./movieData');

const app = express();



app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

//Search by genre, country or average vote.  Query string parameters.
//By genre: includes non case sensitive string
//By country: includes case sensitive string
//By avearge vote: avg_vote >= supplied number

function handleGet(req, res) {
  const{test =  ''} = req.query;
  res.send(test);
}

// function byGenre = ();
// function byCountry =
// function byAverageVote 


app.get('/movie', handleGet);



//API responds with array of full movie entries for the search results.
//Endpoint: responds when given a valid Auth header with 
//Bearer API token.
//Endpoint: gen security--best practice headers and support for CORS




app.listen(8000, () => {
  console.log('Oh No!');
});
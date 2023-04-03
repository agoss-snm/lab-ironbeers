const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials("partials_absolute_path") //

app.get('/', (req, res) => res.render('index'));


app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (request, response, next) => {

  punkAPI.getRandom()
    .then(randomArr => {
      const randomData = {
        randomBeer: randomArr[0]
      }
      response.render('random-beer', randomData);
    })
  .catch();

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

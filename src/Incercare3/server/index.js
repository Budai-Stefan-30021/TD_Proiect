var api = require('./src/api.js').app;
const fs = require('fs');
const televizoareFilepath = './src/televizoare.json';


api.get('/televizoare', function (request, response) {
  response.json(getTelevizoare());
});

api.get('/televizoare/:id', function (request, response) {
  let televizor = getTelevizorById(request.params.id);
  if (televizor) response.json(televizor);
  response.json('not found');
});

api.put('/televizoare', function (request, response) {
  saveTelevizor(request.body);
  response.json('Televizor was saved succesfully');
});

api.post('/televizoare', function (request, response) {
  // in request o sa-mi vina un obiect de tip car care o sa aiba un anumit id
  // console.log(request.body);//un obiect de tipul car actualizat pe client
  // citim cars din fisier pe baza id-ului primit de la client
  let televizor = request.body;
  let televizoare = getTelevizoare();// citire json din fisier
  // cautam daca exista id de pe request.body
  // daca exista actualizam parametrii acestui produs/item
  for(let i=0; i < televizoare.length; i++) {
    if (televizoare[i].id === televizor.id) {
      televizoare[i] = televizor;
    }
  }

  // salvam in fisier produsele actualizate
  try {
    fs.writeFileSync(carsFilepath, JSON.stringify(televizoare));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }

  response.json('Televizor was updated succesfully');
});


api.delete('/televizoare/:index', function (request, response) {
    console.log(request.params.index);
    // cars.splice(request.params.index, 1);
      let televizoare = [];
        try {
          televizoare = JSON.parse(fs.readFileSync(televizoareFilepath, 'utf8'));
        } catch (err) {
          console.error(err);
          return false;
        }

       televizoare.splice(gasireTvInLista(request.params.index),1);

     try {
        fs.writeFileSync(televizoareFilepath, JSON.stringify(televizoare));// salvare json array in fisier
      } catch (err) {
        console.error(err)
      }
  response.json('Televizor with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getTelevizoare() {
  let televizoare = [];
  try {
    televizoare = JSON.parse(fs.readFileSync(televizoareFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return televizoare;
}

function saveTelevizor(televizor) {
  let televizoare = getTelevizoare();// citire json din fisier
  let maxId = getMaxId(televizoare);  // get maximum id form cars array
  televizor.id = maxId+1;// generare id unic
  televizoare.push(televizor);// adaugare masina noua in array
  try {
    fs.writeFileSync(televizoareFilepath, JSON.stringify(televizoare));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(televizoare) {
  let max = 0;
  for (var i=0; i<televizoare.length;i++) {
    if(max < televizoare[i].id) {
      max = televizoare[i].id;
    }
  }
  return max;
}

function getTelevizorById(id){
  let televizoare = getTelevizoare();// citire json din fisier
  let selectedTelevizor = null;
  for(var i=0; i<televizoare.length; i++) {
    if(id == televizoare[i].id) selectedTelevizor = televizoare[i];
  }
  return selectedTelevizor;
}

function gasireTvInLista(id){
    let televizoare = getTelevizoare();
    for(var i=0; i<televizoare.length; i++) {
        if(id == televizoare[i].id)
            return i;
      }
    return -1;
}
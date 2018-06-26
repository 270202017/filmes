const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const app = express();

app.use(expressMongoDb('mongodb://165.227.221.155/filmes'));
app.use(cors());
app.use(bodyParser.json());

function formato(dados){
    return {
        nome: dados.nome,
        duracao: dados.duracao,
        genero: dados.genero,
        pontuacao: dados.pontuacao,
        lancamento: dados.lancamento,
    };
};

app.post('/novo', (req, res) => {

    let filme = formato(req.body);

    req.db.collection('filmes').insert(filme, (error) =>{

        if(error){
            res.status(500).send('Erro ao acessar o banco de dados');
            return;
        }

        res.send(filme);
    });
});

app.get('/lista', (req, res) => {
    
    req.db.collection('filmes').find().toArray((error, data) => {
        if(error){
            res.status(500).send('Erro ao acessar o banco de dados');
            return;
        }
        res.send(data);
    });
});

app.put('/auto/:id', (req, res) => {

    let filme = formato(req.body);

    let query = { 
        _id: ObjectID(req.params.id)
    };

    req.db.collection('filmes').updateOne(query, filme, (error, data) => {
        if(error){
            res.status(500).send('Erro ao acessar o banco de dados');
            return;
        }
        res.send(data);
    });
});

app.delete('/delete/:id', (req, res) => {
    let query = { 
        _id: ObjectID(req.params.id)
    };

    req.db.collection('filmes').deleteOne(query, (error, data) => {
        if(error){
            res.status(500).send('Erro ao acessar o banco de dados');
            return;
        }
        res.send(data);
    });
});

app.listen(3000);
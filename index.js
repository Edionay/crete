const mongojs = require('mongojs');
const express = require('express');
const https = require('https');
const app = express();

const bd = mongojs('crete', ['encomendas']);

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/encomendas', function (req, res) {

    console.log(res.body);

    bd.encomendas.find(function(err, docs) {
        res.json(docs);
    });
});

app.get('/encomendas/:remetente/:destinatario', (req, res) => {

    https.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${req.params.remetente}&destinations=${req.params.destinatario}&mode=driving&language=pt-BR&sensor=false`, resp => {
        let body = '';
        resp.on('data', data => body += data);
        resp.on('end', () => {
            let encomenda = JSON.parse(body);
            console.log(encomenda.destination_addresses);
            res.send(body)
        });
    });
});

app.post('/encomendas', function (req, res) {

    console.log(res.body);

    bd.encomendas.find(function(err, docs) {
        res.json(docs);
    });
});


const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log(`Ouvindo na porta ${porta}...`));
